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

      <div className="flex gap-4">
        <div className="w-1/6">
          <div className="mt-4">
            <button
              className={`w-full py-2 px-4 rounded bg-white shadow-lg ${
                isSortExpanded ? `bg-blue-500 text-white` : `bg-gray-100`
              } border border-gray-300 outline-none mb-2`}
              onClick={() => setSortExpanded(!isSortExpanded)}
            >
              Sort{` `}
              <span className={`float-right transform`}>
                {isSortExpanded ? `▼` : `►`}
              </span>
            </button>
            {isSortExpanded && (
              <div className="bg-gray-200 p-2">
                {/* Add sort options  */}
                <button className="block w-full text-left">
                  Sort by Title
                </button>
                <button className="block w-full text-left">
                  Sort by Release Date
                </button>
              </div>
            )}

            <button
              className={`w-full py-2 px-4 rounded bg-white shadow-lg ${
                isFilterExpanded ? `bg-blue-500 text-white` : `bg-gray-100`
              } border border-gray-300 outline-none mb-2`}
              onClick={() => setFilterExpanded(!isFilterExpanded)}
            >
              Filter{` `}
              <span className={`float-right transform`}>
                {isFilterExpanded ? `▼` : `►`}
              </span>
            </button>
            {isFilterExpanded && (
              <div className="bg-gray-200 p-2">
                {/* Add filter options */}
                <button className="block w-full text-left">
                  Filter by Genre
                </button>
                <button className="block w-full text-left">
                  Filter by Rating
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="w-3/4">
          <h1 className="text-center text-3xl mt-4 mb-4">Movies I Love</h1>
          <div className="grid grid-cols-5 gap-4" style={{ marginTop: `16px` }}>
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
