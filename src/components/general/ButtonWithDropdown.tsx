import React from 'react';

interface ButtonWithDropdownProps {
  label: string;
  isExpanded: boolean;
  onButtonClick: () => void;
  dropdown: React.ReactNode;
}

const ButtonWithDropdown: React.FC<ButtonWithDropdownProps> = ({
  label,
  isExpanded,
  onButtonClick,
  dropdown,
}) => {
  return (
    <div className="w-1/4 relative">
      <button
        className={`w-full py-2 px-2 ${
          isExpanded ? `rounded-t-lg` : `rounded-lg`
        } bg-white shadow-sm border border-gray-300`}
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
      {isExpanded && dropdown}
    </div>
  );
};

export default ButtonWithDropdown;
