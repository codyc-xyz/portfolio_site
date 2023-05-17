import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'gatsby';
import FrontPage from './FrontPage';
import Movies from './movies';
import '../styles/global.css';

export default function Home() {
  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/"></Link>
            </li>
            <li>
              <Link to="/movies"></Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}
