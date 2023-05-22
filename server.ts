'use strict';
import { ApolloClient, InMemoryCache } from '@apollo/client';
const express = require(`express`);
const { Sequelize, DataTypes } = require(`sequelize`);
const dotenv = require(`dotenv`);
const cors = require(`cors`);
const FrontImage = require(`./src/types/ImageAttributes.ts`);
const Movie = require(`./src/types/MovieAttributes`);
const Director = require(`./src/types/DirectorAttributes`);
const Book = require(`./src/types/BookAttributes`);
const Excerpt = require(`./src/types/ExcerptAttributes`);
const Author = require(`./src/types/AuthorAttributes`);
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
    content_warnings: [String!]
    director_uid: String!
    director: Director!
  }

  type Director {
    director_uid: String!
    director_name: String!
    director_biography: String!
    date_director_born: String!
    date_director_deceased: String
    director_country_of_birth: String!
    director_image: String!
    movies: [Movie!]!
  }
  type Book {
    book_uid: String!
    book_title: String!
    book_description: String!
    pages: Int!
    date_book_published: String!
    book_subjects: [String!]!
    book_cover_image: String!
    goodreads_link: String!
    isbn: String!
    author_uid: String!
    author: Author!
    excerpts: [Excerpt]
  }
  type Author {
    author_uid: String!
    author_name: String!
    author_biography: String!
    date_author_born: String!
    date_author_deceased: String
    author_image: String!
    books: [Book!]!
  }

  type Excerpt {
    excerpt_uid: String!
    text: String!
    page_number: Int!
    chapter: String
    section: String
    book_uid: String!
  }

  type Query {
    allDirectors: [Director!]!
    allMovies: [Movie!]!
    allBooks: [Book!]!
    allAuthors: [Author!]!
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
        include: [Movie],
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
  allBooks: async () => {
    try {
      const books = await Book.findAll({
        include: [Author, Excerpt],
        attributes: [
          `book_uid`,
          `book_title`,
          `book_description`,
          `pages`,
          `date_book_published`,
          `book_subjects`,
          `book_cover_image`,
          `goodreads_link`,
          `isbn`,
          `author_uid`,
        ],
        tableName: `book`,
      });
      return books;
    } catch (error) {
      console.error(error);
      throw new Error(`Internal Server Error`);
    }
  },
  allAuthors: async () => {
    try {
      const authors = await Author.findAll({
        include: [Book],
        attributes: [
          `author_uid`,
          `author_name`,
          `author_biography`,
          `date_author_born`,
          `date_author_deceased`,
          `author_image`,
        ],
        tableName: `author`,
      });
      return authors;
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

Excerpt.init(
  {
    excerpt_uid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    page_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chapter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    section: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    book_uid: {
      type: DataTypes.STRING,
      allowNull: false,
      foreignKey: true,
    },
  },
  { sequelize: db, modelName: `excerpt`, timestamps: false },
);

Author.init(
  {
    author_uid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    author_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_biography: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_author_born: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_author_deceased: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    author_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: `author`, timestamps: false },
);

Book.init(
  {
    book_uid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    book_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    book_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_book_published: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    book_subjects: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    book_cover_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    goodreads_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_uid: {
      type: DataTypes.STRING,
      allowNull: false,
      foreignKey: true,
    },
  },
  { sequelize: db, modelName: `book`, timestamps: false },
);

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
Director.hasMany(Movie, { foreignKey: `director_uid` });
Book.belongsTo(Author, { foreignKey: `author_uid` });
Author.hasMany(Book, { foreignKey: `author_uid` });
Book.hasMany(Excerpt, { foreignKey: `book_uid` });
Excerpt.belongsTo(Book, { foreignKey: `book_uid` });

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

export const client = new ApolloClient({
  uri: `http://localhost:3001/graphql`,
  cache: new InMemoryCache(),
});

app.get(`/excerpts`, async (req: Request, res: Response) => {
  try {
    const excerpts = await Excerpt.findAll({
      include: [Book],
      attributes: [
        `excerpt_uid`,
        `text`,
        `page_number`,
        `chapter`,
        `section`,
        `book_uid`,
      ],
      tableName: `excerpt`,
    });
    (res as any).status(200).json(excerpts);
  } catch (error) {
    console.error(error);
    (res as any).status(500).send(`Internal Server Error`);
  }
});

app.get(`/books`, async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll({
      include: [Author],
      attributes: [
        `book_uid`,
        `book_title`,
        `book_description`,
        `date_book_published`,
        `pages`,
        `book_subjects`,
        `isbn`,
        `book_cover_image`,
        `goodreads_link`,
        `author_uid`,
      ],
      tableName: `book`,
    });
    (res as any).status(200).json(books);
  } catch (error) {
    console.error(error);
    (res as any).status(500).send(`Internal Server Error`);
  }
});

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

app.get(`/authors`, async (req: typeof Request, res: typeof Response) => {
  try {
    const authors = await Author.findAll({
      attributes: [
        `author_uid`,
        `author_name`,
        `author_biography`,
        `date_author_born`,
        `date_author_deceased`,
        `author_image`,
      ],
      tableName: `author`,
    });
    (res as any).status(200).json(authors);
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
