'use strict';

const express = require(`express`);
const { Sequelize, DataTypes } = require(`sequelize`);
const dotenv = require(`dotenv`);
const cors = require(`cors`);
const FrontImage = require(`./src/types/ImageAttributes.ts`);
const Movie = require(`./src/types/MovieAttributes`);
const Director = require(`./src/types/DirectorAttributes`);
const { graphqlHTTP } = require(`express-graphql`);
const { buildSchema } = require(`graphql`);

const schema = buildSchema(`
  type Movie {
    movie_uid: String!
    movie_title: String!
    movie_description: String!
    length_in_minutes: Int!
    date_movie_released: String!
    movie_genres: [String!]!
    movie_poster: String!
    letterboxd_link: String!
    screenshot_links: [String!]!
    country_of_origin: String!
    content_warnings: [String!]!
    director_uid: String!
  }

  type Director {
    director_uid: String!
    director_name: String!
    director_biography: String!
    date_director_born: String!
    date_director_deceased: String
    director_country_of_birth: String!
    director_image: String!
  }

  type Query {
    allDirectors: [Director!]!
    allMovies: [Movie!]!
  }
`);

const root = {
  allDirectors: async () => {
    try {
      const directors = await Director.findAll({
        attributes: [
          `director_uid`,
          `director_name`,
          `director_biography`,
          `date_director_born`,
          `date_director_deceased`,
          `director_country_of_birth`,
          `director_image`,
        ],
        tableName: `director`,
      });
      return directors;
    } catch (error) {
      console.error(error);
      throw new Error(`Internal Server Error`);
    }
  },
  allMovies: async () => {
    try {
      const movies = await Movie.findAll({
        include: [Director],
        attributes: [
          `movie_uid`,
          `movie_title`,
          `movie_description`,
          `length_in_minutes`,
          `date_movie_released`,
          `movie_genres`,
          `movie_poster`,
          `letterboxd_link`,
          `screenshot_links`,
          `country_of_origin`,
          `content_warnings`,
          `director_uid`,
        ],
        tableName: `movie`,
      });
      return movies;
    } catch (error) {
      console.error(error);
      throw new Error(`Internal Server Error`);
    }
  },
};

dotenv.config();
const app = express();
app.use(cors());

let dbUrl;
if (process.env.DB_URL) {
  dbUrl = process.env.DB_URL;
} else {
  dbUrl = `default_db_url`;
}

const db = new Sequelize(dbUrl, {
  host: `localhost`,
  dialect: `postgres`,
});

Movie.init(
  {
    movie_uid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    movie_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    movie_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    length_in_minutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_movie_released: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    movie_genres: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    movie_poster: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    letterboxd_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    screenshot_links: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    country_of_origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content_warnings: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    director_uid: {
      type: DataTypes.STRING,
      allowNull: false,
      foreignKey: true,
    },
  },
  { sequelize: db, modelName: `movie`, timestamps: false },
);

Director.init(
  {
    director_uid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    director_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    director_biography: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_director_born: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_director_deceased: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    director_country_of_birth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    director_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: `director`, timestamps: false },
);

Movie.belongsTo(Director, { foreignKey: `director_uid` });

FrontImage.init(
  {
    imageUid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: `front_page_image` },
);

app.use(
  `/graphql`,
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.get(`/directors`, async (req: typeof Request, res: typeof Response) => {
  try {
    const directors = await Director.findAll({
      attributes: [
        `director_uid`,
        `director_name`,
        `director_biography`,
        `date_director_born`,
        `date_director_deceased`,
        `director_country_of_birth`,
        `director_image`,
      ],
      tableName: `director`,
    });
    (res as any).status(200).json(directors);
  } catch (error) {
    console.error(error);
    (res as any).status(500).send(`Internal Server Error`);
  }
});

app.get(`/movies`, async (req: typeof Request, res: typeof Response) => {
  try {
    const movies = await Movie.findAll({
      include: [Director],
      attributes: [
        `movie_uid`,
        `movie_title`,
        `movie_description`,
        `length_in_minutes`,
        `date_movie_released`,
        `movie_genres`,
        `movie_poster`,
        `letterboxd_link`,
        `screenshot_links`,
        `country_of_origin`,
        `content_warnings`,
        `director_uid`,
      ],
      tableName: `movie`,
    });
    (res as any).status(200).json(movies);
  } catch (error) {
    console.error(error);
    (res as any).status(500).send(`Internal Server Error`);
  }
});

app.get(`/images`, async (req: typeof Request, res: typeof Response) => {
  try {
    const images = await FrontImage.findAll({
      attributes: [`image_uid`, `title`, `image_url`, `text`],
      tableName: `front_page_image`,
    });
    (res as any).status(200).send(images);
  } catch (error) {
    console.error(error);
    (res as any).status(500).send(`Internal Server Error`);
  }
});

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
