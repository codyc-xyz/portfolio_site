import React, { useState, useEffect } from 'react';
import Header from '../../components/general/Header';
import IntroText from '../../components/front_page/IntroText';
import axios from 'axios';
import ImageCard from '../../components/front_page/ImageCard';
import { ImageAttributes } from '../../types/ImageAttributes';

const FrontPage: React.FC = () => {
  const [images, setImages] = useState<ImageAttributes[]>([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await axios.get<ImageAttributes[]>(
          `http://localhost:3001/images`,
        );
        setImages(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchImages();
  }, []);

  return (
    <div>
      <Header />
      <IntroText />
      <div className="grid grid-cols-5 gap-4" style={{ marginTop: `48px` }}>
        {images.map((image) => (
          <ImageCard key={image.imageUid} {...image} />
        ))}
      </div>
    </div>
  );
};

export default FrontPage;
