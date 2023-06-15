import React, { useEffect, useState } from 'react';
import { Search } from 'react-feather';

const SubmitButton: React.FC = () => {
  const [iconSize, setIconSize] = useState(20);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setIconSize(14);
      } else if (width < 976) {
        setIconSize(16);
      } else if (width >= 976) {
        setIconSize(20);
      }
    };

    handleResize();

    window.addEventListener(`resize`, handleResize);

    return () => window.removeEventListener(`resize`, handleResize);
  }, []);

  return (
    <button
      type="submit"
      className="ml-0.5 md:ml-2 text-primary text-base lg:text-lg hover:text-opacity-50"
    >
      <Search size={iconSize} />
    </button>
  );
};

export default SubmitButton;
