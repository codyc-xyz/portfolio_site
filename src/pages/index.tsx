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
        <Link to="/">FrontPage</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/directors">Directors</Link>
        <Link to="/books">Books</Link>
        <Link to="/authors">Authors</Link>
        <Link to="/projects">Projects</Link>
      </div>
    </ApolloProvider>
  );
}
