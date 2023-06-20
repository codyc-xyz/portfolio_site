import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Link } from 'gatsby';
import '../styles/global.css';

export const client = new ApolloClient({
  uri: `${process.env.GATSBY_SERVER_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Link to="/"></Link>
        <Link to="/movies"></Link>
        <Link to="/directors"></Link>
        <Link to="/books"></Link>
        <Link to="/authors"></Link>
        <Link to="/projects"></Link>
      </div>
    </ApolloProvider>
  );
}
