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
          updatedGenres.every((genre) => movie.movie_genres.includes(genre))
        );
      }),
    );
  };

  const handleDecadeClick = (decade: number) => {
    if (selectedDecade === decade) {
      setFilteredMovies(
        movies.filter((movie) =>
          selectedGenres.every((genre) => movie.movie_genres.includes(genre)),
        ),
      );
      setSelectedDecade(null);
    } else {
      setFilteredMovies(
        movies.filter((movie) => {
          const movieYear = new Date(movie.date_movie_released).getFullYear();
          const movieDecade = Math.floor(movieYear / 10) * 10;
          return movieDecade === decade;
        }),
      );
      setSelectedDecade(decade);
    }
  };

  const handleFilterClear = () => {
    setFilteredMovies(movies);
    setSelectedGenres([]);
    setSelectedDecade(null);
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
    } else if (selectedSortOption === `Title (Z-A)`) {
      sortedMovies.sort((a, b) => b.movie_title.localeCompare(a.movie_title));
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
    } else if (selectedSortOption === `Director (Z-A)`) {
      sortedMovies.sort((a, b) =>
        b.director.director_name.localeCompare(a.director.director_name),
      );
    } else if (selectedSortOption === `Country (A-Z)`) {
      sortedMovies.sort((a, b) =>
        a.country_of_origin.localeCompare(b.country_of_origin),
      );
    } else if (selectedSortOption === `Country (Z-A)`) {
      sortedMovies.sort((a, b) =>
        b.country_of_origin.localeCompare(a.country_of_origin),
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
                  onClick={() => handleSortOptionClick(`Title (Z-A)`)}
                >
                  Title (Z-A)
                  {selectedSortOption === `Title (Z-A)` && (
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
                  onClick={() => handleSortOptionClick(`Director (Z-A)`)}
                >
                  Director (Z-A)
                  {selectedSortOption === `Director (Z-A)` && (
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
                  onClick={() => handleSortOptionClick(`Country (Z-A)`)}
                >
                  Country (Z-A)
                  {selectedSortOption === `Country (Z-A)` && (
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
                  className="block w-full text-left hover:bg-gray-100"
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
                  className="block w-full text-left hover:bg-gray-100"
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
                  className="block w-full text-left hover:bg-gray-100"
                  onClick={() => setRuntimeExpanded(!isRuntimeExpanded)}
                >
                  Runtime
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
                <button
                  className="m-1 mb-0 float-right text-primary hover:opacity-50"
                  onClick={() => handleFilterClear()}
                >
                  Clear
                </button>
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
