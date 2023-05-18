import type { GatsbyNode } from 'gatsby';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
const webpack = require('webpack');
import path from 'path';

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
        zlib: false
      },
      alias: {
        process: 'process/browser',
        buffer: 'buffer',
        stream: "stream-browserify",
        http: "stream-http"
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
        dns: 'empty',
      }),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
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
      }
    }
  }
  `);
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }
  const movies = result.data.segments.allMovies;

  if (movies) {
    movies.forEach((movie: any) => {
      createPage({
        path: movie.movie_title,
        component: path.resolve('./src/templates/MoviePage.tsx'),
        context: {
          movieUid: movie.movie_uid,
          movieTitle: movie.movie_title,
        },
      });
    });
  }
};
