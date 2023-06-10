import React, { useState, useEffect } from 'react';
import Header from '../components/general/Header';
import { DirectorAttributes } from '../types/DirectorAttributes';
import { AuthorAttributes } from '../types/AuthorAttributes';
import { BookAttributes } from '../types/BookAttributes';
import { MovieAttributes } from '../types/MovieAttributes';
import Scrollbar from '../components/general/Scrollbar';
import { GET_AUTHORS } from './authors';
import { GET_BOOKS } from './books';
import { GET_MOVIES } from './movies';
import { GET_DIRECTORS } from './directors';
import { useQuery } from '@apollo/client';

const FrontPage: React.FC = () => {
  const [directors, setDirectors] = useState<DirectorAttributes[]>([]);
  const [authors, setAuthors] = useState<AuthorAttributes[]>([]);
  const [books, setBooks] = useState<BookAttributes[]>([]);
  const [movies, setMovies] = useState<MovieAttributes[]>([]);

  const {
    loading: booksLoading,
    error: booksError,
    data: booksData,
  } = useQuery(GET_BOOKS);
  const {
    loading: directorsLoading,
    error: directorsError,
    data: directorsData,
  } = useQuery(GET_DIRECTORS);
  const {
    loading: authorsLoading,
    error: authorsError,
    data: authorsData,
  } = useQuery(GET_AUTHORS);
  const {
    loading: moviesLoading,
    error: moviesError,
    data: moviesData,
  } = useQuery(GET_MOVIES);

  const shuffleArray = (inputArray: any[]): any[] => {
    const array = [...inputArray];
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  useEffect(() => {
    if (!authorsLoading && !authorsError && authorsData) {
      const fetchedAuthors = authorsData.allAuthors;
      const shuffledFetchedAuthors = shuffleArray(fetchedAuthors);
      setAuthors(shuffledFetchedAuthors);
    }
  }, [authorsLoading, authorsError, authorsData]);

  useEffect(() => {
    if (!moviesLoading && !moviesError && moviesData) {
      const fetchedMovies = moviesData.allMovies;
      const shuffledFetchedMovies = shuffleArray(fetchedMovies);
      setMovies(shuffledFetchedMovies);
    }
  }, [moviesLoading, moviesError, moviesData]);

  useEffect(() => {
    if (!directorsLoading && !directorsError && directorsData) {
      const fetchedDirectors = directorsData.allDirectors;
      const shuffledFetchedDirectors = shuffleArray(fetchedDirectors);
      setDirectors(shuffledFetchedDirectors);
    }
  }, [directorsLoading, directorsError, directorsData]);

  useEffect(() => {
    if (!booksLoading && !booksError && booksData) {
      const fetchedBooks = booksData.allBooks;
      const shuffledFetchedBooks = shuffleArray(fetchedBooks);
      setBooks(shuffledFetchedBooks);
    }
  }, [booksLoading, booksError, booksData]);

  return (
    <div className="container text-text flex flex-col h-screen">
      <Header />
      <h1 className="text-center text-3xl flex-grow flex-shrink-0 mx-auto w-1/2">
        At a Glance
      </h1>

      <Scrollbar title="Movies I Love" data={movies} />
      <Scrollbar title="Directors I Love" data={directors} />
      <Scrollbar title="Books I Find Interesting" data={books} />
      <Scrollbar title="Authors I Find Interesting" data={authors} />
    </div>
  );
};

export default FrontPage;
