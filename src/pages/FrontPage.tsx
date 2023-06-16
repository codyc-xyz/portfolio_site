import React, { useState, useEffect } from 'react';
import { DirectorAttributes } from '../types/DirectorAttributes';
import { AuthorAttributes } from '../types/AuthorAttributes';
import { BookAttributes } from '../types/BookAttributes';
import { MovieAttributes } from '../types/MovieAttributes';
import Scrollbar from '../components/general/Scrollbar';
import ProjectScrollbar from '../components/general/ProjectScrollbar';
import { GET_AUTHORS } from './authors';
import { GET_BOOKS } from './books';
import { GET_MOVIES } from './movies';
import { GET_DIRECTORS } from './directors';
import { GET_PROJECTS } from './projects';
import { useQuery } from '@apollo/client';
import { ProjectAttributes } from '../types/ProjectAttributes';

const FrontPage: React.FC = () => {
  const [directors, setDirectors] = useState<DirectorAttributes[]>([]);
  const [authors, setAuthors] = useState<AuthorAttributes[]>([]);
  const [books, setBooks] = useState<BookAttributes[]>([]);
  const [movies, setMovies] = useState<MovieAttributes[]>([]);
  const [projects, setProjects] = useState<ProjectAttributes[]>([]);

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
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_PROJECTS);

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

  useEffect(() => {
    if (!projectsLoading && !projectsError && projectsData) {
      const fetchedProjects = projectsData.allProjects;
      const shuffledFetchedProjects = shuffleArray(fetchedProjects);
      setProjects(shuffledFetchedProjects);
    }
  }, [projectsLoading, projectsError, projectsData]);

  return (
    <div className="container text-text flex flex-col mb-4">
      <h1 className="text-center text-lg md:text-xl lg:text-2xl flex-grow flex-shrink-0 mx-auto w-1/2">
        At a Glance
      </h1>

      <Scrollbar title="Movies I Love" data={movies} />
      <Scrollbar title="Directors I Love" data={directors} />
      <Scrollbar title="Books I Find Interesting" data={books} />
      <Scrollbar title="Authors I Find Interesting" data={authors} />
      <ProjectScrollbar title="Personal Projects" data={projects} />
    </div>
  );
};

export default FrontPage;
