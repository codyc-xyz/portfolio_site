// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Layout from './src/Layout';

export const wrapPageElement = ({ element, props }) => {
  const excludePaths = [
    `/movies/`,
    `/directors/`,
    `/philosophy/`,
    `/authors/`,
    `/`,
  ];
  const isMainPage = excludePaths.some(
    (path) =>
      props.path.startsWith(path) &&
      !props.path.substring(path.length).includes(`/`),
  );

  if (isMainPage) {
    return (
      <Provider store={store}>
        <Layout {...props}>{element}</Layout>
      </Provider>
    );
  }

  return element;
};
