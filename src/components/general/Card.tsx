import React from 'react';
import { Link } from 'gatsby';

interface CardProps {
  title?: string;
  imageUrl: string;
  secondaryText?: string;
  pageUrl: string;
  altText: string;
}

const Card: React.FC<CardProps> = ({
  title,
  imageUrl,
  secondaryText,
  pageUrl,
  altText,
}) => {
  return (
    <div className="flex flex-col">
      <Link to={pageUrl} className="relative">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-sm dark:bg-gray-800 dark:shadow-2xl">
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-auto"
            style={{ objectFit: `cover` }}
          />
        </div>
      </Link>
      <div className="font-medium text-text dark:text-white">
        {title && <p>{title}</p>}
        {secondaryText && <p>{secondaryText}</p>}
      </div>
    </div>
  );
};

export default Card;
