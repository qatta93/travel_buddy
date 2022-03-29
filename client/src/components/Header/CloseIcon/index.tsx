import React from 'react';
import './style.css';

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="header__close-icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default CloseIcon;
