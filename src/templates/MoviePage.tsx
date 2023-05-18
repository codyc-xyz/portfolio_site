import React from 'react';

interface MoviePageProps {
  pageContext: {
    movieUid: string;
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
    directorUid: string;
  };
}

const MoviePage: React.FC<MoviePageProps> = ({ pageContext }) => {
  const {
    movieUid,
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
    directorUid,
  } = pageContext;
  return (
    <div>
      <h1>{movieTitle}</h1>
      <div>{movieUid}</div>
      <div>{movieDescription}</div>
      <div>{lengthInMinutes}</div>
      <div>{dateMovieReleased}</div>
      <div>{movieGenres}</div>
      <div>{moviePoster}</div>
      <div>{letterboxdLink}</div>
      <div>{screenshotLinks}</div>
      <div>{countryOfOrigin}</div>
      <div>{contentWarnings}</div>
      <div>{directorUid}</div>
    </div>
  );
};

export default MoviePage;
