// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from 'react';
import { WrapPageElementBrowserArgs, WrapPageElementNodeArgs } from 'gatsby';
import Layout from './src/Layout';

export const wrapPageElement = ({
  element,
  props,
}: WrapPageElementBrowserArgs | WrapPageElementNodeArgs) => {
  return <Layout {...props}>{element}</Layout>;
};
