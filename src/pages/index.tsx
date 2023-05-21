import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './FrontPage';
import Movies from './movies';
import Layout from '../Layout';
import '../styles/global.css';

export default function Home() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </Layout>
    </Router>
  );
}
