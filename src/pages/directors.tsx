import React, { useState, useEffect } from 'react';
import Header from '../components/general/Header';
import { DirectorAttributes } from '../types/DirectorAttributes';
import Card from '../components/general/Card';
import axios from 'axios';
import PageHeader from '../components/general/PageHeader';

const Movies: React.FC = () => {
  const [directors, setDirectors] = useState<DirectorAttributes[]>([]);
  const [filteredDirectors, setFilteredDirectors] = useState<
    DirectorAttributes[]
  >([]);
  const [randomDirectorIndex, setRandomDirectorIndex] = useState(0);
  const [searchValue, setSearchValue] = useState<string>(``);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const filteredResults = directors.filter((director) => {
      return (
        director.director_name.includes(searchValue) ||
        director.director_country_of_birth.includes(searchValue)
      );
    });
    setFilteredDirectors(filteredResults);
  };

  const handleClearSearch = () => {
    setSearchValue(``);
    setFilteredDirectors(directors);
  };

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

  useEffect(() => {
    if (directors.length > 0) {
      setFilteredDirectors(directors);
    }
  }, [directors]);

  useEffect(() => {
    if (filteredDirectors.length > 0) {
      const newIndex = Math.floor(Math.random() * filteredDirectors.length);
      setRandomDirectorIndex(newIndex);
    }
  }, [filteredDirectors]);

  const randomDirector = directors[randomDirectorIndex]?.director_uid;

  return (
    <div className="container">
      <Header />
      <PageHeader
        randomItem={randomDirector}
        searchValue={searchValue}
        onSubmit={handleSearchSubmit}
        onInputChange={handleSearchInputChange}
        onClear={handleClearSearch}
        titleText="Directors I Love"
      />
      <div className="grid grid-cols-6 grid-rows-2 gap-4 mt-2">
        {filteredDirectors.map((director) => {
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
