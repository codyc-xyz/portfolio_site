import React from 'react';
import { X } from 'react-feather';

interface ClearButtonProps {
  onClear: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClear }) => {
  return (
    <button
      type="button"
      className="absolute top-1/2 right-4 md:right-5 transform -translate-y-1/2"
      onClick={onClear}
    >
      <X className="h-3 w-3 text-gray-500 hover:text-gray-700 cursor-pointer" />
    </button>
  );
};

export default ClearButton;
