// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/pages/index';
import store from './src/redux/store';
import Layout from './src/Layout';

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);

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
