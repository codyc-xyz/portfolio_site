import React, { useState, useEffect } from 'react';
import Header from '../components/general/Header';
import { DirectorAttributes } from '../types/DirectorAttributes';
import Card from '../components/general/Card';
import axios from 'axios';
import LinkComponent from '../components/general/LinkComponent';
import Dropdown from '../components/general/Dropdown';
import TitleComponent from '../components/general/TitleComponent';
import SearchBarComponent from '../components/general/SearchBarComponent';
import ButtonWithDropdown from '../components/general/ButtonWithDropdown';

const Directors: React.FC = () => {
  const [directors, setDirectors] = useState<DirectorAttributes[]>([]);
  const [filteredDirectors, setFilteredDirectors] = useState<
    DirectorAttributes[]
  >([]);
  const [randomDirectorIndex, setRandomDirectorIndex] = useState(0);
  const [searchValue, setSearchValue] = useState<string>(``);
  const [isSortExpanded, setSortExpanded] = useState(false);
  const [selectedSortOption, setSelectedSortOption] =
    useState<string>(`Name (A-Z)`);

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

  const handleSortOptionClick = (option: string) => {
    setSortExpanded(!isSortExpanded);
    setSelectedSortOption(option);
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

  const sortOptions = [
    `Name (A-Z)`,
    `Country (A-Z)`,
    `Date Born Ascending`,
    `Date Born Descending`,
    `Movies Included`,
  ];

  const dropdown = (
    <Dropdown
      className="ml-5"
      options={sortOptions}
      selectedOption={selectedSortOption}
      onOptionClick={handleSortOptionClick}
    />
  );

  return (
    <div className="container">
      <Header />
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <LinkComponent href={randomDirector} text="Random" />
          <ButtonWithDropdown
            label="Sort"
            isExpanded={isSortExpanded}
            onButtonClick={() => setSortExpanded(!isSortExpanded)}
            dropdown={dropdown}
            widthClass="w-full"
            paddingClass=" w-full py-1 px-6 ml-5"
          />
        </div>
        <TitleComponent
          text={`Directors I Love`}
          className="self-center mx-auto"
        />
        <SearchBarComponent
          searchValue={searchValue}
          onSubmit={handleSearchSubmit}
          onInputChange={handleSearchInputChange}
          onClear={handleClearSearch}
        />
      </div>
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

export default Directors;
