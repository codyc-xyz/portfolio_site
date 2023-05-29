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
    <div className="w-1/4 flex text-right justify-end">
      <form onSubmit={onSubmit} className="relative">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded-lg px-4 py-2 pr-10 w-3/4 h-3/4 mt-1"
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
