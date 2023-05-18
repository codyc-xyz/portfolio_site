/* eslint-disable camelcase */
import React from 'react';

interface MoviePageProps {
  data: {
    movie: {
      movie_title: string;
      movie_uid: string;
    };
  };
}

const MoviePage: React.FC<MoviePageProps> = ({ data }) => {
  const { movie_title } = data.movie;

  return (
    <div>
      <h1>{movie_title}</h1>
    </div>
  );
};

export default MoviePage;
