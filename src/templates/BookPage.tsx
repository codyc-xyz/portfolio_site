import { ExcerptAttributes } from '../types/ExcerptAttributes';
import React, { useState } from 'react';
import { Link } from 'gatsby';

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
    <div className="container font-medium text-text mb-4">
      <div className="flex mt-4">
        <div className="w-full lg:w-3/5 xl:w-2/3 pr-2 lg:pr-4 ">
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
              <Link to={`/authors/${authorUid}`} className="hover:opacity-50">
                {authorName}
              </Link>
            </p>
            <p className="text-sm">
              <strong>Subjects: </strong> {subjects.join(`, `)}
            </p>
            <p className="text-sm">
              <strong>isbn:</strong> {isbn}
            </p>

            <p className="text-sm">
              <a
                href={goodreadsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-50"
              >
                Goodreads
              </a>
            </p>
            <div className="lg:hidden w-1/2 mt-2">
              <img src={coverImage} alt="Book Cover" className="w-full" />
            </div>
          </div>
          <h2 className="text-xl mt-4">About</h2>
          <p className="text-sm mt-2">{bookDescription}</p>
        </div>
        <div className="hidden lg:block w-full lg:w-2/5 xl:w-1/3 pl-0 lg:pl-4">
          <img src={coverImage} alt="Book Cover" className="w-full" />
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl">Excerpts I Find Interesting</h2>
        <div className="flex lg:hidden items-center justify-center mt-4 lg:mt-0">
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

        <div className="grid grid-cols-12">
          <div className="col-start-1 col-span-4 flex items-center justify-start my-2 lg:mt-4">
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
              <button
                type="submit"
                className="text-primary ml-1 hover:opacity-50"
              >
                Go
              </button>
            </form>
          </div>
          <div className="hidden lg:flex col-start-5 col-span-5 flex-row items-center justify-center my-2 lg:mt-4">
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
          <div className="col-start-12 col-span-1 flex items-center justify-end my-2 lg:mt-4">
            <button
              className="text-base md:text-lg lg:text-xl text-primary hover:opacity-50"
              onClick={handleRandomExcerpt}
            >
              Random
            </button>
          </div>
        </div>
        <div className="col-start-4 col-span-6 flex justify-center my-0 lg:my-4">
          <p>{currentExcerpt.text}</p>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
