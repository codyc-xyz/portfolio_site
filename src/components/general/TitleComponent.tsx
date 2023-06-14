import React from 'react';

interface TitleComponentProps {
  text: string;
  className?: string;
}

const TitleComponent: React.FC<TitleComponentProps> = ({ text }) => {
  return (
    <h1 className="text-center text-xl lg:text-2xl xl:text-3xl flex-grow flex-shrink-0 ml-auto mr-auto w-1/2">
      {text}
    </h1>
  );
};

export default TitleComponent;
