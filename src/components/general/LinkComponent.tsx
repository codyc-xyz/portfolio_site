import React from 'react';

interface LinkComponentProps {
  href: string;
  text: string;
  onClick?: () => void;
}

const LinkComponent: React.FC<LinkComponentProps> = ({
  href,
  text,
  onClick,
}) => {
  return (
    <div className="w-1/4 flex text-center">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl hover:text-opacity-50 text-primary rounded"
        onClick={onClick}
      >
        {text}
      </a>
    </div>
  );
};

export default LinkComponent;
