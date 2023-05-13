import type { GatsbyNode } from 'gatsby';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
const webpack = require('webpack');

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
        http: false,
        https: false,
        os: false,
        stream: false,
        path: false,
        buffer: false,
        zlib: false
      },
      alias: {
        process: 'process/browser',
        buffer: 'buffer'
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
