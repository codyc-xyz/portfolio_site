import React from 'react';
import { Link } from 'gatsby';

interface CardProps {
  title?: string;
  imageUrl: string;
  secondaryText?: string;
  pageUrl: string;
  altText: string;
  imageHeight?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  imageUrl,
  secondaryText,
  pageUrl,
  altText,
  imageHeight = `250px`,
}) => {
  return (
    <div className="flex flex-col">
      <Link to={pageUrl} className="relative">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-sm">
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-auto"
            style={{ objectFit: `cover`, height: imageHeight }}
          />
        </div>
      </Link>
      <div className="font-medium text-text">
        {title && <p>{title}</p>}
        {secondaryText && <p>{secondaryText}</p>}
      </div>
    </div>
  );
};

export default Card;
