import React from "react";

interface deleteProps {
  handleClose?: () => any;
}
const Delete = ({ handleClose }: deleteProps) => {
  return (
    <button className="text-red-400" onClick={handleClose}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 18 18"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default Delete;
