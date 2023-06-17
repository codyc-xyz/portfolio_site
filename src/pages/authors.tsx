import React, { useState, useEffect } from 'react';
import { AuthorAttributes } from '../types/AuthorAttributes';
import Card from '../components/general/Card';
import LinkComponent from '../components/general/LinkComponent';
import ButtonWithDropdown from '../components/general/ButtonWithDropdown';
import Dropdown from '../components/general/Dropdown';
import TitleComponent from '../components/general/TitleComponent';
import SearchBarComponent from '../components/general/SearchBarComponent';
import LoadingOrError from '../components/general/LoadingOrError';
import { useQuery, gql } from '@apollo/client';

export const GET_AUTHORS = gql`
  {
    allAuthors {
      author_uid
      author_name
      author_biography
      date_author_born
      date_author_deceased
      author_image
      country_of_birth
      books {
        book_uid
      }
    }
  }
`;

const Authors: React.FC = () => {
  const [authors, setAuthors] = useState<AuthorAttributes[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<AuthorAttributes[]>(
    [],
  );
  const [randomAuthorIndex, setRandomAuthorIndex] = useState(0);
  const [isSortExpanded, setSortExpanded] = useState(false);
  const [selectedSortOption, setSelectedSortOption] =
    useState<string>(`Name (A-Z)`);
  const [searchValue, setSearchValue] = useState<string>(``);

  const { loading, error, data } = useQuery(GET_AUTHORS);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const filteredResults = authors.filter((author) => {
      return (
        author.author_name.toLowerCase().includes(searchValue) ||
        author.country_of_birth.toLowerCase().includes(searchValue)
      );
    });
    const sortedFilteredResults = sortAuthors(
      filteredResults,
      selectedSortOption,
    );
    setFilteredAuthors(sortedFilteredResults);
  };

  const handleClearSearch = () => {
    setSearchValue(``);
    const sortedAuthors = sortAuthors(authors, selectedSortOption);
    setFilteredAuthors(sortedAuthors);
  };

  const handleSortOptionClick = (option: string) => {
    setSortExpanded(!isSortExpanded);
    setSelectedSortOption(option);
  };

  const handleRandomClick = () => {
    if (filteredAuthors.length > 0) {
      const newIndex = Math.floor(Math.random() * filteredAuthors.length);
      setRandomAuthorIndex(newIndex);
    }
  };

  const sortAuthors = (authors: AuthorAttributes[], sortOption: string) => {
    const authorsCopy = [...authors];
    switch (sortOption) {
      case `Name (A-Z)`:
        return authorsCopy.sort((a, b) =>
          a.author_name.localeCompare(b.author_name),
        );
      case `Date Born Ascending`:
        return authorsCopy.sort(
          (a, b) =>
            new Date(a.date_author_born).getTime() -
            new Date(b.date_author_born).getTime(),
        );
      case `Date Born Descending`:
        return authorsCopy.sort(
          (a, b) =>
            new Date(b.date_author_born).getTime() -
            new Date(a.date_author_born).getTime(),
        );
      case `Country (A-Z)`:
        return authorsCopy.sort((a, b) =>
          a.country_of_birth.localeCompare(b.country_of_birth),
        );
      case `Number of Books`:
        return authorsCopy.sort((a, b) => b.books.length - a.books.length);
      default:
        return authorsCopy;
    }
  };

  useEffect(() => {
    if (!loading && !error && data) {
      const fetchedAuthors = data.allAuthors;
      const sortedFetchedAuthors = sortAuthors(
        fetchedAuthors,
        selectedSortOption,
      );
      setAuthors(sortedFetchedAuthors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error, data]);

  useEffect(() => {
    if (authors.length > 0) {
      setFilteredAuthors(authors);
    }
  }, [authors]);

  useEffect(() => {
    if (filteredAuthors.length > 0) {
      const newIndex = Math.floor(Math.random() * filteredAuthors.length);
      setRandomAuthorIndex(newIndex);
    }
  }, [filteredAuthors]);

  useEffect(() => {
    if (filteredAuthors.length > 0) {
      const sortedAuthors = sortAuthors(
        [...filteredAuthors],
        selectedSortOption,
      );
      setFilteredAuthors(sortedAuthors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSortOption, authors]);

  const randomAuthor = filteredAuthors[randomAuthorIndex]?.author_uid;

  const sortOptions = [
    `Name (A-Z)`,
    `Country (A-Z)`,
    `Date Born Ascending`,
    `Date Born Descending`,
    `Number of Books`,
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
          text={`Authors I Find Interesting`}
          className="block lg:hidden self-center mx-auto"
        />

        <div className="w-full flex items-center justify-between gap-1">
          <div className="flex items-center">
            <LinkComponent
              href={randomAuthor}
              text="Random"
              onClick={handleRandomClick}
            />
            <ButtonWithDropdown
              label="Sort"
              isExpanded={isSortExpanded}
              onButtonClick={() => setSortExpanded(!isSortExpanded)}
              dropdown={dropdown}
              widthClass="w-full h-1/2"
              paddingClass="mx-5 w-full py-2 px-2"
            />
          </div>
          <TitleComponent
            text={`Authors I Find Interesting`}
            className="hidden lg:block mx-auto"
          />
          <SearchBarComponent
            searchValue={searchValue}
            onSubmit={handleSearchSubmit}
            onInputChange={handleSearchInputChange}
            onClear={handleClearSearch}
          />
        </div>
        <div className="grid grid-cols-2 gap-1 mt-1 md:grid-cols-4 lg:gap-2 lg:grid-cols-6 md:mt-2">
          {filteredAuthors.map((author) => {
            return (
              <Card
                key={author.author_uid}
                pageUrl={`${author.author_uid}`}
                altText={author.author_name}
                title={author.author_name}
                secondaryText={author.country_of_birth}
                imageUrl={author.author_image}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Authors;
