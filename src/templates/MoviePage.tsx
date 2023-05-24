import Header from '../components/general/Header';
import React, { useState } from 'react';

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
    directorUid,
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
    <div className="container font-medium text-text">
      <Header />
      <div className="flex" style={{ marginTop: `24px` }}>
        <div className="w-2/3 pr-4">
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
              <a
                href={`/directors/${directorUid}`}
                target="_blank"
                rel="noreferrer"
              >
                {directorName}
              </a>
            </p>
            <p className="text-sm">
              <strong>From:</strong> {countryOfOrigin}
            </p>
            <p className="text-sm">
              <strong>Genres:</strong> {movieGenres.join(`, `)}
            </p>
            <p className="text-sm">
              <strong>Letterboxd:</strong>
              <a
                href={letterboxdLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {letterboxdLink}
              </a>
            </p>
          </div>
          <h2 className="text-xl mt-4">About</h2>
          <p className="text-sm mt-2">{movieDescription}</p>
          {contentWarnings && (
            <div className="mt-4">
              <button
                className="text-sm underline text-blue-500"
                onClick={toggleContentWarnings}
              >
                {showContentWarnings
                  ? `Hide Content Warnings`
                  : `Show Content Warnings`}
              </button>
              {showContentWarnings && (
                <ul className="list-disc list-inside mt-2">
                  {contentWarnings.map((warning, index) => (
                    <li key={index} className="text-sm">
                      {warning}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className="w-1/3 pl-4 flex justify-end">
          <img src={moviePoster} alt="Movie Poster" className="w-full" />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl">Screenshots</h2>
        <div
          className="grid grid-cols-2 gap-4 mt-4"
          style={{ marginBottom: `24px` }}
        >
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
