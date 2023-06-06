import React from 'react';
import Header from '../components/general/Header';

interface ImageWithTextProps {
  src: string;
  alt: string;
  link: string;
}

const ImageWithText: React.FC<ImageWithTextProps> = ({ src, alt, link }) => {
  return (
    <div className="flex flex-col items-center m-2 mb-4 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-sm">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative"
      >
        <img className="w-full h-auto object-cover" src={src} alt={alt} />
      </a>
    </div>
  );
};

const FrontPage: React.FC = () => {
  const images = [
    {
      src: `/static/Front_Page/MovieDemoScreenShot.png`,
      alt: `Movie Page`,
      link: `/movies/8ad79b8a-9674-4fb6-bc50-3b6b35844272/`,
    },
    {
      src: `/static/Front_Page/PhilosophyDemoScreenShot.png`,
      alt: `Philosophy Page`,
      link: `/philosophy/0ace69d6-f36c-41bf-9189-6f833833e157`,
    },
  ];

  return (
    <div className="container text-text flex flex-col h-screen">
      <Header />
      <div className="flex flex-col justify-center text-3xl mx-0 my-2">
        <p className="my-1">Hi.</p>
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
          <ImageWithText
            key={index}
            src={image.src}
            alt={image.alt}
            link={image.link}
          />
        ))}
      </div>
    </div>
  );
};

export default FrontPage;
