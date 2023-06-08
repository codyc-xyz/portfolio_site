import React, { useState } from 'react';
import Spinner from './Spinner';

export interface ImageWithLinkProps {
  src: string;
  alt: string;
  link: string;
}

export const ImageWithLink: React.FC<ImageWithLinkProps> = ({
  src,
  alt,
  link,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center m-2 mb-4 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-sm">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative"
      >
        <div className="w-10.5 h-11.5 flex justify-center items-center">
          {isLoading && <Spinner />}
          <img
            className="w-full h-full"
            src={src}
            alt={alt}
            onLoad={handleLoad}
            style={isLoading ? { display: `none` } : {}}
          />
        </div>
      </a>
    </div>
  );
};
