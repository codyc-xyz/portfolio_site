'use strict';

const express = require(`express`);
const { Sequelize, DataTypes } = require(`sequelize`);
const dotenv = require(`dotenv`);
const cors = require(`cors`);
const FrontImage = require(`./src/types/ImageAttributes.ts`);
const Movie = require(`./src/types/MovieAttributes`);

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
    },
  },
  { sequelize: db, modelName: `movie` },
);

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

app.get(`/movies`, async (req: typeof Request, res: typeof Response) => {
  try {
    const movies = await Movie.findAll({
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
