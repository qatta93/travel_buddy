import React from 'react';
import './style.css';

interface ChevronIconProps {
  isExpanded: boolean;
}

const ChevronIcon = ({ isExpanded }: ChevronIconProps) => (isExpanded ? (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="chevron-icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
) : (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="chevron-icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
));

export default ChevronIcon;
