import React, { useState, useEffect } from 'react';
import { BookAttributes } from '../types/BookAttributes';
import Card from '../components/general/Card';
import ButtonWithDropdown from '../components/general/ButtonWithDropdown';
import Filter from '../components/general/Filter';
import Dropdown from '../components/general/Dropdown';
import PageHeader from '../components/general/PageHeader';
import { OptionType } from '../components/general/FilterSection';
import LoadingOrError from '../components/general/LoadingOrError';
import { useQuery, gql } from '@apollo/client';

export const GET_BOOKS = gql`
  {
    allBooks {
      book_uid
      book_title
      book_description
      pages
      date_book_published
      book_subjects
      book_cover_image
      goodreads_link
      isbn
      author_uid
      country_of_origin
      author {
        author_name
      }
    }
  }
`;

const Books: React.FC = () => {
  const [books, setBooks] = useState<BookAttributes[]>([]);
  const [isSortExpanded, setSortExpanded] = useState(false);
  const [isFilterExpanded, setFilterExpanded] = useState(false);
  const [isSubjectExpanded, setSubjectExpanded] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);
  const [isCenturyExpanded, setCenturyExpanded] = useState(false);
  const [selectedCentury, setSelectedCentury] = useState<number | null>(null);
  const [availableCenturies, setAvailableCenturies] = useState<number[]>([]);
  const [isLengthExpanded, setLengthExpanded] = useState(false);
  const [selectedLength, setSelectedLength] = useState<string | null>(null);
  const [availableLengths, setAvailableLengths] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>(``);
  const [filteredBooks, setFilteredBooks] = useState<BookAttributes[]>([]);
  const [randomBookIndex, setRandomBookIndex] = useState(0);
  const [selectedSortOption, setSelectedSortOption] =
    useState<string>(`Title (A-Z)`);

  const { loading, error, data } = useQuery(GET_BOOKS);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const filteredResults = books.filter((book) => {
      const bookYear = new Date(book.date_book_published).getFullYear();
      const bookCentury = Math.floor(bookYear / 100) * 100;
      return (
        (selectedSubjects.length === 0 ||
          selectedSubjects.every((subject) =>
            book.book_subjects.includes(subject),
          )) &&
        (selectedCentury === null || bookCentury === selectedCentury) &&
        (selectedLength === null || checkBookLength(book, selectedLength)) &&
        (book.book_title.toLowerCase().includes(searchValue) ||
          book.country_of_origin.toLowerCase().includes(searchValue) ||
          book.author.author_name.toLowerCase().includes(searchValue))
      );
    });
    const sortedFilteredResults = sortBooks(
      filteredResults,
      selectedSortOption,
    );
    setFilteredBooks(sortedFilteredResults);
  };

  const handleClearSearch = () => {
    setSearchValue(``);
    const filteredResults = books.filter((book) => {
      const bookYear = new Date(book.date_book_published).getFullYear();
      const bookCentury = Math.floor(bookYear / 100) * 100;
      return (
        (selectedSubjects.length === 0 ||
          selectedSubjects.every((subject) =>
            book.book_subjects.includes(subject),
          )) &&
        (selectedCentury === null || bookCentury === selectedCentury) &&
        (selectedLength === null || checkBookLength(book, selectedLength))
      );
    });
    const sortedFilteredResults = sortBooks(
      filteredResults,
      selectedSortOption,
    );
    setFilteredBooks(sortedFilteredResults);
  };

  const handleSortOptionClick = (option: string) => {
    setSortExpanded(!isSortExpanded);
    setSelectedSortOption(option);
  };
  const handleFilterClear = () => {
    setFilteredBooks(
      books.filter(
        (book) =>
          book.book_title.toLowerCase().includes(searchValue) ||
          book.country_of_origin.toLowerCase().includes(searchValue) ||
          book.author.author_name.toLowerCase().includes(searchValue),
      ),
    );

    setSelectedSubjects([]);
    setSelectedCentury(null);
    setSelectedLength(null);
  };

  const checkBookLength = (book: BookAttributes, length: string) => {
    const bookLength = book.pages;

    if (length === `0-100`) {
      return bookLength <= 100;
    } else if (length === `101-200`) {
      return bookLength > 100 && bookLength <= 200;
    } else if (length === `201-400`) {
      return bookLength > 200 && bookLength <= 400;
    } else if (length === `401-600`) {
      return bookLength > 400 && bookLength <= 600;
    } else if (length === `601+`) {
      return bookLength > 600;
    } else {
      return book;
    }
  };

  const handleSubjectClick = (subject: string) => {
    let updatedSubjects: string[];

    if (selectedSubjects.includes(subject)) {
      updatedSubjects = selectedSubjects.filter((s) => s !== subject);
      setFilteredBooks(
        books.filter((book) => {
          const bookYear = new Date(book.date_book_published).getFullYear();
          const bookCentury = Math.floor(bookYear / 100) * 100;

          return (
            (selectedCentury === null || bookCentury === selectedCentury) &&
            updatedSubjects.every((subject) =>
              book.book_subjects.includes(subject),
            ) &&
            (selectedLength === null ||
              checkBookLength(book, selectedLength)) &&
            (searchValue === `` ||
              book.book_title.toLowerCase().includes(searchValue) ||
              book.country_of_origin.toLowerCase().includes(searchValue) ||
              book.author.author_name.toLowerCase().includes(searchValue))
          );
        }),
      );
    } else {
      updatedSubjects = [...selectedSubjects, subject];
      setFilteredBooks(
        filteredBooks.filter((book) =>
          updatedSubjects.every((subject) =>
            book.book_subjects.includes(subject),
          ),
        ),
      );
    }
    setSelectedSubjects(updatedSubjects);
  };

  const handleCenturyClick = (century: number) => {
    if (selectedCentury === century) {
      setSelectedCentury(null);

      setFilteredBooks(
        books.filter((book) => {
          return (
            selectedSubjects.every((subject) =>
              book.book_subjects.includes(subject),
            ) &&
            (selectedLength === null ||
              checkBookLength(book, selectedLength)) &&
            (searchValue === `` ||
              book.book_title.toLowerCase().includes(searchValue) ||
              book.country_of_origin.toLowerCase().includes(searchValue) ||
              book.author.author_name.toLowerCase().includes(searchValue))
          );
        }),
      );
    } else {
      setSelectedCentury(century);

      setFilteredBooks(
        filteredBooks.filter((book) => {
          const bookYear = new Date(book.date_book_published).getFullYear();
          const bookCentury = Math.floor(bookYear / 100) * 100;
          return (
            bookCentury === century &&
            selectedSubjects.every((subject) =>
              book.book_subjects.includes(subject),
            ) &&
            (selectedLength === null || checkBookLength(book, selectedLength))
          );
        }),
      );
    }
  };

  const handleLengthClick = (length: string) => {
    if (selectedLength === length) {
      setSelectedLength(null);
      setFilteredBooks(
        books.filter((book) => {
          const bookYear = new Date(book.date_book_published).getFullYear();
          const bookCentury = Math.floor(bookYear / 100) * 100;

          return (
            (selectedCentury === null || bookCentury === selectedCentury) &&
            selectedSubjects.every((subject) =>
              book.book_subjects.includes(subject),
            ) &&
            (searchValue === `` ||
              book.book_title.toLowerCase().includes(searchValue) ||
              book.country_of_origin.toLowerCase().includes(searchValue) ||
              book.author.author_name.toLowerCase().includes(searchValue))
          );
        }),
      );
    } else {
      setSelectedLength(length);
      setFilteredBooks(
        filteredBooks.filter((book) => {
          return checkBookLength(book, length);
        }),
      );
    }
  };

  const countSubjects = (books: BookAttributes[]) => {
    return books.reduce((counts: Record<string, number>, book) => {
      book.book_subjects.forEach((subject) => {
        if (!counts[subject]) {
          counts[subject] = 0;
        }
        counts[subject]++;
      });
      return counts;
    }, {});
  };

  const sortBooks = (books: BookAttributes[], sortOption: string) => {
    const booksCopy = [...books];

    switch (sortOption) {
      case `Title (A-Z)`:
        return booksCopy.sort((a, b) =>
          a.book_title.localeCompare(b.book_title),
        );
      case `Publish Date Ascending`:
        return books.sort(
          (a, b) =>
            new Date(a.date_book_published).getTime() -
            new Date(b.date_book_published).getTime(),
        );
      case `Publish Date Descending`:
        return booksCopy.sort(
          (a, b) =>
            new Date(b.date_book_published).getTime() -
            new Date(a.date_book_published).getTime(),
        );
      case `Author (A-Z)`:
        return booksCopy.sort((a, b) =>
          a.author.author_name.localeCompare(b.author.author_name),
        );
      case `Country (A-Z)`:
        return booksCopy.sort((a, b) =>
          a.country_of_origin.localeCompare(b.country_of_origin),
        );
      case `Page Length Ascending`:
        return booksCopy.sort((a, b) => a.pages - b.pages);
      case `Page Length Descending`:
        return booksCopy.sort((a, b) => b.pages - a.pages);
      default:
        return booksCopy;
    }
  };

  const calculateLengths = (books: BookAttributes[]) => {
    return books.reduce((lengths: string[], book) => {
      const pageLength = book.pages;
      if (pageLength <= 100 && !lengths.includes(`0-100`)) {
        lengths.push(`0-100`);
      } else if (
        pageLength > 100 &&
        pageLength <= 200 &&
        !lengths.includes(`101-200`)
      ) {
        lengths.push(`101-200`);
      } else if (
        pageLength > 200 &&
        pageLength <= 400 &&
        !lengths.includes(`201-400`)
      ) {
        lengths.push(`201-400`);
      } else if (
        pageLength > 400 &&
        pageLength <= 600 &&
        !lengths.includes(`401-600`)
      ) {
        lengths.push(`401-600`);
      } else if (pageLength > 600 && !lengths.includes(`601+`)) {
        lengths.push(`601+`);
      }
      return lengths;
    }, []);
  };

  const handleRandomClick = () => {
    if (filteredBooks.length > 0) {
      const newIndex = Math.floor(Math.random() * filteredBooks.length);
      setRandomBookIndex(newIndex);
    }
  };

  useEffect(() => {
    if (!loading && !error && data) {
      const fetchedBooks = data.allBooks;
      const sortedFetchedBooks = sortBooks(fetchedBooks, selectedSortOption);
      setBooks(sortedFetchedBooks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error, data]);

  useEffect(() => {
    const sortedBooks = sortBooks([...filteredBooks], selectedSortOption);
    setFilteredBooks(sortedBooks);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSortOption, selectedCentury, selectedSubjects, selectedLength]);

  useEffect(() => {
    if (books.length > 0) {
      setFilteredBooks(books);
    }
  }, [books]);

  useEffect(() => {
    const subjectCounts = countSubjects(filteredBooks);
    const uniqueSubjects = Object.keys(subjectCounts).sort((a, b) => {
      if (selectedSubjects.includes(a) && !selectedSubjects.includes(b)) {
        return -1;
      } else if (
        !selectedSubjects.includes(a) &&
        selectedSubjects.includes(b)
      ) {
        return 1;
      }
      return subjectCounts[b] - subjectCounts[a];
    });
    setAvailableSubjects(uniqueSubjects);
  }, [filteredBooks, selectedSubjects]);

  useEffect(() => {
    const uniqueCenturies = filteredBooks.reduce(
      (centuries: number[], book) => {
        const bookYear = new Date(book.date_book_published).getFullYear();
        const bookCentury = Math.floor(bookYear / 100) * 100;
        if (!centuries.includes(bookCentury)) {
          centuries.push(bookCentury);
        }
        return centuries;
      },
      [],
    );
    const sortedCenturies = uniqueCenturies.sort((a, b) => a - b);
    setAvailableCenturies(sortedCenturies);
  }, [filteredBooks]);

  useEffect(() => {
    const uniqueLengths = calculateLengths(filteredBooks);
    const sortedLengths = uniqueLengths.sort((a, b) => {
      if (a === `601+`) {
        return 1;
      } else if (b === `601+`) {
        return -1;
      } else {
        const aNum = parseInt(a, 10);
        const bNum = parseInt(b, 10);

        if (aNum < bNum) {
          return -1;
        } else if (aNum > bNum) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    setAvailableLengths(sortedLengths);
  }, [filteredBooks]);
  useEffect(() => {
    if (filteredBooks.length > 0) {
      const newIndex = Math.floor(Math.random() * filteredBooks.length);
      setRandomBookIndex(newIndex);
    }
  }, [filteredBooks]);

  const randomBook = filteredBooks[randomBookIndex]?.book_uid;

  const sortOptions = [
    `Title (A-Z)`,
    `Author (A-Z)`,
    `Country (A-Z)`,
    `Page Length Ascending`,
    `Page Length Descending`,
    `Publish Date Ascending`,
    `Publish Date Descending`,
  ];

  const dropdown = (
    <Dropdown
      options={sortOptions}
      selectedOption={selectedSortOption}
      onOptionClick={handleSortOptionClick}
    />
  );

  const filterSections = [
    {
      label: `Subject`,
      isExpanded: isSubjectExpanded,
      onButtonClick: () => setSubjectExpanded(!isSubjectExpanded),
      options: availableSubjects,
      selectedOption: selectedSubjects,
      onOptionClickString: handleSubjectClick,
    },
    {
      label: `Century`,
      isExpanded: isCenturyExpanded,
      onButtonClick: () => setCenturyExpanded(!isCenturyExpanded),
      options: availableCenturies,
      selectedOption: selectedCentury,
      onOptionClickNumber: handleCenturyClick,
      displayOption: (option: OptionType) => `${option}s`,
    },
    {
      label: `Pages`,
      isExpanded: isLengthExpanded,
      onButtonClick: () => setLengthExpanded(!isLengthExpanded),
      options: availableLengths,
      selectedOption: selectedLength,
      onOptionClickString: handleLengthClick,
      displayOption: (option: OptionType) => `${option} pages`,
    },
  ];

  if (loading || error) {
    return <LoadingOrError loading={loading} error={error}></LoadingOrError>;
  }

  return (
    <div className="container text-text">
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex gap-4">
          <ButtonWithDropdown
            widthClass="w-1/4"
            paddingClass="w-full py-2 px-2"
            label="Sort"
            isExpanded={isSortExpanded}
            onButtonClick={() => setSortExpanded(!isSortExpanded)}
            dropdown={dropdown}
          />
          <Filter
            isFilterExpanded={isFilterExpanded}
            onFilterClick={() => setFilterExpanded(!isFilterExpanded)}
            filterSections={filterSections}
            onClear={handleFilterClear}
            filteredItemsLength={filteredBooks.length}
            itemsLength={books.length}
          />
        </div>
        <div>
          <div>
            <PageHeader
              randomItem={randomBook}
              onClick={handleRandomClick}
              searchValue={searchValue}
              onSubmit={handleSearchSubmit}
              onInputChange={handleSearchInputChange}
              onClear={handleClearSearch}
              titleText="Books I Find Interesting"
            />
          </div>
        </div>
        <div className="grid grid-cols-6 grid-rows-2 gap-4 mt-2">
          {filteredBooks.map((book) => {
            return (
              <Card
                key={book.book_uid}
                pageUrl={`/books/${book.book_uid}`}
                altText={book.book_title}
                title={book.author.author_name}
                secondaryText={book.country_of_origin}
                imageUrl={book.book_cover_image}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Books;
