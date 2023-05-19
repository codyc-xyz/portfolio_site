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
          director {
            director_name
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

  if (movies) {
    movies.forEach((movie: any) => {
      createPage({
        path: `movies/${movie.movie_uid}`,
        component: path.resolve(`./src/templates/MoviePage.tsx`),
        context: {
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
};
