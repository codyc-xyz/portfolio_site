import React, { ReactNode } from 'react';
import MusicPlayer from './components/general/MusicPlayer';
import Header from './components/general/Header';
import ScrollArrow from './components/general/ScrollArrow';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header></Header>
      <MusicPlayer />
      {children}
      <ScrollArrow />
    </>
  );
};

export default Layout;
