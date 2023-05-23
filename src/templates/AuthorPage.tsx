import Header from '../components/general/Header';
import { BookAttributes } from '../types/BookAttributes';
import React from 'react';

interface AuthorPageProps {
  pageContext: {
    authorUid: string;
    authorName: string;
    authorBiography: string;
    dateBorn: string;
    dateDeceased: string;
    authorImage: string;
    books: BookAttributes[];
  };
}

const AuthorPage: React.FC<AuthorPageProps> = ({ pageContext }) => {
  const {
    authorName,
    authorBiography,
    dateBorn,
    dateDeceased,
    authorImage,
    books,
  } = pageContext;
  return (
    <div className="container font-medium text-text">
      <Header />
      <div className="flex" style={{ marginTop: `24px` }}>
        <div className="w-2/3 pr-4">
          <h1 className="text-2xl">{authorName}</h1>
          <div className="mt-2">
            <p className="text-sm">
              <strong>Born:</strong> {dateBorn}
            </p>
            {dateDeceased && (
              <p className="text-sm">
                <strong>Deceased:</strong> {dateDeceased}
              </p>
            )}
          </div>
          <h2 className="text-xl mt-4">About</h2>
          <p className="text-sm mt-2">{authorBiography}</p>
        </div>
        <div className="w-1/3 pl-4 flex justify-end">
          <img
            src={authorImage}
            alt="Director Image"
            className="w-full"
            style={{ height: `450px`, width: `300px` }}
          />
        </div>
      </div>
      <div style={{ marginBottom: `24px`, marginTop: `24px` }}>
        <h2 className="text-xl">My Favorite Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {books.map((book) => (
            <div
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              key={book.book_uid}
            >
              <a key={book.book_uid} href={`/books/${book.book_uid}`}>
                <img
                  key={book.book_uid}
                  src={book.book_cover_image}
                  alt={`Book ${book.book_title}`}
                  className="w-full h-full"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;