import React from 'react';
import { ImageAttributes } from '../../types/ImageAttributes';

interface ImageCardProps extends ImageAttributes {}

const ImageCard: React.FC<ImageCardProps> = ({ title, imageUrl, text }) => {
  return (
    <div className="flex flex-col">
      <img src={imageUrl} alt={title} className="w-full h-auto" />
      <p>{text}</p>
    </div>
  );
};

export default ImageCard;
