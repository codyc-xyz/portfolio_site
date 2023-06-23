import type { GatsbyNode } from 'gatsby';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import path from 'path';
import { MovieAttributes } from './src/types/MovieAttributes';
import { DirectorAttributes } from './src/types/DirectorAttributes';
import { BookAttributes } from './src/types/BookAttributes';
import { AuthorAttributes } from './src/types/AuthorAttributes';
import { ProjectAttributes } from './src/types/ProjectAttributes';

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
export function sanitizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, `_`)
    .replace(/__+/g, `_`)
    .replace(/^_+|_+$/g, ``);
}

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
          country_of_origin
          author {
            author_name
          }
          excerpts {
            excerpt_uid
            text
            page_number
            chapter
            section
          }
        }
        allAuthors {
          author_uid
          author_name
          author_biography
          date_author_born
          date_author_deceased
          author_image
          country_of_birth
          books {
            book_uid
            book_title
            book_cover_image
          }
        }
        allProjects {
          project_uid
          project_name
          project_description
          project_status
          date_started
          technologies
          project_image
          project_size
          project_link
          github_project_link
          github_ui_link
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
  const projects = result.data.segments.allProjects;

  if (movies) {
    movies.forEach((movie: MovieAttributes) => {
      createPage({
        path: `movies/${sanitizeName(movie.movie_title)}`,
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
    directors.forEach((director: DirectorAttributes) => {
      createPage({
        path: `directors/${sanitizeName(director.director_name)}`,
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
    books.forEach((book: BookAttributes) => {
      createPage({
        path: `books/${sanitizeName(book.book_title)}`,
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
          countryOfOrigin: book.country_of_origin,
          authorUid: book.author_uid,
          authorName: book.author.author_name,
          excerpts: book.excerpts.map((excerpt: any) => ({
            excerpt_uid: excerpt.excerpt_uid,
            text: excerpt.text,
            page_number: excerpt.page_number,
            chapter: excerpt.chapter,
            section: excerpt.section,
          })),
        },
      });
    });
  }

  if (authors) {
    authors.forEach((author: AuthorAttributes) => {
      createPage({
        path: `authors/${sanitizeName(author.author_name)}`,
        component: path.resolve(`./src/templates/AuthorPage.tsx`),
        context: {
          authorUid: author.author_uid,
          authorName: author.author_name,
          authorBiography: author.author_biography,
          dateBorn: author.date_author_born,
          dateDeceased: author.date_author_deceased,
          authorImage: author.author_image,
          countryOfBirth: author.country_of_birth,
          books: author.books.map((book: any) => ({
            book_uid: book.book_uid,
            book_title: book.book_title,
            book_cover_image: book.book_cover_image,
          })),
        },
      });
    });
  }

  if (projects) {
    projects.forEach((project: ProjectAttributes) => {
      createPage({
        path: `projects/${sanitizeName(project.project_name)}`,
        component: path.resolve(`./src/templates/ProjectPage.tsx`),
        context: {
          projectUid: project.project_uid,
          projectName: project.project_name,
          projectDescription: project.project_description,
          dateStarted: project.date_started,
          projectImage: project.project_image,
          technologies: project.technologies,
          projectStatus: project.project_status,
          projectSize: project.project_size,
          projectLink: project.project_link,
          projectGithub: project.github_project_link,
          uiGithub: project.github_ui_link,
        },
      });
    });
  }
};
