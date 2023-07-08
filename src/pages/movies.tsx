import React, { useState, useEffect } from 'react';
import { MovieAttributes } from '../types/MovieAttributes';
import { OptionType } from '../components/general/FilterSection';
import Card from '../components/general/Card';
import PageHeader from '../components/general/PageHeader';
import ButtonWithDropdown from '../components/general/ButtonWithDropdown';
import Dropdown from '../components/general/Dropdown';
import Filter from '../components/general/Filter';
import { useQuery, gql } from '@apollo/client';
import LoadingOrError from '../components/general/LoadingOrError';
import TitleComponent from '../components/general/TitleComponent';
import { sanitizeName } from '../../functions/sanitizeName';
import { useSessionStorage } from '../../functions/useSessionStorage';
import { useYScrollPositionSessionStorage } from '../../functions/useYScrollPositionSessionStorage';
import { Helmet } from 'react-helmet';

export const GET_MOVIES = gql`
  {
    allMovies {
      movie_uid
      movie_title
      movie_description
      length_in_minutes
      date_movie_released
      movie_genres
      movie_poster
      letterboxd_link
      screenshot_links
      country_of_origin
      content_warnings
      director_uid
      director {
        director_uid
        director_name
        director_biography
        date_director_born
        date_director_deceased
        director_country_of_birth
        director_image
      }
    }
  }
`;

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<MovieAttributes[]>([]);
  const [isSortExpanded, setSortExpanded] = useSessionStorage(
    `movieIsSortExpanded`,
    false,
  );
  const [isFilterExpanded, setFilterExpanded] = useSessionStorage(
    `movieIsFilterExpanded`,
    false,
  );
  const [isGenreExpanded, setGenreExpanded] = useSessionStorage(
    `movieIsGenreExpanded`,
    false,
  );
  const [isDecadeExpanded, setDecadeExpanded] = useSessionStorage(
    `movieIsDecadeExpanded`,
    false,
  );
  const [isRuntimeExpanded, setRuntimeExpanded] = useSessionStorage(
    `movieIsRuntimeExpanded`,
    false,
  );
  const [selectedGenres, setSelectedGenres] = useSessionStorage(
    `movieSelectedGenres`,
    [],
  );
  const [availableGenres, setAvailableGenres] = useSessionStorage(
    `movieAvailableGenres`,
    [],
  );
  const [selectedDecade, setSelectedDecade] = useSessionStorage(
    `movieSelectedDecade`,
    null,
  );
  const [availableDecades, setAvailableDecades] = useSessionStorage(
    `movieAvailableDecades`,
    [],
  );
  const [selectedLength, setSelectedLength] = useSessionStorage(
    `movieSelectedLength`,
    null,
  );
  const [availableLengths, setAvailableLengths] = useSessionStorage(
    `movieAvailableLengths`,
    [],
  );
  const [randomMovieIndex, setRandomMovieIndex] = useState(0);
  const [searchValue, setSearchValue] = useSessionStorage(
    `movieSearchValue`,
    ``,
  );
  const [filteredMovies, setFilteredMovies] = useState<MovieAttributes[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useSessionStorage(
    `movieSelectedSortOption`,
    `Title (A-Z)`,
  );
  const { loading, error, data } = useQuery(GET_MOVIES);
  useYScrollPositionSessionStorage();

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const filteredResults = movies.filter((movie) => {
      const movieYear = new Date(movie.date_movie_released).getFullYear();
      const movieDecade = Math.floor(movieYear / 10) * 10;
      return (
        (selectedGenres.length === 0 ||
          selectedGenres.every((genre) =>
            movie.movie_genres.includes(genre),
          )) &&
        (selectedDecade === null || movieDecade === selectedDecade) &&
        (selectedLength === null || checkMovieLength(movie, selectedLength)) &&
        (movie.movie_title.toLowerCase().includes(searchValue) ||
          movie.country_of_origin.toLowerCase().includes(searchValue) ||
          movie.director.director_name.toLowerCase().includes(searchValue))
      );
    });
    const sortedFilteredResults = sortMovies(
      filteredResults,
      selectedSortOption,
    );
    setFilteredMovies(sortedFilteredResults);
  };

  const handleClearSearch = () => {
    setSearchValue(``);
    const filteredResults = movies.filter((movie) => {
      const movieYear = new Date(movie.date_movie_released).getFullYear();
      const movieDecade = Math.floor(movieYear / 10) * 10;
      return (
        (selectedGenres.length === 0 ||
          selectedGenres.every((genre) =>
            movie.movie_genres.includes(genre),
          )) &&
        (selectedDecade === null || movieDecade === selectedDecade) &&
        (selectedLength === null || checkMovieLength(movie, selectedLength))
      );
    });
    const sortedFilteredResults = sortMovies(
      filteredResults,
      selectedSortOption,
    );
    setFilteredMovies(sortedFilteredResults);
  };

  const handleSortOptionClick = (option: string) => {
    setSortExpanded(!isSortExpanded);
    setSelectedSortOption(option);
  };

  const handleGenreClick = (genre: string) => {
    let updatedGenres: string[];

    if (selectedGenres.includes(genre)) {
      updatedGenres = selectedGenres.filter((g) => g !== genre);
      setFilteredMovies(
        movies.filter((movie) => {
          const movieYear = new Date(movie.date_movie_released).getFullYear();
          const movieDecade = Math.floor(movieYear / 10) * 10;

          return (
            (selectedDecade === null || movieDecade === selectedDecade) &&
            updatedGenres.every((genre) =>
              movie.movie_genres.includes(genre),
            ) &&
            (selectedLength === null ||
              checkMovieLength(movie, selectedLength)) &&
            (searchValue === `` ||
              movie.movie_title.toLowerCase().includes(searchValue) ||
              movie.country_of_origin.toLowerCase().includes(searchValue) ||
              movie.director.director_name.toLowerCase().includes(searchValue))
          );
        }),
      );
    } else {
      updatedGenres = [...selectedGenres, genre];
      setFilteredMovies(
        filteredMovies.filter((movie) =>
          updatedGenres.every((genre) => movie.movie_genres.includes(genre)),
        ),
      );
    }
    setSelectedGenres(updatedGenres);
  };

  const handleDecadeClick = (decade: number) => {
    if (selectedDecade === decade) {
      setSelectedDecade(null);

      setFilteredMovies(
        movies.filter((movie) => {
          return (
            selectedGenres.every((genre) =>
              movie.movie_genres.includes(genre),
            ) &&
            (selectedLength === null ||
              checkMovieLength(movie, selectedLength)) &&
            (searchValue === `` ||
              movie.movie_title.toLowerCase().includes(searchValue) ||
              movie.country_of_origin.toLowerCase().includes(searchValue) ||
              movie.director.director_name.toLowerCase().includes(searchValue))
          );
        }),
      );
    } else {
      setSelectedDecade(decade);

      setFilteredMovies(
        filteredMovies.filter((movie) => {
          const movieYear = new Date(movie.date_movie_released).getFullYear();
          const movieDecade = Math.floor(movieYear / 10) * 10;
          return movieDecade === decade;
        }),
      );
    }
  };

  const handleRuntimeClick = (length: string) => {
    if (selectedLength === length) {
      setSelectedLength(null);
      setFilteredMovies(
        movies.filter((movie) => {
          const movieYear = new Date(movie.date_movie_released).getFullYear();
          const movieDecade = Math.floor(movieYear / 10) * 10;

          return (
            (selectedDecade === null || movieDecade === selectedDecade) &&
            selectedGenres.every((genre) =>
              movie.movie_genres.includes(genre),
            ) &&
            (searchValue === `` ||
              movie.movie_title.toLowerCase().includes(searchValue) ||
              movie.country_of_origin.toLowerCase().includes(searchValue) ||
              movie.director.director_name.toLowerCase().includes(searchValue))
          );
        }),
      );
    } else {
      setFilteredMovies(
        filteredMovies.filter((movie) => {
          return checkMovieLength(movie, length);
        }),
      );
      setSelectedLength(length);
    }
  };

  const checkMovieLength = (movie: MovieAttributes, length: string) => {
    const movieLength = movie.length_in_minutes;

    if (length === `0-30`) {
      return movieLength <= 30;
    } else if (length === `31-60`) {
      return movieLength > 30 && movieLength <= 60;
    } else if (length === `61-90`) {
      return movieLength > 60 && movieLength <= 90;
    } else if (length === `91-120`) {
      return movieLength > 90 && movieLength <= 120;
    } else if (length === `121-180`) {
      return movieLength > 120 && movieLength <= 180;
    } else {
      return movieLength > 180;
    }
  };
  const handleFilterClear = () => {
    setFilteredMovies(
      movies.filter(
        (movie) =>
          movie.movie_title.toLowerCase().includes(searchValue) ||
          movie.country_of_origin.toLowerCase().includes(searchValue) ||
          movie.director.director_name.toLowerCase().includes(searchValue),
      ),
    );

    setSelectedGenres([]);
    setSelectedDecade(null);
    setSelectedLength(null);
  };

  const sortMovies = (movies: MovieAttributes[], sortOption: string) => {
    const moviesCopy = [...movies];
    switch (sortOption) {
      case `Title (A-Z)`:
        return moviesCopy.sort((a, b) =>
          a.movie_title.localeCompare(b.movie_title),
        );
      case `Release Date Ascending`:
        return moviesCopy.sort(
          (a, b) =>
            new Date(a.date_movie_released).getTime() -
            new Date(b.date_movie_released).getTime(),
        );
      case `Release Date Descending`:
        return moviesCopy.sort(
          (a, b) =>
            new Date(b.date_movie_released).getTime() -
            new Date(a.date_movie_released).getTime(),
        );
      case `Director (A-Z)`:
        return moviesCopy.sort((a, b) =>
          a.director.director_name.localeCompare(b.director.director_name),
        );
      case `Country (A-Z)`:
        return moviesCopy.sort((a, b) =>
          a.country_of_origin.localeCompare(b.country_of_origin),
        );
      case `Length Ascending`:
        return moviesCopy.sort(
          (a, b) => a.length_in_minutes - b.length_in_minutes,
        );
      case `Length Descending`:
        return moviesCopy.sort(
          (a, b) => b.length_in_minutes - a.length_in_minutes,
        );
      default:
        return moviesCopy;
    }
  };

  const countGenres = (movies: MovieAttributes[]) => {
    return movies.reduce((counts: Record<string, number>, movie) => {
      movie.movie_genres.forEach((genre) => {
        if (!counts[genre]) {
          counts[genre] = 0;
        }
        counts[genre]++;
      });
      return counts;
    }, {});
  };

  const calculateLengths = (movies: MovieAttributes[]) => {
    return movies.reduce((lengths: string[], movie) => {
      const currLength = movie.length_in_minutes;
      if (currLength <= 30 && !lengths.includes(`0-30`)) {
        lengths.push(`0-30`);
      } else if (
        currLength > 30 &&
        currLength <= 60 &&
        !lengths.includes(`31-60`)
      ) {
        lengths.push(`31-60`);
      } else if (
        currLength > 60 &&
        currLength <= 90 &&
        !lengths.includes(`61-90`)
      ) {
        lengths.push(`61-90`);
      } else if (
        currLength > 90 &&
        currLength <= 120 &&
        !lengths.includes(`91-120`)
      ) {
        lengths.push(`91-120`);
      } else if (
        currLength > 120 &&
        currLength <= 180 &&
        !lengths.includes(`121-180`)
      ) {
        lengths.push(`121-180`);
      } else if (currLength > 180 && !lengths.includes(`181+`)) {
        lengths.push(`181+`);
      }
      return lengths;
    }, []);
  };

  const handleRandomClick = () => {
    if (filteredMovies.length > 0) {
      const newIndex = Math.floor(Math.random() * filteredMovies.length);
      setRandomMovieIndex(newIndex);
    }
  };

  useEffect(() => {
    if (!loading && !error && data) {
      const fetchedMovies = data.allMovies;
      const sortedFetchedMovies = sortMovies(fetchedMovies, selectedSortOption);
      setMovies(sortedFetchedMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error, data]);

  useEffect(() => {
    const genreCounts = countGenres(filteredMovies);
    const uniqueGenres = Object.keys(genreCounts).sort((a, b) => {
      if (selectedGenres.includes(a) && !selectedGenres.includes(b)) {
        return -1;
      } else if (!selectedGenres.includes(a) && selectedGenres.includes(b)) {
        return 1;
      }
      return genreCounts[b] - genreCounts[a];
    });
    setAvailableGenres(uniqueGenres);
  }, [filteredMovies, selectedGenres]);

  useEffect(() => {
    const uniqueDecades = filteredMovies.reduce((decades: number[], movie) => {
      const movieYear = new Date(movie.date_movie_released).getFullYear();
      const movieDecade = Math.floor(movieYear / 10) * 10;
      if (!decades.includes(movieDecade)) {
        decades.push(movieDecade);
      }
      return decades;
    }, []);
    const decadeToNum = uniqueDecades.reduce((obj, decade) => {
      obj[decade] = decade;
      return obj;
    }, {});
    const sortedDecades = uniqueDecades.sort((a, b) => {
      return decadeToNum[a] - decadeToNum[b];
    });
    setAvailableDecades(sortedDecades);
  }, [filteredMovies]);

  useEffect(() => {
    const uniqueLengths = calculateLengths(filteredMovies);
    const lengthToNum: { [key: string]: number } = uniqueLengths.reduce(
      (obj, length) => {
        obj[length] = length === `181+` ? 181 : parseInt(length, 10);
        return obj;
      },
      {},
    );
    const sortedLengths = uniqueLengths.sort((a, b) => {
      return lengthToNum[a] - lengthToNum[b];
    });
    setAvailableLengths(sortedLengths);
  }, [filteredMovies]);

  useEffect(() => {
    if (filteredMovies.length > 0) {
      const newIndex = Math.floor(Math.random() * filteredMovies.length);
      setRandomMovieIndex(newIndex);
    }
  }, [filteredMovies]);

  useEffect(() => {
    let filteredResults = movies;

    if (
      selectedGenres.length > 0 ||
      selectedDecade ||
      selectedLength ||
      searchValue
    ) {
      filteredResults = movies.filter((movie) => {
        const movieDecade =
          Math.floor(new Date(movie.date_movie_released).getFullYear() / 10) *
          10;
        const movieLength = movie.length_in_minutes;
        return (
          (selectedGenres.length === 0 ||
            selectedGenres.every((genre) =>
              movie.movie_genres.includes(genre),
            )) &&
          (selectedDecade === null || movieDecade === selectedDecade) &&
          (selectedLength === null || movieLength === selectedLength) &&
          (searchValue === `` ||
            movie.movie_title.toLowerCase().includes(searchValue))
        );
      });
    }
    const sortedFilteredResults = sortMovies(
      filteredResults,
      selectedSortOption,
    );
    setFilteredMovies(sortedFilteredResults);
  }, [
    movies,
    selectedSortOption,
    selectedGenres,
    selectedDecade,
    selectedLength,
    searchValue,
  ]);
  const randomMovie = sanitizeName(
    filteredMovies[randomMovieIndex]?.movie_title,
  );
  const sortOptions = [
    `Title (A-Z)`,
    `Director (A-Z)`,
    `Country (A-Z)`,
    `Length Ascending`,
    `Length Descending`,
    `Release Date Ascending`,
    `Release Date Descending`,
  ];

  const filterSections = [
    {
      label: `Genre`,
      isExpanded: isGenreExpanded,
      onButtonClick: () => setGenreExpanded(!isGenreExpanded),
      options: availableGenres,
      selectedOption: selectedGenres,
      onOptionClickString: handleGenreClick,
    },
    {
      label: `Decade`,
      isExpanded: isDecadeExpanded,
      onButtonClick: () => setDecadeExpanded(!isDecadeExpanded),
      options: availableDecades,
      selectedOption: selectedDecade,
      onOptionClickNumber: handleDecadeClick,
      displayOption: (option: OptionType) => `${option}s`,
    },
    {
      label: `Length`,
      isExpanded: isRuntimeExpanded,
      onButtonClick: () => setRuntimeExpanded(!isRuntimeExpanded),
      options: availableLengths,
      selectedOption: selectedLength,
      onOptionClickString: handleRuntimeClick,
      displayOption: (option: OptionType) => `${option} minutes`,
    },
  ];

  const dropdown = (
    <Dropdown
      options={sortOptions}
      selectedOption={selectedSortOption}
      onOptionClick={handleSortOptionClick}
    />
  );

  if (loading || error) {
    return <LoadingOrError loading={loading} error={error}></LoadingOrError>;
  }

  return (
    <div className="container pb-4">
      <Helmet>
        <title>Movies | CodyC</title>
      </Helmet>

      <div className="flex flex-col gap-2">
        <TitleComponent
          text={`Movies I Love`}
          className="block text-xl md:hidden mx-auto"
        />

        <div className="flex gap-2 md:gap-3">
          <ButtonWithDropdown
            widthClass="w-1/3 md:w-1/4"
            paddingClass="w-full py-2 px-2"
            label="Sort"
            isExpanded={isSortExpanded}
            onButtonClick={() => setSortExpanded(!isSortExpanded)}
            dropdown={dropdown}
          />
          <Filter
            isFilterExpanded={isFilterExpanded}
            onFilterClick={() => setFilterExpanded(!isFilterExpanded)}
            filterSections={filterSections}
            onClear={handleFilterClear}
            filteredItemsLength={filteredMovies.length}
            itemsLength={movies.length}
          />
        </div>
        <div>
          <div>
            <PageHeader
              randomItem={randomMovie}
              searchValue={searchValue}
              onSubmit={handleSearchSubmit}
              onInputChange={handleSearchInputChange}
              onClear={handleClearSearch}
              titleText="Movies I Love"
              onClick={handleRandomClick}
              titleClassName="hidden md:block md:w-1/3 mx-auto"
            />
            <div className="grid grid-cols-2 gap-1 mt-1 md:grid-cols-4 lg:gap-2 lg:grid-cols-6 md:mt-2">
              {filteredMovies.map((movie) => (
                <Card
                  key={movie.movie_uid}
                  pageUrl={`/movies/${sanitizeName(movie.movie_title)}`}
                  altText={movie.movie_title}
                  title={movie.director.director_name}
                  imageUrl={movie.movie_poster}
                  secondaryText={movie.country_of_origin}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
