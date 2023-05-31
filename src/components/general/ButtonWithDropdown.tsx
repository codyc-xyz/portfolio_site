import React from 'react';

export interface ButtonWithDropdownProps {
  label: string;
  isExpanded: boolean;
  onButtonClick: () => void;
  dropdown: React.ReactNode;
  widthClass: string;
  paddingClass: string;
}

const ButtonWithDropdown: React.FC<ButtonWithDropdownProps> = ({
  label,
  isExpanded,
  onButtonClick,
  dropdown,
  widthClass,
  paddingClass,
}) => {
  return (
    <div className={`${widthClass} relative`}>
      <button
        className={`${paddingClass} flex justify-between items-center ${
          isExpanded ? `rounded-t-lg` : `rounded-lg`
        } bg-white shadow-sm border border-gray-300`}
        onClick={onButtonClick}
      >
        <div className="flex-grow">{label}</div>
        <svg
          className={`transform ${isExpanded ? `rotate-180` : ``}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 12 12"
          fill="currentColor"
        >
          <path d="M3.672 4h4.656L6 7.58z" />
        </svg>
      </button>
      {isExpanded && dropdown}
    </div>
  );
};

export default ButtonWithDropdown;
