// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from 'react';
import { Provider } from 'react-redux';
import App from './src/app';
import store from './src/redux/store';
import Layout from './src/Layout';
import { ThemeProvider } from './src/contexts/ThemeContext';

exports.onInitialClientRender = () => {
  const head = document.head;

  const script1 = document.createElement(`script`);
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=G-2CPTPXC9GQ`;
  head.appendChild(script1);

  const script2 = document.createElement(`script`);
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-2CPTPXC9GQ');
  `;
  head.appendChild(script2);
};

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <App>{element}</App>
  </ThemeProvider>
);

export const wrapPageElement = ({ element, props }) => {
  return (
    <Provider store={store}>
      <Layout {...props}>{element}</Layout>
    </Provider>
  );
};
