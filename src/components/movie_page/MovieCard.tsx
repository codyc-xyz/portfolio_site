import React from 'react';

interface MovieCardProps {
  title: string;
  imageUrl: string;
  originCountry: string;
  directorName: string;
  moviePageUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  imageUrl,
  originCountry,
  directorName,
  moviePageUrl,
}) => {
  return (
    <div className="flex flex-col">
      <a href={moviePageUrl} className="relative">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto"
            style={{ objectFit: `cover`, height: `250px` }}
          />
        </div>
      </a>
      <div className="font-medium text-text">
        <p>{directorName}</p>
        <p>{originCountry}</p>
      </div>
    </div>
  );
};

export default MovieCard;
