import Header from '../components/general/Header';
import { ExcerptAttributes } from '../types/ExcerptAttributes';
import React from 'react';

interface BookPageProps {
  pageContext: {
    bookTitle: string;
    bookDescription: string;
    pages: number;
    datePublished: string;
    subjects: string[];
    coverImage: string;
    goodreadsLink: string;
    isbn: string;
    authorUid: string;
    authorName: string;
    excerpts: ExcerptAttributes[];
  };
}

const BookPage: React.FC<BookPageProps> = ({ pageContext }) => {
  const {
    bookTitle,
    bookDescription,
    pages,
    datePublished,
    subjects,
    coverImage,
    goodreadsLink,
    isbn,
    authorUid,
    authorName,
    excerpts,
  } = pageContext;
  console.log(excerpts);
  return (
    <div className="container font-medium text-text">
      <Header />
      <div className="flex" style={{ marginTop: `24px` }}>
        <div className="w-2/3 pr-4">
          <h1 className="text-2xl">{bookTitle}</h1>
          <div className="mt-2">
            <p className="text-sm">
              <strong>Length:</strong> {pages} pages
            </p>
            <p className="text-sm">
              <strong>Published:</strong> {datePublished}
            </p>
            <p className="text-sm">
              <strong>By: </strong>
              <a
                href={`/authors/${authorUid}`}
                target="_blank"
                rel="noreferrer"
              >
                {authorName}
              </a>
            </p>
            <p className="text-sm">
              <strong>Subjects: </strong> {subjects.join(`, `)}
            </p>
            <p className="text-sm">
              <strong>Goodreads: </strong>
              <a href={goodreadsLink} target="_blank" rel="noopener noreferrer">
                {goodreadsLink}
              </a>
            </p>
            <p className="text-sm">
              <strong>isbn:</strong> {isbn}
            </p>
          </div>
          <h2 className="text-xl mt-4">About</h2>
          <p className="text-sm mt-2">{bookDescription}</p>
        </div>
        <div className="w-1/3 pl-4">
          <img
            src={coverImage}
            alt="Book Poster"
            className="w-full"
            style={{ height: `450px`, width: `300px` }}
          />
        </div>
      </div>
      <div style={{ marginTop: `24px` }}>
        <h2 className="text-xl">Excerpts</h2>
        <div
          className="grid grid-cols-2 gap-4 mt-4"
          style={{ marginBottom: `24px` }}
        >
          {/* {screenshotLinks.map((screenshot, index) => (
            <img
              key={index}
              src={screenshot}
              alt={`Screenshot ${index + 1}`}
              className="w-full h-full"
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};
export default BookPage;
