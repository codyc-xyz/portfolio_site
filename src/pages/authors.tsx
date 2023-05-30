import React, { useState, useEffect } from 'react';
import Header from '../components/general/Header';
import { AuthorAttributes } from '../types/AuthorAttributes';
import Card from '../components/general/Card';
import axios from 'axios';

const Authors: React.FC = () => {
  const [authors, setAuthors] = useState<AuthorAttributes[]>([]);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const response = await axios.get<AuthorAttributes[]>(
          `http://localhost:3001/authors`,
        );
        console.log(response.data);
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
      <div className="grid grid-cols-4 grid-rows-2 gap-4 mt-2">
        {authors.map((author) => {
          return (
            <Card
              key={author.author_uid}
              pageUrl={`${author.author_uid}`}
              altText={author.author_name}
              title={author.author_name}
              imageUrl={author.author_image}
              imageHeight="350px"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Authors;
