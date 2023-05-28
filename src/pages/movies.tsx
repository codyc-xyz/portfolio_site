import React, { useState, useEffect } from 'react';
import Header from '../components/general/Header';
import { MovieAttributes } from '../types/MovieAttributes';
import MovieCard from '../components/movie_page/MovieCard';
import axios from 'axios';

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<MovieAttributes[]>([]);
  const [isSortExpanded, setSortExpanded] = useState(false);
  const [isFilterExpanded, setFilterExpanded] = useState(false);
  const [isGenreExpanded, setGenreExpanded] = useState(false);
  const [isDecadeExpanded, setDecadeExpanded] = useState(false);
  const [isRuntimeExpanded, setRuntimeExpanded] = useState(false);
  const [isInitialMoviesSet, setIsInitialMoviesSet] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);
  const [selectedDecade, setSelectedDecade] = useState<number | null>(null);
  const [availableDecades, setAvailableDecades] = useState<number[]>([]);
  const [selectedLength, setSelectedLength] = useState<string | null>(null);
  const [availableLengths, setAvailableLengths] = useState<string[]>([]);

  const [filteredMovies, setFilteredMovies] = useState<MovieAttributes[]>([]);

  const [selectedSortOption, setSelectedSortOption] =
    useState<string>(`Title (A-Z)`);

  const handleSortOptionClick = (option: string) => {
    setSortExpanded(!isSortExpanded);
    setSelectedSortOption(option);
  };

  const handleGenreClick = (genre: string) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];

    setSelectedGenres(updatedGenres);
    setFilteredMovies(
      movies.filter((movie) => {
        const movieYear = new Date(movie.date_movie_released).getFullYear();
        const movieDecade = Math.floor(movieYear / 10) * 10;

        return (
          (selectedDecade === null || movieDecade === selectedDecade) &&
          updatedGenres.every((genre) => movie.movie_genres.includes(genre)) &&
          (selectedLength === null || checkMovieLength(movie, selectedLength))
        );
      }),
    );
  };

  const handleDecadeClick = (decade: number) => {
    if (selectedDecade === decade) {
      setSelectedDecade(null);

      setFilteredMovies(
        movies.filter(
          (movie) =>
            selectedGenres.every((genre) =>
              movie.movie_genres.includes(genre),
            ) &&
            (selectedLength === null ||
              checkMovieLength(movie, selectedLength)),
        ),
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
            (selectedDecade === null || movieDecade === selectedDecade) &&
            selectedGenres.every((genre) => movie.movie_genres.includes(genre))
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
    setFilteredMovies(movies);
    setSelectedGenres([]);
    setSelectedDecade(null);
    setSelectedLength(null);
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get<MovieAttributes[]>(
          `http://localhost:3001/movies`,
        );
        const sortedMovies = response.data;
        setMovies(sortedMovies);
      } catch (error) {
        console.error(error);
      }
    }
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
    }

    setFilteredMovies(sortedMovies);
  }, [selectedSortOption, filteredMovies]);
  useEffect(() => {
    if (!isInitialMoviesSet) {
      setFilteredMovies(movies);
      setIsInitialMoviesSet(true);
    } else if (filteredMovies.length === 0) {
      setIsInitialMoviesSet(false);
    }
  }, [movies, isInitialMoviesSet, filteredMovies]);

  useEffect(() => {
    const uniqueGenres = filteredMovies.reduce((genres: string[], movie) => {
      movie.movie_genres.forEach((genre) => {
        if (!genres.includes(genre)) {
          genres.push(genre);
        }
      });
      return genres;
    }, []);

    setAvailableGenres(uniqueGenres);
  }, [filteredMovies]);

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

  return (
    <div className="container text-text">
      <Header />

      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="w-1/4 relative">
            <button
              className={`w-full py-2 px-2 ${
                isSortExpanded ? `rounded-t-lg` : `rounded-lg`
              } bg-white shadow-sm border border-gray-300`}
              onClick={() => setSortExpanded(!isSortExpanded)}
            >
              Sort{` `}
              <svg
                className={`float-right inline-block transform ${
                  isSortExpanded ? `rotate-180` : ``
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
            {isSortExpanded && (
              <div className="bg-gray-50 p-2 rounded-b-lg border absolute z-10 w-full">
                <button
                  className={`block w-full text-left hover:bg-gray-100`}
                  onClick={() => handleSortOptionClick(`Title (A-Z)`)}
                >
                  Title (A-Z)
                  {selectedSortOption === `Title (A-Z)` && (
                    <svg
                      className="float-right inline-block"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 16.17L5.53 12.7a.996.996 0 0 1 1.41-1.41l2.83 2.83 6.36-6.36a.996.996 0 1 1 1.41 1.41L9 16.17z" />
                    </svg>
                  )}
                </button>
                <button
                  className={`block w-full text-left hover:bg-gray-100`}
                  onClick={() => handleSortOptionClick(`Director (A-Z)`)}
                >
                  Director (A-Z)
                  {selectedSortOption === `Director (A-Z)` && (
                    <svg
                      className="float-right inline-block"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 16.17L5.53 12.7a.996.996 0 0 1 1.41-1.41l2.83 2.83 6.36-6.36a.996.996 0 1 1 1.41 1.41L9 16.17z" />
                    </svg>
                  )}
                </button>
                <button
                  className={`block w-full text-left hover:bg-gray-100`}
                  onClick={() => handleSortOptionClick(`Country (A-Z)`)}
                >
                  Country (A-Z)
                  {selectedSortOption === `Country (A-Z)` && (
                    <svg
                      className="float-right inline-block"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 16.17L5.53 12.7a.996.996 0 0 1 1.41-1.41l2.83 2.83 6.36-6.36a.996.996 0 1 1 1.41 1.41L9 16.17z" />
                    </svg>
                  )}
                </button>
                <button
                  className={`block w-full text-left hover:bg-gray-100`}
                  onClick={() =>
                    handleSortOptionClick(`Release Date Ascending`)
                  }
                >
                  Release Date Ascending
                  {selectedSortOption === `Release Date Ascending` && (
                    <svg
                      className="float-right inline-block"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 16.17L5.53 12.7a.996.996 0 0 1 1.41-1.41l2.83 2.83 6.36-6.36a.996.996 0 1 1 1.41 1.41L9 16.17z" />
                    </svg>
                  )}
                </button>
                <button
                  className={`block w-full text-left hover:bg-gray-100`}
                  onClick={() =>
                    handleSortOptionClick(`Release Date Descending`)
                  }
                >
                  Release Date Descending
                  {selectedSortOption === `Release Date Descending` && (
                    <svg
                      className="float-right inline-block"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 16.17L5.53 12.7a.996.996 0 0 1 1.41-1.41l2.83 2.83 6.36-6.36a.996.996 0 1 1 1.41 1.41L9 16.17z" />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>
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
                <button
                  className="block w-full text-left hover:bg-gray-100 p-1"
                  onClick={() => setGenreExpanded(!isGenreExpanded)}
                >
                  Genre
                  <svg
                    className={`float-right inline-block transform ${
                      isGenreExpanded ? `rotate-180` : ``
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

                {isGenreExpanded && (
                  <div>
                    {availableGenres.map((genre: string) => (
                      <React.Fragment key={genre}>
                        <button
                          className={`px-1 py-1 rounded-md ${
                            selectedGenres.includes(genre)
                              ? `text-primary opacity-50`
                              : ` text-primary hover:opacity-50`
                          }`}
                          onClick={() => handleGenreClick(genre)}
                        >
                          {genre}
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                )}

                <button
                  className="block w-full text-left hover:bg-gray-100 p-1"
                  onClick={() => setDecadeExpanded(!isDecadeExpanded)}
                >
                  Decade
                  <svg
                    className={`float-right inline-block transform ${
                      isDecadeExpanded ? `rotate-180` : ``
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

                {isDecadeExpanded && (
                  <div>
                    {availableDecades.map((decade: number) => (
                      <React.Fragment key={decade}>
                        <button
                          className={`px-1 py-1 rounded-md ${
                            selectedDecade === decade
                              ? `text-primary opacity-50`
                              : ` text-primary hover:opacity-50`
                          }`}
                          onClick={() => handleDecadeClick(decade)}
                        >
                          {decade}s
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                )}
                <button
                  className="block w-full text-left hover:bg-gray-100 p-1"
                  onClick={() => setRuntimeExpanded(!isRuntimeExpanded)}
                >
                  Length
                  <svg
                    className={`float-right inline-block transform ${
                      isRuntimeExpanded ? `rotate-180` : ``
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
                {isRuntimeExpanded && (
                  <div>
                    {availableLengths.map((length: string) => (
                      <React.Fragment key={length}>
                        <button
                          className={`px-1 py-1 rounded-md ${
                            selectedLength === length
                              ? `text-primary opacity-50`
                              : ` text-primary hover:opacity-50`
                          }`}
                          onClick={() => handleRuntimeClick(length)}
                        >
                          {length} minutes
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                )}

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
          <div className="w-full flex items-center">
            <div className="w-1/4 flex text-center">
              <button className="text-xl hover:text-opacity-50 text-primary rounded">
                Random
              </button>
            </div>
            <h1 className="text-center text-3xl flex-grow flex-shrink-0 ml-auto mr-auto w-1/2">
              Movies I Love
            </h1>
            <div className="w-1/4 flex text-right justify-end">
              <form>
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-gray-300 rounded-lg px-4 py-2 mr-2 w-3/4 h-3/4 mt-1"
                />
                <button
                  type="submit"
                  className="text-primary text-l hover:text-opacity-50"
                >
                  Go
                </button>
              </form>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4" style={{ marginTop: `16px` }}>
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
  );
};

export default Movies;
