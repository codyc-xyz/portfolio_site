import { useState } from 'react';
import { Link } from 'gatsby';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex sm:hidden items-center justify-between py-1 px-0 container">
      <div className="flex items-center justify-between w-full sm:w-1/4">
        <Link className="text-lg text-text hover:text-opacity-50" to="/">
          Home
        </Link>

        <button
          className="sm:hidden p-2 transform right-0 top-0"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-text"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      <div
        className={`fixed transform top-0 left-0 w-1/2 h-full bg-gray-50 overflow-auto ease-in-out transition-all duration-300 z-30 ${
          isOpen ? `translate-x-0` : `-translate-x-full`
        } flex flex-col items-center justify-start`}
      >
        {[`/movies`, `/directors`, `/books`, `/authors`, `/projects`].map(
          (link, index) => (
            <Link
              key={index}
              className="text-xl font-medium text-text hover:text-opacity-50 hover:bg-gray-100 w-full text-center py-4"
              to={link}
              onClick={() => setIsOpen(!isOpen)}
            >
              {link.substring(1).charAt(0).toUpperCase() + link.substring(2)}
            </Link>
          ),
        )}
      </div>
    </header>
  );
};

export default Header;
