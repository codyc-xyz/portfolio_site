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
    const sortedFilteredResults = sortDirectors(
      filteredResults,
      selectedSortOption,
    );
    setFilteredDirectors(sortedFilteredResults);
  };

  const handleClearSearch = () => {
    setSearchValue(``);
    const sortedDirectors = sortDirectors(directors, selectedSortOption);
    setFilteredDirectors(sortedDirectors);
  };

  const handleSortOptionClick = (option: string) => {
    setSortExpanded(!isSortExpanded);
    setSelectedSortOption(option);
  };

  const sortDirectors = (
    directors: DirectorAttributes[],
    sortOption: string,
  ) => {
    switch (sortOption) {
      case `Name (A-Z)`:
        return directors.sort((a, b) =>
          a.director_name.localeCompare(b.director_name),
        );
      case `Date Born Ascending`:
        return directors.sort(
          (a, b) =>
            new Date(a.date_director_born).getTime() -
            new Date(b.date_director_born).getTime(),
        );
      case `Date Born Descending`:
        return directors.sort(
          (a, b) =>
            new Date(b.date_director_born).getTime() -
            new Date(a.date_director_born).getTime(),
        );
      case `Country (A-Z)`:
        return directors.sort((a, b) =>
          a.director_country_of_birth.localeCompare(
            b.director_country_of_birth,
          ),
        );
      case `Number of Movies`:
        return directors.sort((a, b) => b.movies.length - a.movies.length);
      default:
        return directors;
    }
  };

  useEffect(() => {
    async function fetchDirectors() {
      try {
        const response = await axios.get<DirectorAttributes[]>(
          `http://localhost:3001/directors`,
        );
        const fetchedDirectors = sortDirectors(
          response.data,
          selectedSortOption,
        );
        setDirectors(fetchedDirectors);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDirectors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    if (filteredDirectors.length > 0) {
      const sortedDirectors = sortDirectors(
        [...filteredDirectors],
        selectedSortOption,
      );
      setFilteredDirectors(sortedDirectors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSortOption, directors]);

  const randomDirector = filteredDirectors[randomDirectorIndex]?.director_uid;

  const sortOptions = [
    `Name (A-Z)`,
    `Country (A-Z)`,
    `Date Born Ascending`,
    `Date Born Descending`,
    `Number of Films`,
  ];

  const dropdown = (
    <Dropdown
      className="mx-5"
      options={sortOptions}
      selectedOption={selectedSortOption}
      onOptionClick={handleSortOptionClick}
    />
  );
  return (
    <div className="container text-text">
      <Header />
      <div className="flex flex-col gap-2">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <LinkComponent href={randomDirector} text="Random" />
            <ButtonWithDropdown
              label="Sort"
              isExpanded={isSortExpanded}
              onButtonClick={() => setSortExpanded(!isSortExpanded)}
              dropdown={dropdown}
              widthClass="w-full"
              paddingClass=" w-full py-1 px-3 ml-5 mr-7"
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
    </div>
  );
};

export default Directors;
