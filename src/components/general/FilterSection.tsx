// FilterSection.tsx
import React from 'react';

interface FilterSectionProps {
  label: string;
  isExpanded: boolean;
  onButtonClick: () => void;
  options: string[];
  selectedOption: string | string[] | number;
  onOptionClick: (option: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  label,
  isExpanded,
  onButtonClick,
  options,
  selectedOption,
  onOptionClick,
}) => {
  return (
    <div>
      <button
        className="block w-full text-left hover:bg-gray-100 p-1"
        onClick={onButtonClick}
      >
        {label}
        <svg
          className={`float-right inline-block transform ${
            isExpanded ? `rotate-180` : ``
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 12 12"
          fill="currentColor"
        >
          <path d="M3.672 4h4.656L6 7.58z" />
        </svg>
      </button>

      {isExpanded && (
        <div>
          {options.map((option) => (
            <button
              key={option}
              className={`px-1 py-1 rounded-md ${
                selectedOption === option
                  ? `text-primary opacity-50`
                  : `text-primary hover:opacity-50`
              }`}
              onClick={() => onOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSection;
