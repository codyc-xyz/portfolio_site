import React from 'react';

interface LinkComponentProps {
  href: string;
  text: string;
}

const LinkComponent: React.FC<LinkComponentProps> = ({ href, text }) => {
  return (
    <div className="w-1/4 flex text-center">
      <a
        href={href}
        className="text-xl hover:text-opacity-50 text-primary rounded"
      >
        {text}
      </a>
    </div>
  );
};

export default LinkComponent;
