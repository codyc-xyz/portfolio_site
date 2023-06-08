import { ImageWithLink } from './ImageWithLink';
import React, { useState } from 'react';

interface ScrollbarProps {
  title: string;
  data: any[];
}

const Scrollbar: React.FC<ScrollbarProps> = ({ title, data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const remainingItems = data.length - (prevIndex + 6);
      if (remainingItems < 6 && remainingItems > 0) {
        return prevIndex + remainingItems;
      } else if (remainingItems >= 6) {
        return prevIndex + 6;
      } else {
        return prevIndex;
      }
    });
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 6, 0));
  };
  const dataToDisplay = data.slice(currentIndex, currentIndex + 6);

  return (
    <div className="h-full w-full flex flex-col space-y-1 text-text">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex overflow-hidden">
        {currentIndex !== 0 && (
          <button
            onClick={handlePrev}
            className="text-grey-500 hover:opacity-50"
          >
            &lt;
          </button>
        )}
        <div className="overflow-x-scroll hide-scrollbar grid grid-cols-6">
          {dataToDisplay.map((item) => {
            if (title === `Movies`) {
              return (
                <ImageWithLink
                  key={item.movie_uid}
                  src={item.movie_poster}
                  alt={item.title}
                  link={`/movies/${item.movie_uid}`}
                />
              );
            } else if (title === `Directors`) {
              return (
                <ImageWithLink
                  key={item.director_uid}
                  src={item.director_image}
                  alt={item.director_name}
                  link={`/directors/${item.director_uid}`}
                />
              );
            } else if (title === `Authors`) {
              return (
                <ImageWithLink
                  key={item.author_uid}
                  src={item.author_image}
                  alt={item.author_name}
                  link={`/authors/${item.author_uid}`}
                />
              );
            } else if (title === `Philosophy`) {
              return (
                <ImageWithLink
                  key={item.book_uid}
                  src={item.book_cover_image}
                  alt={item.book_title}
                  link={`/philosophy/${item.book_uid}`}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
        {currentIndex < data.length - 6 && (
          <button
            onClick={handleNext}
            className="text-grey-500 hover:opacity-50"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default Scrollbar;
