import React from 'react';

const SubmitButton: React.FC = () => {
  return (
    <button
      type="submit"
      className="ml-2 text-primary text-md lg:text-lg hover:text-opacity-50"
    >
      Go
    </button>
  );
};

export default SubmitButton;
