import Header from '../components/general/Header';
import { MovieAttributes } from '../types/MovieAttributes';
import React from 'react';

interface DirectorPageProps {
  pageContext: {
    directorName: string;
    directorBiography: string;
    directorBorn: string;
    directorDeceased: string;
    birthCountry: string;
    directorImage: string;
    movies: MovieAttributes[];
  };
}

const DirectorPage: React.FC<DirectorPageProps> = ({ pageContext }) => {
  const {
    directorName,
    directorBiography,
    directorBorn,
    directorDeceased,
    birthCountry,
    directorImage,
    movies,
  } = pageContext;

  return (
    <div className="container font-medium text-text">
      <Header />
      <div className="flex" style={{ marginTop: `24px` }}>
        <div className="w-2/3 pr-4">
          <h1 className="text-2xl">{directorName}</h1>
          <div className="mt-2">
            <p className="text-sm">
              <strong>Born:</strong> {directorBorn}
            </p>
            directorDeceased &&{` `}
            {
              <p className="text-sm">
                <strong>Deceased:</strong> {directorDeceased}
              </p>
            }
            <p className="text-sm">
              <strong>By:</strong> {directorName}
            </p>
            <p className="text-sm">
              <strong>From:</strong> {birthCountry}
            </p>
          </div>
          <h2 className="text-xl mt-4">About</h2>
          <p className="text-sm mt-2">{directorBiography}</p>
        </div>
        <div className="w-1/3 pl-4">
          <img src={directorImage} alt="Director Image" className="w-full" />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl">Movies</h2>
        <div
          className="grid grid-cols-2 gap-4 mt-4"
          style={{ marginBottom: `24px` }}
        >
          {movies.map((movie) => (
            <a key={movie.movie_uid} href={`movies/${movie.movie_uid}`}>
              <img
                src={movie.movie_poster}
                alt={`Movie ${movie.movie_uid}`}
                className="w-full h-full"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DirectorPage;
