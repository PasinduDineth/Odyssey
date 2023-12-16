"use client"
import React, { useState, useEffect, useRef } from 'react';

const SearchableSelect = ({ options, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    // Filter options based on the inputValue
    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);

    // Open dropdown if there are filtered options
    setIsDropdownOpen(filtered.length > 0);
  }, [inputValue, options]);

  useEffect(() => {
    // Add event listener for clicks outside the component
    document.addEventListener('click', handleClickOutside);

    // Set initial state of isDropdownOpen to false
    setIsDropdownOpen(false);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = e => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleChange = option => {
    setInputValue(option.label);
    setIsDropdownOpen(false);
  };

  const handleInputClick = () => {
    setIsDropdownOpen(true);
  };

  return (
    <div ref={dropdownRef} className="relative w-full rounded">
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onClick={handleInputClick}
        placeholder={placeholder}
        className="px-3 py-1 text-md focus:outline-none border-0 focus:border-0 ring-0 focus:ring-0 bg-gray-100 w-full rounded"
      />
      {isDropdownOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 bg-white border mt-2 w-full">
          {filteredOptions.map(option => (
            <li
              key={option.value}
              onClick={() => handleChange(option)}
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableSelect;