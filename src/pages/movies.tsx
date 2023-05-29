import React, { useState, useEffect } from 'react';
import Header from '../components/general/Header';
import { MovieAttributes } from '../types/MovieAttributes';
import MovieCard from '../components/movie_page/MovieCard';
import PageHeader from '../components/general/PageHeader';
import ButtonWithDropdown from '../components/general/ButtonWithDropdown';
import Dropdown from '../components/general/Dropdown';
import FilterSection from '../components/general/FilterSection';
import axios from 'axios';

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<MovieAttributes[]>([]);
  const [isSortExpanded, setSortExpanded] = useState(false);
  const [isFilterExpanded, setFilterExpanded] = useState(false);
  const [isGenreExpanded, setGenreExpanded] = useState(false);
  const [isDecadeExpanded, setDecadeExpanded] = useState(false);
  const [isRuntimeExpanded, setRuntimeExpanded] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);
  const [selectedDecade, setSelectedDecade] = useState<number | null>(null);
  const [availableDecades, setAvailableDecades] = useState<number[]>([]);
  const [selectedLength, setSelectedLength] = useState<string | null>(null);
  const [availableLengths, setAvailableLengths] = useState<string[]>([]);
  const [randomMovieIndex, setRandomMovieIndex] = useState(0);
  const [searchValue, setSearchValue] = useState<string>(``);
  const [filteredMovies, setFilteredMovies] = useState<MovieAttributes[]>([]);
  const [selectedSortOption, setSelectedSortOption] =
    useState<string>(`Title (A-Z)`);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(event.target.value);
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
        (movie.movie_title.includes(searchValue) ||
          movie.country_of_origin.includes(searchValue) ||
          movie.director.director_name.includes(searchValue))
      );
    });
    setFilteredMovies(filteredResults);
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
    setFilteredMovies(filteredResults);
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
              movie.movie_title.includes(searchValue) ||
              movie.country_of_origin.includes(searchValue) ||
              movie.director.director_name.includes(searchValue))
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
              movie.movie_title.includes(searchValue) ||
              movie.country_of_origin.includes(searchValue) ||
              movie.director.director_name.includes(searchValue))
          );
        }),
      );
    } else {
      setSelectedDecade(decade);

      setFilteredMovies(
        filteredMovies.filter((movie) => {
          const movieYear = new Date(movie.date_movie_released).getFullYear();
          const movieDecade = Math.floor(movieYear / 10) * 10;
          return (
            movieDecade === decade &&
            selectedGenres.every((genre) =>
              movie.movie_genres.includes(genre),
            ) &&
            (selectedLength === null || checkMovieLength(movie, selectedLength))
          );
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
            ((selectedDecade === null || movieDecade === selectedDecade) &&
              selectedGenres.every((genre) =>
                movie.movie_genres.includes(genre),
              ) &&
              searchValue === ``) ||
            movie.movie_title.includes(searchValue) ||
            movie.country_of_origin.includes(searchValue) ||
            movie.director.director_name.includes(searchValue)
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
          movie.movie_title.includes(searchValue) ||
          movie.country_of_origin.includes(searchValue) ||
          movie.director.director_name.includes(searchValue),
      ),
    );

    setSelectedGenres([]);
    setSelectedDecade(null);
    setSelectedLength(null);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get<MovieAttributes[]>(
          `http://localhost:3001/movies`,
        );
        const fetchedMovies = response.data;
        const sortedFetchedMovies = fetchedMovies.sort((a, b) =>
          a.movie_title.localeCompare(b.movie_title),
        );

        setMovies(sortedFetchedMovies);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const sortedMovies = [...filteredMovies];

    if (selectedSortOption === `Title (A-Z)`) {
      sortedMovies.sort((a, b) => a.movie_title.localeCompare(b.movie_title));
    } else if (selectedSortOption === `Release Date Ascending`) {
      sortedMovies.sort(
        (a, b) =>
          new Date(a.date_movie_released).getTime() -
          new Date(b.date_movie_released).getTime(),
      );
    } else if (selectedSortOption === `Release Date Descending`) {
      sortedMovies.sort(
        (a, b) =>
          new Date(b.date_movie_released).getTime() -
          new Date(a.date_movie_released).getTime(),
      );
    } else if (selectedSortOption === `Director (A-Z)`) {
      sortedMovies.sort((a, b) =>
        a.director.director_name.localeCompare(b.director.director_name),
      );
    } else if (selectedSortOption === `Country (A-Z)`) {
      sortedMovies.sort((a, b) =>
        a.country_of_origin.localeCompare(b.country_of_origin),
      );
    } else if (selectedSortOption === `Length Ascending`) {
      sortedMovies.sort((a, b) => a.length_in_minutes - b.length_in_minutes);
    } else if (selectedSortOption === `Length Descending`) {
      sortedMovies.sort((a, b) => b.length_in_minutes - a.length_in_minutes);
    }

    setFilteredMovies(sortedMovies);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSortOption, selectedDecade, selectedGenres, selectedLength]);

  useEffect(() => {
    if (movies.length > 0) {
      setFilteredMovies(movies);
    }
  }, [movies]);

  useEffect(() => {
    const genreCounts: { [key: string]: number } = filteredMovies.reduce(
      (counts: { [key: string]: number }, movie: MovieAttributes) => {
        movie.movie_genres.forEach((genre: string) => {
          if (!counts[genre]) {
            counts[genre] = 0;
          }
          counts[genre]++;
        });
        return counts;
      },
      {},
    );

    const uniqueGenres: string[] = Object.keys(genreCounts).sort(
      (a: string, b: string) => {
        if (selectedGenres.includes(a) && !selectedGenres.includes(b)) {
          return -1;
        } else if (!selectedGenres.includes(a) && selectedGenres.includes(b)) {
          return 1;
        }
        return genreCounts[b] - genreCounts[a];
      },
    );

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
    const sortedDecades = uniqueDecades.sort((a, b) => a - b);
    setAvailableDecades(sortedDecades);
  }, [filteredMovies]);

  useEffect(() => {
    const uniqueLengths = filteredMovies.reduce((lengths: string[], movie) => {
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
    const sortedLengths = uniqueLengths.sort((a, b) => {
      if (a === `181+`) {
        return 1;
      } else if (b === `181+`) {
        return -1;
      } else {
        const aNum = parseInt(a, 10);
        const bNum = parseInt(b, 10);

        if (aNum < bNum) {
          return -1;
        } else if (aNum > bNum) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    setAvailableLengths(sortedLengths);
  }, [filteredMovies]);

  useEffect(() => {
    if (filteredMovies.length > 0) {
      const newIndex = Math.floor(Math.random() * filteredMovies.length);
      setRandomMovieIndex(newIndex);
    }
  }, [filteredMovies]);

  const randomMovie = filteredMovies[randomMovieIndex]?.movie_uid;
  const sortOptions = [
    `Title (A-Z)`,
    `Director (A-Z)`,
    `Country (A-Z)`,
    `Length Ascending`,
    `Length Descending`,
    `Release Date Ascending`,
    `Release Date Descending`,
  ];

  return (
    <div className="container text-text">
      <Header />

      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <ButtonWithDropdown
            label="Sort"
            isExpanded={isSortExpanded}
            onButtonClick={() => setSortExpanded(!isSortExpanded)}
            dropdown={
              <Dropdown
                options={sortOptions}
                selectedOption={selectedSortOption}
                onOptionClick={handleSortOptionClick}
              />
            }
          />
          <div className="w-3/4 relative">
            <button
              className={`w-full ${
                isFilterExpanded ? `rounded-t-lg` : `rounded-lg`
              } bg-white shadow-sm border border-gray-300 p-2`}
              onClick={() => setFilterExpanded(!isFilterExpanded)}
            >
              Filter{` `}
              <svg
                className={`float-right inline-block transform ${
                  isFilterExpanded ? `rotate-180` : ``
                }`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 12 12"
                fill="currentColor"
              >
                <path d="M3.672 4h4.656L6 7.58z" />
              </svg>
            </button>
            {isFilterExpanded && (
              <div className="bg-gray-50 p-2 rounded-b-lg border absolute z-10 w-full $">
                <FilterSection
                  label="Genre"
                  isExpanded={isGenreExpanded}
                  onButtonClick={() => setGenreExpanded(!isGenreExpanded)}
                  options={availableGenres}
                  selectedOption={selectedGenres}
                  onOptionClickString={handleGenreClick}
                />
                <FilterSection
                  label="Decade"
                  isExpanded={isDecadeExpanded}
                  onButtonClick={() => setDecadeExpanded(!isDecadeExpanded)}
                  options={availableDecades}
                  selectedOption={selectedDecade}
                  onOptionClickNumber={handleDecadeClick}
                  displayOption={(option) => `${option}s`}
                />
                <FilterSection
                  label="Length"
                  isExpanded={isRuntimeExpanded}
                  onButtonClick={() => setRuntimeExpanded(!isRuntimeExpanded)}
                  options={availableLengths}
                  selectedOption={selectedLength}
                  onOptionClickString={handleRuntimeClick}
                  displayOption={(option) => `${option} minutes`}
                />
                <button
                  className="m-1 mb-0 float-right text-primary hover:opacity-50"
                  onClick={() => handleFilterClear()}
                >
                  Clear
                </button>
                <p className="float-left mt-3 ml-1 text-xs">
                  {filteredMovies.length} / {movies.length}
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <div>
            <PageHeader
              randomItem={randomMovie}
              searchValue={searchValue}
              onSubmit={handleSearchSubmit}
              onInputChange={handleSearchInputChange}
              onClear={handleClearSearch}
            />
            <div
              className="grid grid-cols-6 gap-4"
              style={{ marginTop: `16px` }}
            >
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.movie_uid}
                  moviePageUrl={`${movie.movie_uid}`}
                  directorName={movie.director.director_name}
                  title={movie.movie_title}
                  imageUrl={movie.movie_poster}
                  originCountry={movie.country_of_origin}
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
