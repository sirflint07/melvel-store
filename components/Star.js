import React from 'react';

const Star = ({ filled }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={filled ? "currentColor" : "none"}
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-5 h-5 text-yellow-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 2l2.09 6.26h6.49l-5.27 3.83 2.09 6.26-5.27-3.83-5.27 3.83 2.09-6.26-5.27-3.83h6.49L12 2z"
      />
    </svg>
  );
};

export default Star;