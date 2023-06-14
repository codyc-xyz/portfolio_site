import { Link } from 'gatsby';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-1 sm:py-1 md:py-2 lg:py-3 xl:py-3 px-0 container my-2">
      <div className="ml-0 w-1/6 sm:w-1/6 md:w-1/4 flex items-center justify-start">
        <Link
          className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-text hover:text-opacity-50"
          to="/"
        >
          Home
        </Link>
      </div>
      <div className="w-2/3 sm:w-2/3 md:w-1/2  flex items-center justify-between">
        <Link
          className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-text hover:text-opacity-50 mx-0.5 sm:mx-1 lg:mx-2 xl:mx-4"
          to="/movies"
        >
          Movies
        </Link>
        <Link
          className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-text hover:text-opacity-50 mx-0.5 sm:mx-1 lg:mx-2 xl:mx-4"
          to="/directors"
        >
          Directors
        </Link>
        <Link
          className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-text hover:text-opacity-50 mx-0.5 sm:mx-1 lg:mx-2 xl:mx-4"
          to="/books"
        >
          Books
        </Link>
        <Link
          className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-text hover:text-opacity-50 mx-0.5 sm:mx-1 lg:mx-2 xl:mx-4"
          to="/authors"
        >
          Authors
        </Link>
      </div>

      <div className=" mr-0 w-1/6 sm:w-1/6 md:w-1/4 flex items-center justify-end">
        <Link
          className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-text hover:text-opacity-50"
          to="/projects"
        >
          Projects
        </Link>
      </div>
    </header>
  );
};

export default Header;
