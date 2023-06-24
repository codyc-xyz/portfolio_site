// gatsby-config.ts

import type { GatsbyConfig } from 'gatsby';
import dotenv from 'dotenv';

dotenv.config();

const config: GatsbyConfig = {
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  plugins: [
    `gatsby-plugin-pnpm`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require(`tailwindcss`), require(`autoprefixer`)],
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: false,
        develop: false,
        tailwind: true,
      },
    },
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `segments`,
        fieldName: `segments`,
        url: `${process.env.GATSBY_SERVER_URL}/graphql`,
      },
    },
  ],

  flags: { DEV_SSR: true },
  jsxRuntime: `automatic`,
};

export default config;
