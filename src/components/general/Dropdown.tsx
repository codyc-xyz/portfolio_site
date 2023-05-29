import React from 'react';

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onOptionClick: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onOptionClick,
}) => {
  return (
    <div className="bg-gray-50 p-2 rounded-b-lg border absolute z-10 w-full">
      {options.map((option) => (
        <button
          key={option}
          className={`block w-full text-left hover:bg-gray-100`}
          onClick={() => onOptionClick(option)}
        >
          {option}
          {selectedOption === option && (
            <svg
              className="float-right inline-block"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 16.17L5.53 12.7a.996.996 0 0 1 1.41-1.41l2.83 2.83 6.36-6.36a.996.996 0 1 1 1.41 1.41L9 16.17z" />
            </svg>
          )}
        </button>
      ))}
    </div>
  );
};

export default Dropdown;
