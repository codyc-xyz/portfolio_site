// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from 'react';
import { WrapPageElementBrowserArgs, WrapPageElementNodeArgs } from 'gatsby';
import { MusicPlayerProvider } from './src/contexts/MusicPlayerContext';

import Layout from './src/Layout';

export const wrapPageElement = ({
  element,
  props,
}: WrapPageElementBrowserArgs | WrapPageElementNodeArgs) => {
  return (
    <MusicPlayerProvider>
      <Layout {...props}>{element}</Layout>
    </MusicPlayerProvider>
  );
};
