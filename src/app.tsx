import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React, { ReactNode } from 'react';
import './styles/global.css';

export const client = new ApolloClient({
  uri: `${process.env.GATSBY_SERVER_URL}/graphql`,
  cache: new InMemoryCache(),
});

interface AppProps {
  children: ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default App;
