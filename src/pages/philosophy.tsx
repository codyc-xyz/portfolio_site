import React, { useState, useEffect } from 'react';
import Header from '../components/general/Header';
import { BookAttributes } from '../types/BookAttributes';
import Card from '../components/general/Card';
import axios from 'axios';

const Books: React.FC = () => {
  const [books, setBooks] = useState<BookAttributes[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get<BookAttributes[]>(
          `http://localhost:3001/books`,
        );
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBooks();
  }, []);
  return (
    <div className="container">
      <Header />
      <h1
        className="text-center text-3xl"
        style={{ marginTop: `24px`, marginBottom: `24px` }}
      >
        Books I Find Interesting
      </h1>
      <div className="grid grid-cols-6 grid-rows-2 gap-4 mt-2">
        {books.map((book) => {
          return (
            <Card
              key={book.book_uid}
              pageUrl={`/philosophy/${book.book_uid}`}
              altText={book.book_title}
              title={book.book_title}
              imageUrl={book.book_cover_image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Books;
