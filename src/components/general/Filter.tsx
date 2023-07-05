import React from 'react';
import FilterButton from './FilterButton';
import FilterSection from './FilterSection';

interface FilterProps {
  isFilterExpanded: boolean;
  onFilterClick: () => void;
  filterSections: any[];
  onClear: () => void;
  filteredItemsLength: number;
  itemsLength: number;
}

const Filter: React.FC<FilterProps> = ({
  isFilterExpanded,
  onFilterClick,
  filterSections,
  onClear,
  filteredItemsLength,
  itemsLength,
}) => (
  <div className="w-3/4 relative text-text">
    <FilterButton isFilterExpanded={isFilterExpanded} onClick={onFilterClick} />
    {isFilterExpanded && (
      <div className="bg-gray-50 p-2 rounded-b-lg border absolute z-10 w-full $">
        {filterSections.map((section, index) => (
          <FilterSection key={index} {...section} />
        ))}
        <button
          className="m-1 mb-0 float-right text-primary hover:opacity-50"
          onClick={onClear}
        >
          Clear
        </button>
        <p className="float-left mt-3 ml-1 text-xs">
          {filteredItemsLength} / {itemsLength}
        </p>
      </div>
    )}
  </div>
);

export default Filter;
