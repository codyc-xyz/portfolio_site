import React, { ReactNode, useEffect, useState } from 'react';
import MusicPlayer from './components/general/MusicPlayer';
import Header from './components/general/Header';
import ScrollArrow from './components/general/ScrollArrow';
import { ThemeContext } from './contexts/ThemeContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const themeContext = React.useContext(ThemeContext);

  if (!themeContext) {
    throw new Error(
      `ThemeContext is undefined. Make sure it is provided by a ThemeProvider`,
    );
  }

  const { theme } = themeContext;
  const [className, setClassName] = useState(``);

  useEffect(() => {
    setClassName(
      theme === `dark` ? `dark bg-black min-h-screen text-white` : `text-text`,
    );
  }, [theme]);

  return (
    <div className={className}>
      <Header />
      <MusicPlayer />
      {children}
      <ScrollArrow />
    </div>
  );
};

export default Layout;
