import React, { useState } from 'react';
import { Link } from 'gatsby';
import { sanitizeName } from '../../functions/sanitizeName';

interface MoviePageProps {
  pageContext: {
    directorUid: string;
    movieTitle: string;
    movieDescription: string;
    lengthInMinutes: number;
    dateMovieReleased: string;
    movieGenres: string[];
    moviePoster: string;
    letterboxdLink: string;
    screenshotLinks: string[];
    countryOfOrigin: string;
    contentWarnings: string[];
    directorName: string;
  };
}

const MoviePage: React.FC<MoviePageProps> = ({ pageContext }) => {
  const {
    movieTitle,
    movieDescription,
    lengthInMinutes,
    dateMovieReleased,
    movieGenres,
    moviePoster,
    letterboxdLink,
    screenshotLinks,
    countryOfOrigin,
    contentWarnings,
    directorName,
  } = pageContext;

  const [showContentWarnings, setShowContentWarnings] = useState(false);

  const toggleContentWarnings = () => {
    setShowContentWarnings(!showContentWarnings);
  };
  return (
    <div className="container font-medium text-text mb-4">
      <div className="flex flex-col lg:flex-row mt-4">
        <div className="w-full lg:w-3/5 xl:w-2/3 pr-2 lg:pr-4 ">
          <h1 className="text-2xl">{movieTitle}</h1>
          <div className="mt-2">
            <p className="text-sm">
              <strong>Length:</strong> {lengthInMinutes} minutes
            </p>
            <p className="text-sm">
              <strong>Released:</strong> {dateMovieReleased}
            </p>
            <p className="text-sm">
              <strong>By: </strong>
              <Link
                to={`/directors/${sanitizeName(directorName)}`}
                className="hover:opacity-50"
              >
                {directorName}
              </Link>
            </p>
            <p className="text-sm">
              <strong>From:</strong> {countryOfOrigin}
            </p>
            <p className="text-sm">
              <strong>Genres:</strong> {movieGenres.join(`, `)}
            </p>
            <p className="text-sm">
              <a
                href={letterboxdLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-50"
              >
                Letterboxd
              </a>
            </p>
            <div className="lg:hidden w-1/2 mt-2">
              <img src={moviePoster} alt="Movie Poster" className="w-full" />
            </div>
          </div>
          <h2 className="text-xl mt-4">About</h2>
          <p className="text-sm my-4">{movieDescription}</p>
          {contentWarnings && (
            <div className="mb-2">
              <button
                className="text-sm underline text-text"
                onClick={toggleContentWarnings}
              >
                {showContentWarnings
                  ? `Hide Content Warnings`
                  : `Show Content Warnings`}
              </button>
              {showContentWarnings && (
                <ul className="list-disc list-inside mt-2 flex flex-wrap">
                  {contentWarnings.map((warning, index) => (
                    <li key={index} className="text-sm mr-4">
                      {warning}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className="hidden lg:block w-full lg:w-2/5 xl:w-1/3 pl-0 lg:pl-4">
          <img src={moviePoster} alt="Movie Poster" className="w-full" />
        </div>
      </div>
      <div className="mt-2">
        <h2 className="text-xl">Screenshots</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
          {screenshotLinks.map((screenshot, index) => (
            <img
              key={index}
              src={screenshot}
              alt={`Screenshot ${index + 1}`}
              className="w-full h-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
