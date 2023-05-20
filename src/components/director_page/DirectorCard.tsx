import React from 'react';

interface DirectorCardProps {
  imageUrl: string;
  birthCountry: string;
  directorName: string;
  directorPageUrl: string;
}

const DirectorCard: React.FC<DirectorCardProps> = ({
  imageUrl,
  birthCountry,
  directorName,
  directorPageUrl,
}) => {
  return (
    <div className="flex flex-col">
      <a href={directorPageUrl} className="relative">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={directorName}
            className="w-full h-auto"
            style={{ objectFit: `cover`, height: `250px` }}
          />
        </div>
      </a>
      <div className="font-medium text-text">
        <p>{directorName}</p>
        <p>{birthCountry}</p>
      </div>
    </div>
  );
};

export default DirectorCard;
