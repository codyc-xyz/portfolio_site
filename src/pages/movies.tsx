import React, { useState, useEffect } from 'react';
import Header from '../components/general/Header';
import { MovieAttributes } from '../types/MovieAttributes';
import MovieCard from '../components/movie_page/MovieCard';
import axios from 'axios';

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<MovieAttributes[]>([]);
  const [isSortExpanded, setSortExpanded] = useState(false);
  const [isFilterExpanded, setFilterExpanded] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get<MovieAttributes[]>(
          `http://localhost:3001/movies`,
        );
        setMovies(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div className="container">
      <Header />

      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="w-1/4">
            <button
              className={`w-full py-2 px-4 rounded-lg bg-white shadow-sm transition-colors ${
                isSortExpanded
                  ? `bg-blue-500 text-white`
                  : `bg-gray-100 text-gray-800`
              } border border-gray-300 outline-none mb-2`}
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
              <div className="bg-gray-50 p-2 rounded">
                {/* Add sort options */}
                <button className="block w-full text-left hover:bg-gray-100">
                  Sort by Title
                </button>
                <button className="block w-full text-left hover:bg-gray-100">
                  Sort by Release Date
                </button>
              </div>
            )}
          </div>

          <div className="w-3/4">
            <button
              className={`w-full py-2 px-4 rounded-lg bg-white shadow-sm transition-colors ${
                isFilterExpanded
                  ? `bg-blue-500 text-white`
                  : `bg-gray-100 text-gray-800`
              } border border-gray-300 outline-none mb-2`}
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
              <div className="bg-gray-50 p-2 rounded">
                {/* Add filter options */}
                <button className="block w-full text-left hover:bg-gray-100">
                  Filter by Genre
                </button>
                <button className="block w-full text-left hover:bg-gray-100">
                  Filter by Rating
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="w-full flex items-center">
            <div className="w-1/4 flex">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded-lg px-4 py-2 mr-2 w-full"
              />
              <button type="submit" className="text-primary text-l">
                Go
              </button>
            </div>
            <h1 className="text-center text-3xl flex-grow flex-shrink-0 ml-auto mr-auto w-1/2">
              Movies I Love
            </h1>
            <div className="w-1/4 flex justify-end">
              <button className="text-xl bg-blue-500 hover:bg-blue-700 text-primary py-2 pr-0 rounded">
                Random
              </button>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4" style={{ marginTop: `16px` }}>
            {movies.map((movie) => (
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
