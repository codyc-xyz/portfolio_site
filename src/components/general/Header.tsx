const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 px-0">
      <div className="w-1/4">
        <a className="text-xl text-text hover:text-opacity-50" href="/">
          Home
        </a>
      </div>
      <nav className="w-2/4 flex items-center justify-between">
        <a
          className="text-xl font-medium text-text hover:text-opacity-50 mx-3"
          href="/movies"
        >
          Movies
        </a>
        <a
          className="text-xl font-medium text-text hover:text-opacity-50 mx-3"
          href="/directors"
        >
          Directors
        </a>
        <a
          className="text-xl font-medium text-text hover:text-opacity-50 mx-3"
          href="/philosophy"
        >
          Philosophy
        </a>
        <a
          className="text-xl font-medium text-text hover:text-opacity-50 mx-3"
          href="/authors"
        >
          Authors
        </a>
      </nav>

      <div className="w-1/4 flex items-center justify-end">
        <div className="mr-0">
          <a
            className="text-xl font-medium text-text hover:text-opacity-50"
            href="/projects"
          >
            Projects
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
