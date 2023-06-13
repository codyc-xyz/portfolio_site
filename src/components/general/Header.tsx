import { Link } from 'gatsby';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 px-0 container">
      <div className="w-1/4">
        <Link className="text-xl text-text hover:text-opacity-50" to="/">
          Home
        </Link>
      </div>
      <nav className="w-2/4 flex items-center justify-between">
        <Link
          className="text-xl font-medium text-text hover:text-opacity-50 mx-3"
          to="/movies"
        >
          Movies
        </Link>
        <Link
          className="text-xl font-medium text-text hover:text-opacity-50 mx-3"
          to="/directors"
        >
          Directors
        </Link>
        <Link
          className="text-xl font-medium text-text hover:text-opacity-50 mx-3"
          to="/books"
        >
          Books
        </Link>
        <Link
          className="text-xl font-medium text-text hover:text-opacity-50 mx-3"
          to="/authors"
        >
          Authors
        </Link>
      </nav>

      <div className="w-1/4 flex items-center justify-end">
        <div className="mr-0">
          <Link
            className="text-xl font-medium text-text hover:text-opacity-50"
            to="/projects"
          >
            Projects
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
