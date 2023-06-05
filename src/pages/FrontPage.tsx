import React from 'react';
import Header from '../components/general/Header';

const FrontPage: React.FC = () => {
  return (
    <div className="container text-text">
      <Header />
      <div className="flex">
        <div className="h-full flex flex-col justify-center text-3xl m-4">
          <p className="my-2">Hi.</p>
          <p className="my-2">My name is Cody.</p>
          <p className="my-2">
            I&apos;m a full stack developer passionate about movies, music,
            philosophy, and code.
          </p>
          <p className="my-2">Welcome to my portfolio.</p>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
