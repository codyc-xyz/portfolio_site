import { ImageWithLink } from './ImageWithLink';
import React, { useState, useEffect } from 'react';
import { sanitizeName } from '../../../functions/sanitizeName';

interface ScrollbarProps {
  title: string;
  data: any[];
}

const Scrollbar: React.FC<ScrollbarProps> = ({ title, data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.matchMedia(`(max-width: 768px)`).matches) {
        setItemsPerPage(2);
      } else if (window.matchMedia(`(max-width: 1024px)`).matches) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(6);
      }
    };

    updateItemsPerPage();
    window.addEventListener(`resize`, updateItemsPerPage);

    return () => {
      window.removeEventListener(`resize`, updateItemsPerPage);
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const remainingItems = data.length - (prevIndex + itemsPerPage);
      if (remainingItems < itemsPerPage && remainingItems > 0) {
        return prevIndex + remainingItems;
      } else if (remainingItems >= itemsPerPage) {
        return prevIndex + itemsPerPage;
      } else {
        return prevIndex;
      }
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const dataToDisplay = data.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="h-full w-full flex flex-col space-y-1 text-text">
      <h2 className="text-base md:text-lg lg:text-xl font-medium">{title}</h2>
      <div className="flex">
        <div
          className={`flex ${
            currentIndex !== 0 ? `` : `opacity-0 pointer-events-none`
          }`}
        >
          <button
            onClick={handlePrev}
            className="text-grey-500 text-2xl hover:opacity-50"
          >
            &lt;
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 flex-grow">
          {dataToDisplay.map((item) => {
            if (title === `Movies I Love`) {
              return (
                <ImageWithLink
                  key={item.movie_uid}
                  src={item.movie_poster}
                  alt={item.title}
                  link={`/movies/${sanitizeName(item.movie_title)}`}
                />
              );
            } else if (title === `Directors I Love`) {
              return (
                <ImageWithLink
                  key={item.director_uid}
                  src={item.director_image}
                  alt={item.director_name}
                  link={`/directors/${sanitizeName(item.director_name)}`}
                />
              );
            } else if (title === `Authors I Find Interesting`) {
              return (
                <ImageWithLink
                  key={item.author_uid}
                  src={item.author_image}
                  alt={item.author_name}
                  link={`/authors/${sanitizeName(item.author_name)}`}
                />
              );
            } else if (title === `Books I Find Interesting`) {
              return (
                <ImageWithLink
                  key={item.book_uid}
                  src={item.book_cover_image}
                  alt={item.book_title}
                  link={`/books/${sanitizeName(item.book_title)}`}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
        <div
          className={`flex ${
            currentIndex < data.length - itemsPerPage
              ? ``
              : `opacity-0 pointer-events-none`
          }`}
        >
          <button
            onClick={handleNext}
            className="text-grey-500 text-2xl hover:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
export default Scrollbar;
