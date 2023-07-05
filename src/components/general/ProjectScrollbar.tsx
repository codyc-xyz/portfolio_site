import { ImageWithLink } from './ProjectImageWithLink';
import React, { useState, useEffect } from 'react';
import { sanitizeName } from '../../../functions/sanitizeName';

interface ScrollbarProps {
  title: string;
  data: any[];
}

const ProjectScrollbar: React.FC<ScrollbarProps> = ({ title, data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.matchMedia(`(max-width: 768px)`).matches) {
        setItemsPerPage(1);
      } else if (window.matchMedia(`(max-width: 1024px)`).matches) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
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
    <div className="h-full w-full flex flex-col space-y-1">
      <h2 className="text-base md:text-lg lg:text-xl xxl:text-2xl font-medium">
        {title}
      </h2>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-grow">
          {dataToDisplay.map((item) => {
            if (title === `Personal Projects`) {
              return (
                <ImageWithLink
                  key={item.project_uid}
                  src={item.project_image}
                  alt={item.project_name}
                  link={`/projects/${sanitizeName(item.project_name)}`}
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
export default ProjectScrollbar;
