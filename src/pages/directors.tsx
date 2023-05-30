import React, { useState, useEffect } from 'react';
import Header from '../components/general/Header';
import { DirectorAttributes } from '../types/DirectorAttributes';
import Card from '../components/general/Card';
import axios from 'axios';

const Movies: React.FC = () => {
  const [directors, setDirectors] = useState<DirectorAttributes[]>([]);

  useEffect(() => {
    async function fetchDirectors() {
      try {
        const response = await axios.get<DirectorAttributes[]>(
          `http://localhost:3001/directors`,
        );
        setDirectors(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDirectors();
  }, []);
  return (
    <div className="container">
      <Header />
      <h1
        className="text-center text-3xl"
        style={{ marginTop: `24px`, marginBottom: `24px` }}
      >
        Directors I Love
      </h1>
      <div className="grid grid-cols-6 grid-rows-2 gap-4 mt-2">
        {directors.map((director) => {
          return (
            <Card
              key={director.director_uid}
              pageUrl={`/directors/${director.director_uid}`}
              altText={director.director_name}
              title={director.director_name}
              imageUrl={director.director_image}
              secondaryText={director.director_country_of_birth}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
