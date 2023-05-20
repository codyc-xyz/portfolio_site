import React, { ReactNode } from 'react';
import { Link } from 'gatsby';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <body className="bg-background">
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
      <main className="bg-background">
        <div className="container">{children}</div>
      </main>
    </body>
  );
};

export default Layout;
