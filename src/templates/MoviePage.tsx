import React from 'react';

interface MoviePageProps {
  pageContext: {
    movieUid: string;
    movieTitle: string;
  };
}

const MoviePage: React.FC<MoviePageProps> = ({ pageContext }) => {
  const { movieTitle } = pageContext;

  return (
    <div>
      <h1>{movieTitle}</h1>
    </div>
  );
};

export default MoviePage;
