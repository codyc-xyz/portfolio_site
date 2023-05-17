import React from 'react';

interface MovieCardProps {
  title: string;
  imageUrl: string;
  originCountry: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  imageUrl,
  originCountry,
}) => {
  return (
    <div className="flex flex-col">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-auto"
        style={{ objectFit: `cover`, height: `250px` }}
      />
      <p>{title}</p>
      <p>{originCountry}</p>
    </div>
  );
};

export default MovieCard;
