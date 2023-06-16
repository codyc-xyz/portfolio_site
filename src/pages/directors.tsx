import React, { useState, useEffect } from 'react';
import { DirectorAttributes } from '../types/DirectorAttributes';
import Card from '../components/general/Card';
import LinkComponent from '../components/general/LinkComponent';
import Dropdown from '../components/general/Dropdown';
import TitleComponent from '../components/general/TitleComponent';
import SearchBarComponent from '../components/general/SearchBarComponent';
import ButtonWithDropdown from '../components/general/ButtonWithDropdown';
import LoadingOrError from '../components/general/LoadingOrError';
import { useQuery, gql } from '@apollo/client';

export const GET_DIRECTORS = gql`
  {
    allDirectors {
      director_uid
      director_name
      director_biography
      date_director_born
      date_director_deceased
      director_country_of_birth
      director_image
      movies {
        movie_uid
      }
    }
  }
`;

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

  const { loading, error, data } = useQuery(GET_DIRECTORS);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const filteredResults = directors.filter((director) => {
      return (
        director.director_name.toLowerCase().includes(searchValue) ||
        director.director_country_of_birth.toLowerCase().includes(searchValue)
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
    const directorsCopy = [...directors];
    switch (sortOption) {
      case `Name (A-Z)`:
        return directorsCopy.sort((a, b) =>
          a.director_name.localeCompare(b.director_name),
        );
      case `Date Born Ascending`:
        return directorsCopy.sort(
          (a, b) =>
            new Date(a.date_director_born).getTime() -
            new Date(b.date_director_born).getTime(),
        );
      case `Date Born Descending`:
        return directorsCopy.sort(
          (a, b) =>
            new Date(b.date_director_born).getTime() -
            new Date(a.date_director_born).getTime(),
        );
      case `Country (A-Z)`:
        return directorsCopy.sort((a, b) =>
          a.director_country_of_birth.localeCompare(
            b.director_country_of_birth,
          ),
        );
      case `Number of Films`:
        return directorsCopy.sort((a, b) => b.movies.length - a.movies.length);
      default:
        return directorsCopy;
    }
  };
  const handleRandomClick = () => {
    if (filteredDirectors.length > 0) {
      const newIndex = Math.floor(Math.random() * filteredDirectors.length);
      setRandomDirectorIndex(newIndex);
    }
  };

  useEffect(() => {
    if (!loading && !error && data) {
      const fetchedDirectors = data.allDirectors;
      const sortedFetchedDirectors = sortDirectors(
        fetchedDirectors,
        selectedSortOption,
      );
      setDirectors(sortedFetchedDirectors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error, data]);

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

  if (loading || error) {
    return <LoadingOrError loading={loading} error={error}></LoadingOrError>;
  }

  return (
    <div className="container text-text mb-4">
      <div className="flex flex-col gap-2">
        <TitleComponent
          text={`Directors I Love`}
          className="block md:hidden self-center mx-auto"
        />

        <div className="w-full flex items-center justify-between gap-1">
          <div className="flex items-center">
            <LinkComponent
              href={randomDirector}
              text="Random"
              onClick={handleRandomClick}
            />
            <ButtonWithDropdown
              label="Sort"
              isExpanded={isSortExpanded}
              onButtonClick={() => setSortExpanded(!isSortExpanded)}
              dropdown={dropdown}
              widthClass="w-full h-1/2 md:w-1/2 lg:w-2/3 xl:w-full"
              paddingClass=" w-full py-0.5 px-2 md:px-3 lg: py-2 lg:px-5 ml-5 md:ml-5 mr-0 md:mr-5  xl:mr-7"
            />
          </div>
          <TitleComponent
            text={`Directors I Love`}
            className="hidden md:block self-center mx-auto"
          />
          <SearchBarComponent
            searchValue={searchValue}
            onSubmit={handleSearchSubmit}
            onInputChange={handleSearchInputChange}
            onClear={handleClearSearch}
          />
        </div>
        <div className="grid grid-cols-2 gap-1 mt-1 md:grid-cols-4 lg:gap-2 lg:grid-cols-6 md:mt-2">
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
