import React from 'react';

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onOptionClick: (option: string) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onOptionClick,
  className = ``,
}) => {
  return (
    <div
      className={`${className} bg-gray-50 p-1 rounded-b-lg border text-xs sm:text-sm md:text-base absolute z-10 w-full`}
    >
      {options.map((option) => (
        <button
          key={option}
          className={`block w-full text-left hover:bg-gray-100 py-0.5`}
          onClick={() => onOptionClick(option)}
        >
          {option}
          {selectedOption === option && (
            <svg
              className="float-right inline-block text-right"
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
