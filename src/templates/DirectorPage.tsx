import Card from '../components/general/Card';
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
    <div className="container font-medium text-text mb-4">
      <div className="flex flex-col lg:flex-row mt-4">
        <div className="w-full lg:w-3/5 xl:w-2/3 pr-2 lg:pr-4 ">
          <h1 className="text-2xl">{directorName}</h1>
          <div className="mt-2">
            <p className="text-sm">
              <strong>Born:</strong> {directorBorn}
            </p>
            {directorDeceased && (
              <p className="text-sm">
                <strong>Deceased:</strong> {directorDeceased}
              </p>
            )}
            <p className="text-sm">
              <strong>From:</strong> {birthCountry}
            </p>
          </div>
          <div className="lg:hidden w-1/2 mt-2">
            <img src={directorImage} alt="Director Image" className="w-full" />
          </div>

          <div>
            <h2 className="text-xl my-4">About</h2>
            <p className="text-sm my-2">{directorBiography}</p>
          </div>
        </div>
        <div className="hidden lg:block w-full lg:w-2/5 xl:w-1/3 pl-4">
          <img src={directorImage} alt="Director Image" className="w-full" />
        </div>
      </div>
      <div className="my-2">
        <h2 className="text-xl">My Favorite Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {movies.map((movie) => (
            <Card
              key={movie.movie_uid}
              imageUrl={movie.movie_poster}
              altText={`Movie ${movie.movie_title}`}
              pageUrl={`/movies/${movie.movie_uid}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DirectorPage;
