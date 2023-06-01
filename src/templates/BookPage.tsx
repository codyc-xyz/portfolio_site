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
    countryOfOrigin: string;
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
    countryOfOrigin,
  } = pageContext;

  const [currentExcerptIndex, setCurrentExcerptIndex] = useState(0);
  const [inputExcerptIndex, setInputExcerptIndex] = useState(``);
  const currentExcerpt = excerpts[currentExcerptIndex];
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

  const handleChange = (event: any) => {
    setInputExcerptIndex(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const newIndex = parseInt(inputExcerptIndex, 10) - 1;
    if (newIndex >= 0 && newIndex < excerpts.length) {
      setCurrentExcerptIndex(newIndex);
    }
    setInputExcerptIndex(``);
  };

  const handleRandomExcerpt = () => {
    const randomIndex = Math.floor(Math.random() * excerpts.length);
    setCurrentExcerptIndex(randomIndex);
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
              <strong>From:</strong> {countryOfOrigin}
            </p>

            <p className="text-sm">
              <strong>By: </strong>
              <a
                href={`/authors/${authorUid}`}
                target="_blank"
                rel="noopener noreferrer"
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
      <div className="mt-4">
        <h2 className="text-xl">Excerpts I Find Interesting</h2>
        <div className="grid grid-cols-12">
          <div className="col-start-1 col-span-4 flex items-center justify-start mt-4">
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                className="rounded p-2"
                type="text"
                value={inputExcerptIndex}
                onChange={handleChange}
                placeholder={(currentExcerptIndex + 1).toString()}
                style={{ width: `50px`, height: `15px` }}
              />
              {` `} / {excerpts.length}
              <button type="submit" className="text-primary ml-1">
                Go
              </button>
            </form>
          </div>
          <div className="col-start-5 col-span-4 flex items-center justify-center mt-4">
            <button
              className="text-2xl text-gray-500"
              onClick={handlePreviousExcerpt}
              disabled={currentExcerptIndex === 0}
            >
              &lt;
            </button>
            <div className="mx-4 text-xs">
              <p>
                Page: {currentExcerpt.page_number} / {pages}
              </p>
              {currentExcerpt.section && (
                <p>
                  <span className="font-semibold">Section:</span>
                  {` `}
                  {currentExcerpt.section}
                </p>
              )}
              {currentExcerpt.chapter && (
                <p>
                  <span className="font-semibold">Chapter:</span>
                  {` `}
                  {currentExcerpt.chapter}
                </p>
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
          <div className="col-start-12 col-span-1 flex items-center justify-end mt-4">
            <button
              className="text-xl text-primary"
              onClick={handleRandomExcerpt}
            >
              Random
            </button>
          </div>
        </div>
        <div className="col-start-4 col-span-6 flex justify-center my-4">
          <p>{currentExcerpt.text}</p>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
