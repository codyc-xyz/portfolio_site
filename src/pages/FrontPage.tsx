import React from 'react';
import Header from '../components/general/Header';

interface ImageWithTextProps {
  src: string;
  alt: string;
}

const ImageWithText: React.FC<ImageWithTextProps> = ({ src, alt }) => {
  return (
    <div className="flex flex-col items-center m-2 mb-4">
      <img className="w-full h-64 object-cover" src={src} alt={alt} />
    </div>
  );
};

const FrontPage: React.FC = () => {
  const images = [
    {
      src: `/static/Front_Page/MoviePageScreenshot.png`,
      alt: `Movie Page`,
      text: `Explore movies I loved.`,
      section: `Movies`,
    },
    {
      src: `/static/Front_Page/PhilosophyPageScreenshot.png`,
      alt: `Philosophy Page`,
      text: `Explore books I found interesting.`,
      section: `Philosophy`,
    },
  ];

  return (
    <div className="container text-text flex flex-col h-screen">
      <Header />
      <div className="flex flex-col justify-center text-3xl m-4">
        <p className="my-2">Hi.</p>
        <p className="my-2">My name is Cody.</p>
        <p className="my-2">
          I&apos;m a developer passionate about movies, music, philosophy, and
          code.
        </p>
        <p className="my-2">Welcome to my portfolio.</p>
        <p className="my-2">
          Explore movies I love, philosophy I find interesting, and much more!
        </p>
      </div>
      <div className="grid grid-cols-2 gap-1 flex-grow">
        {images.map((image, index) => (
          <ImageWithText key={index} src={image.src} alt={image.alt} />
        ))}
      </div>
    </div>
  );
};

export default FrontPage;
