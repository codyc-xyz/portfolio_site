import React, { useState, useEffect } from 'react';
import Header from '../components/general/Header';
import { AuthorAttributes } from '../types/AuthorAttributes';
import AuthorCard from '../components/author_page/AuthorCard';
import axios from 'axios';

const Movies: React.FC = () => {
  const [authors, setAuthors] = useState<AuthorAttributes[]>([]);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const response = await axios.get<AuthorAttributes[]>(
          `http://localhost:3001/authors`,
        );
        setAuthors(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAuthors();
  }, []);
  return (
    <div className="container">
      <Header />
      <h1
        className="text-center text-3xl"
        style={{ marginTop: `24px`, marginBottom: `24px` }}
      >
        Authors I Find Interesting
      </h1>
      <div
        className="grid grid-cols-6 grid-rows-2 gap-4"
        style={{ marginTop: `16px` }}
      >
        {authors.map((author) => {
          return (
            <AuthorCard
              key={author.author_uid}
              authorPageUrl={`${author.author_uid}`}
              authorName={author.author_name}
              imageUrl={author.author_image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
