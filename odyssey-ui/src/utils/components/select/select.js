"use client"
import React, { useState, useEffect, useRef } from 'react';

const SearchableSelect = ({ options, placeholder, onSearch, isLoading, onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    // Open dropdown when we have options to show
    if (options && options.length > 0 && inputValue.trim().length >= 2) {
      setIsDropdownOpen(true);
    } else if (!isLoading && inputValue.trim().length < 2) {
      setIsDropdownOpen(false);
    }
  }, [options, isLoading, inputValue]);

  useEffect(() => {
    // Add event listener for clicks outside the component
    document.addEventListener('click', handleClickOutside);

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
    
    // Notify parent component of selection
    if (onSelect) {
      onSelect(option);
    }
  };

  const handleInputChange = e => {
    const value = e.target.value;
    setInputValue(value);
    
    // Trigger search callback with current input
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleInputClick = () => {
    if (inputValue.trim().length >= 2) {
      setIsDropdownOpen(true);
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full rounded">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
        placeholder={placeholder}
        className="px-3 py-1 text-md focus:outline-none border-0 focus:border-0 ring-0 focus:ring-0 bg-gray-100 w-full rounded"
      />
      {isLoading && (
        <div className="absolute z-10 bg-white border mt-2 w-full p-3 text-center text-gray-500">
          Loading suggestions...
        </div>
      )}
      {isDropdownOpen && !isLoading && options && options.length > 0 && (
        <ul className="absolute z-10 bg-white border mt-2 w-full max-h-60 overflow-y-auto shadow-lg rounded">
          {options.map(option => (
            <li
              key={option.value}
              onClick={() => handleChange(option)}
              className="cursor-pointer p-3 hover:bg-blue-50 border-b last:border-b-0 transition-colors"
            >
              <div className="flex justify-between items-start">
                <span className="text-sm">{option.label}</span>
                {option.similarity && (
                  <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                    {(option.similarity * 100).toFixed(0)}%
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      {isDropdownOpen && !isLoading && inputValue.trim().length >= 2 && (!options || options.length === 0) && (
        <div className="absolute z-10 bg-white border mt-2 w-full p-3 text-center text-gray-500">
          No suggestions found
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;