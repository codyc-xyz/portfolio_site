import React, { useState, useEffect } from 'react';
import Header from '../../components/general/Header';
import IntroText from '../../components/front_page/IntroText';
import axios from 'axios';

interface ImageAttributes {
  image_uid: string;
  title: string;
  image_url: string;
  text: string;
}

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
      <div>
        {images.map((image) => (
          <img src={image.image_url} alt={image.title} key={image.image_uid} />
        ))}
      </div>
    </div>
  );
};

export default FrontPage;
