import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './FrontPage';
import Movies from './movies';
import '../styles/global.css';
import Directors from './directors';
import Philosophy from './philosophy';
import Authors from './authors';

export const client = new ApolloClient({
  uri: `http://localhost:3001/graphql`,
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
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/authors" element={<Authors />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}
