import type { GatsbyNode } from 'gatsby';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import path from 'path';
const webpack = require(`webpack`);

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      fallback: {
        fs: false,
        assert: false,
        crypto: false,
        os: false,
        stream: false,
        path: false,
        buffer: false,
        zlib: false,
      },
      alias: {
        process: `process/browser`,
        buffer: `buffer`,
        stream: `stream-browserify`,
        http: `stream-http`,
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: `process/browser`,
        dns: `empty`,
      }),
      new webpack.ProvidePlugin({
        Buffer: [`buffer`, `Buffer`],
      }),
    ],
  });
};

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions;

  const result = await graphql<any>(`
    {
      segments {
        allMovies {
          movie_uid
          movie_title
          movie_description
          length_in_minutes
          date_movie_released
          movie_genres
          movie_poster
          letterboxd_link
          screenshot_links
          country_of_origin
          content_warnings
          director_uid
          director {
            director_name
          }
        }
        allDirectors {
          director_uid
          director_name
          director_biography
          date_director_born
          date_director_deceased
          director_country_of_birth
          director_image
          movies {
            movie_uid
            movie_title
            movie_poster
          }
        }
        allBooks {
          book_uid
          book_title
          book_description
          pages
          date_book_published
          book_subjects
          book_cover_image
          goodreads_link
          isbn
          author_uid
          author {
            author_name
          }
        }
        allAuthors {
          author_uid
          author_name
          author_biography
          date_author_born
          date_author_deceased
          author_image
          books {
            book_uid
            book_title
            book_cover_image
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query: ${console.log(result.errors)}`,
    );
    return;
  }
  const movies = result.data.segments.allMovies;
  const directors = result.data.segments.allDirectors;
  const books = result.data.segments.allBooks;
  const authors = result.data.segments.allAuthors;

  if (movies) {
    movies.forEach((movie: any) => {
      createPage({
        path: `movies/${movie.movie_uid}`,
        component: path.resolve(`./src/templates/MoviePage.tsx`),
        context: {
          directorUid: movie.director_uid,
          movieTitle: movie.movie_title,
          movieDescription: movie.movie_description,
          lengthInMinutes: movie.length_in_minutes,
          dateMovieReleased: movie.date_movie_released,
          movieGenres: movie.movie_genres,
          moviePoster: movie.movie_poster,
          letterboxdLink: movie.letterboxd_link,
          screenshotLinks: movie.screenshot_links,
          countryOfOrigin: movie.country_of_origin,
          contentWarnings: movie.content_warnings,
          directorName: movie.director.director_name,
        },
      });
    });
  }

  if (directors) {
    directors.forEach((director: any) => {
      createPage({
        path: `directors/${director.director_uid}`,
        component: path.resolve(`./src/templates/DirectorPage.tsx`),
        context: {
          directorName: director.director_name,
          directorBiography: director.director_biography,
          directorBorn: director.date_director_born,
          directorDeceased: director.date_director_deceased,
          birthCountry: director.director_country_of_birth,
          directorImage: director.director_image,
          movies: director.movies.map((movie: any) => ({
            movie_uid: movie.movie_uid,
            movie_title: movie.movie_title,
            movie_poster: movie.movie_poster,
          })),
        },
      });
    });
  }

  if (books) {
    books.forEach((book: any) => {
      createPage({
        path: `philosophy/${book.book_uid}`,
        component: path.resolve(`./src/templates/BookPage.tsx`),
        context: {
          bookTitle: book.book_title,
          bookDescription: book.book_description,
          pages: book.pages,
          datePublished: book.date_book_published,
          subjects: book.book_subjects,
          coverImage: book.book_cover_image,
          goodreadsLink: book.goodreads_link,
          isbn: book.isbn,
          authorUid: book.author_uid,
          authorName: book.author.author_name,
        },
      });
    });
  }

  if (authors) {
    authors.forEach((author: any) => {
      createPage({
        path: `authors/${author.author_uid}`,
        component: path.resolve(`./src/templates/AuthorPage.tsx`),
        context: {
          authorUid: author.author_uid,
          authorName: author.author_name,
          authorBiography: author.author_biography,
          dateBorn: author.date_author_born,
          dateDeceased: author.date_author_deceased,
          authorImage: author.author_image,
          books: author.books.map((book: any) => ({
            book_uid: book.book_uid,
            book_title: book.book_title,
            book_cover_image: book.book_cover_image,
          })),
        },
      });
    });
  }
};
