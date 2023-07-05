import Card from '../components/general/Card';
import { BookAttributes } from '../types/BookAttributes';
import React from 'react';
import { sanitizeName } from '../../functions/sanitizeName';
import { Helmet } from 'react-helmet';

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
    <div className="container font-medium pb-4">
      <Helmet>
        <title>{authorName} | CodyC</title>
      </Helmet>

      <div className="flex mt-4">
        <div className="w-full lg:w-3/5 xl:w-2/3 pr-2 lg:pr-4 ">
          <h1 className="text-2xl">{authorName}</h1>
          <div className="mt-2 flex-row">
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
          <div className="lg:hidden w-1/2 mt-2">
            <img src={authorImage} alt="Author Image" className="w-full" />
          </div>

          <h2 className="text-xl mt-4">About</h2>
          <p className="text-sm mt-2">{authorBiography}</p>
        </div>
        <div className="hidden lg:block w-full lg:w-2/5 xl:w-1/3 pl-4">
          <img src={authorImage} alt="Author Image" className="w-full" />
        </div>
      </div>
      <div className="my-2">
        <h2 className="text-xl">Books I Find Interesting</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {books.map((book: BookAttributes) => (
            <Card
              key={book.book_uid}
              imageUrl={book.book_cover_image}
              altText={`Book ${book.book_title}`}
              pageUrl={`/books/${sanitizeName(book.book_title)}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
