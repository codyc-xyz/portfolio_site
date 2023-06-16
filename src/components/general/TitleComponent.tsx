import React from 'react';

interface TitleComponentProps {
  text: string;
  className?: string;
}

const TitleComponent: React.FC<TitleComponentProps> = ({ text, className }) => {
  return (
    <h1
      className={`${className} w-full text-center text-base md:text-base lg:text-2xl flex-grow flex-shrink-0 md:w-1/3`}
    >
      {text}
    </h1>
  );
};

export default TitleComponent;
