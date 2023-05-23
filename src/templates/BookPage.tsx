import Header from '../components/general/Header';
import { ExcerptAttributes } from '../types/ExcerptAttributes';
import React, { useState } from 'react';

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

  const [currentExcerptIndex, setCurrentExcerptIndex] = useState(0);
  const currentExcerpt = excerpts[currentExcerptIndex];
  console.log(currentExcerpt);
  const handlePreviousExcerpt = () => {
    if (currentExcerptIndex > 0) {
      setCurrentExcerptIndex(currentExcerptIndex - 1);
    }
  };

  const handleNextExcerpt = () => {
    if (currentExcerptIndex < excerpts.length - 1) {
      setCurrentExcerptIndex(currentExcerptIndex + 1);
    }
  };

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
        <div className="w-1/3 pl-4 flex justify-end">
          <img
            src={coverImage}
            alt="Book Poster"
            className="w-full"
            style={{ height: `450px`, width: `300px` }}
          />
        </div>
      </div>
      <div style={{ marginTop: `24px` }}>
        {` `}
        <h2 className="text-xl">Excerpts</h2>
      </div>
      <div className="flex flex-col items-center mt-8">
        <div>
          <div className="flex items-center justify-center mt-4">
            <button
              className="text-2xl text-gray-500"
              onClick={handlePreviousExcerpt}
              disabled={currentExcerptIndex === 0}
            >
              &lt;
            </button>
            <div className="mx-4 text-lg">
              <p>Page: {currentExcerpt.page_number}</p>
              {currentExcerpt.chapter && (
                <p>Chapter: {currentExcerpt.chapter}</p>
              )}
              {currentExcerpt.section && (
                <p>Section: {currentExcerpt.section}</p>
              )}
            </div>
            <button
              className="text-2xl text-gray-500"
              onClick={handleNextExcerpt}
              disabled={currentExcerptIndex === excerpts.length - 1}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6">
        {currentExcerptIndex + 1} / {excerpts.length + 1}
        <div
          className="col-start-2 col-span-4"
          style={{ marginTop: `24px`, marginBottom: `48px` }}
        >
          <p>{currentExcerpt.text}</p>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
