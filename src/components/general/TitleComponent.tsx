import React from 'react';

interface TitleComponentProps {
  text: string;
  className?: string;
}

const TitleComponent: React.FC<TitleComponentProps> = ({ text, className }) => {
  return (
    <h1
      className={`${className} w-full text-center text-xl md:text-lg lg:text-xl xl:text-2xl lg:w-2/5 flex-grow flex-shrink-0`}
    >
      {text}
    </h1>
  );
};

export default TitleComponent;
