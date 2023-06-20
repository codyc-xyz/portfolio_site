import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './FrontPage';
import Movies from './movies';
import '../styles/global.css';
import Directors from './directors';
import Books from './books';
import Authors from './authors';
import Projects from './projects';

export const client = new ApolloClient({
  uri: `${process.env.GATSBY_SERVER_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/directors" element={<Directors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}
