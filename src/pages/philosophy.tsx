import React, { useState, useEffect } from 'react';
import Header from '../components/general/Header';
import { BookAttributes } from '../types/BookAttributes';
import BookCard from '../components/book_page/BookCard';
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
      <div
        className="grid grid-cols-6 grid-rows-2 gap-4"
        style={{ marginTop: `16px` }}
      >
        {books.map((book) => {
          return (
            <BookCard
              key={book.book_uid}
              bookPageUrl={`${book.book_uid}`}
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
