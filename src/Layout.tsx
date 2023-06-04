import React, { ReactNode } from 'react';
import MusicPlayer from './components/general/MusicPlayer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <MusicPlayer />
      {children}
    </>
  );
};

export default Layout;
