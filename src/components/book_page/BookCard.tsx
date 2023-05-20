import React from 'react';

interface BookCardProps {
  title: string;
  imageUrl: string;
  bookPageUrl: string;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  imageUrl,
  bookPageUrl,
}) => {
  return (
    <div className="flex flex-col">
      <a href={bookPageUrl} className="relative">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto"
            style={{ objectFit: `cover`, height: `250px` }}
          />
        </div>
      </a>
      <div className="font-medium text-text"></div>
    </div>
  );
};

export default BookCard;
