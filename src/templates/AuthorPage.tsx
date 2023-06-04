import Card from '../components/general/Card';
import Header from '../components/general/Header';
import { BookAttributes } from '../types/BookAttributes';
import React from 'react';
import Layout from '../Layout';

interface AuthorPageProps {
  pageContext: {
    authorUid: string;
    authorName: string;
    authorBiography: string;
    dateBorn: string;
    dateDeceased: string;
    authorImage: string;
    countryOfBirth: string;
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
    countryOfBirth,
    books,
  } = pageContext;
  return (
    <Layout>
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
              <p className="text-sm">
                <strong>From:</strong> {countryOfBirth}
              </p>
            </div>
            <h2 className="text-xl mt-4">About</h2>
            <p className="text-sm mt-2">{authorBiography}</p>
          </div>
          <div className="w-1/3 pl-4 flex justify-end">
            <img
              src={authorImage}
              alt="Director Image"
              className="w-full"
              style={{ height: `350px`, width: `250px` }}
            />
          </div>
        </div>
        <div className="my-2">
          <h2 className="text-xl">Books I Found Interesting</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {books.map((book: BookAttributes) => (
              <Card
                key={book.book_uid}
                imageUrl={book.book_cover_image}
                altText={`Book ${book.book_title}`}
                pageUrl={`/books/${book.book_uid}`}
                imageHeight="400px"
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthorPage;
