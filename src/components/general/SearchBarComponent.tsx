import React from 'react';
import ClearButton from './ClearButton';
import SubmitButton from './SubmitButton';

export interface SearchBarComponentProps {
  searchValue: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const SearchBarComponent: React.FC<SearchBarComponentProps> = ({
  searchValue,
  onSubmit,
  onInputChange,
  onClear,
}) => {
  return (
    <div className="w-1/3 xl:w-1/4 flex text-right justify-end text-xs sm:text-sm md:text-base">
      <form onSubmit={onSubmit} className="relative">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded-lg px-1 py-0.5 md:px-2 xl:px-4 xl:py-2 w-2/3 h-3/4 lg:w-3/4 mt-1"
          value={searchValue}
          onChange={onInputChange}
        />
        {searchValue && <ClearButton onClear={onClear} />}
        <SubmitButton />
      </form>
    </div>
  );
};

export default SearchBarComponent;
