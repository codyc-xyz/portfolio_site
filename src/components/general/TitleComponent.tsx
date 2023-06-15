import React from 'react';

interface TitleComponentProps {
  text: string;
  className?: string;
}

const TitleComponent: React.FC<TitleComponentProps> = ({ text, className }) => {
  return (
    <h1
      className={`${className} text-center text-base lg:text-xl xl:text-2xl flex-grow flex-shrink-0 ml-auto mr-auto w-full md:w-1/2`}
    >
      {text}
    </h1>
  );
};

export default TitleComponent;
