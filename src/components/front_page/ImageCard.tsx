import React from 'react';

interface ImageCardProps {
  title: string;
  imageUrl: string;
  text: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ title, imageUrl, text }) => {
  return (
    <div className="flex flex-col">
      <img src={imageUrl} alt={title} className="w-full h-auto" />
      <p>{text}</p>
    </div>
  );
};

export default ImageCard;
