import React from 'react';

export type OptionType = string | number;

interface FilterSectionProps {
  label: string;
  isExpanded: boolean;
  onButtonClick: () => void;
  options: OptionType[];
  selectedOption: OptionType | OptionType[] | null;
  onOptionClickString?: (option: string) => void;
  onOptionClickNumber?: (option: number) => void;
  displayOption?: (option: OptionType) => string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  label,
  isExpanded,
  onButtonClick,
  options,
  selectedOption,
  onOptionClickString,
  onOptionClickNumber,
  displayOption = (option) => option.toString(),
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
              key={option.toString()}
              className={`px-1 py-1 rounded-md ${
                selectedOption === option ||
                (Array.isArray(selectedOption) &&
                  selectedOption.includes(option))
                  ? `text-primary opacity-50`
                  : `text-primary hover:opacity-50`
              }`}
              onClick={() =>
                typeof option === `string`
                  ? onOptionClickString?.(option)
                  : onOptionClickNumber?.(option)
              }
            >
              {displayOption(option)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default FilterSection;
