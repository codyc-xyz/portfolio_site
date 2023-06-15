import React from 'react';

interface FilterButtonProps {
  isFilterExpanded: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  isFilterExpanded,
  onClick,
}) => (
  <button
    className={`w-full text-sm md:text-base lg:text-lg ${
      isFilterExpanded ? `rounded-t-lg` : `rounded-lg`
    } bg-white shadow-sm border border-gray-300 p-2`}
    onClick={onClick}
  >
    Filter{` `}
    <svg
      className={`float-right inline-block transform ${
        isFilterExpanded ? `rotate-180` : ``
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
);

export default FilterButton;
