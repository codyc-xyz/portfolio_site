import { Link } from 'gatsby';
import MobileHeader from './MobileHeader';

const Header = () => {
  return (
    <div>
      <MobileHeader />
      <header className="hidden sm:flex items-center justify-between sm:py-1 md:py-2 lg:py-3 xl:py-3 px-0 container py-2">
        <div className="ml-0 w-1/6 sm:w-1/6 md:w-1/4 flex items-center justify-start">
          <Link
            className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl linkText"
            to="/"
          >
            Home
          </Link>
        </div>
        <div className="w-2/3 sm:w-2/3 md:w-1/2  flex items-center justify-between">
          <Link
            className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium linkText mx-0.5 sm:mx-1 lg:mx-2 xl:mx-4"
            to="/movies"
          >
            Movies
          </Link>
          <Link
            className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium linkText mx-0.5 sm:mx-1 lg:mx-2 xl:mx-4"
            to="/directors"
          >
            Directors
          </Link>
          <Link
            className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium linkText mx-0.5 sm:mx-1 lg:mx-2 xl:mx-4"
            to="/books"
          >
            Books
          </Link>
          <Link
            className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium linkText mx-0.5 sm:mx-1 lg:mx-2 xl:mx-4"
            to="/authors"
          >
            Authors
          </Link>
        </div>

        <div className=" mr-0 w-1/6 sm:w-1/6 md:w-1/4 flex items-center justify-end">
          <Link
            className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium linkText"
            to="/projects"
          >
            Projects
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
