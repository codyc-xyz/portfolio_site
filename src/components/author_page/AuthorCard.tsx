import React from 'react';

interface AuthorCardProps {
  imageUrl: string;
  authorName: string;
  authorPageUrl: string;
}

const AuthorCard: React.FC<AuthorCardProps> = ({
  imageUrl,
  authorName,
  authorPageUrl,
}) => {
  return (
    <div className="flex flex-col">
      <a href={authorPageUrl} className="relative">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={authorName}
            className="w-full h-auto"
            style={{ objectFit: `cover`, height: `350px` }}
          />
        </div>
      </a>
      <div className="font-medium text-text">
        <p>{authorName}</p>
      </div>
    </div>
  );
};

export default AuthorCard;
