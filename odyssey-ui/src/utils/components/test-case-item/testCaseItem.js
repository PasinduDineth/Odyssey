"use client"
import { useState, useCallback, useRef } from 'react';
import SearchableSelect from "../select/select"
import { IoCheckmarkDone } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";
import { VscBlank } from "react-icons/vsc";

const TestCaseItem = ({addTestItem, key, addEnabled, count, onSelect}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const debounceTimer = useRef(null);

    const fetchSuggestions = useCallback(async (userText) => {
        if (!userText || userText.trim().length < 2) {
            setSuggestions([]);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3000/get-suggestions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userText }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch suggestions');
            }

            const result = await response.json();
            
            // Transform API results to dropdown options format
            const options = result.data.map((item, index) => ({
                value: item.id || `suggestion-${index}`,
                label: item.natural_text || item.scenario,
                similarity: item.score,
                action: item.action,
                displayName: item.display_name
            }));

            setSuggestions(options);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSearch = useCallback((searchText) => {
        // Clear existing timer
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Set new timer for debounced search
        debounceTimer.current = setTimeout(() => {
            fetchSuggestions(searchText);
        }, 300); // 300ms debounce delay
    }, [fetchSuggestions]);

    const handleSelect = useCallback((option) => {
        if (onSelect) {
            onSelect(option);
        }
    }, [onSelect]);

    return(
        <div className="flex mt-5 mx-5 items-center h-fit" key={key}>
            {!addEnabled ?
                <IoCheckmarkDone size={22} className='mr-2 text-green-500'/>
                :
                <VscBlank size={22} className='mr-2'/>
            }
            <p className='text-clean bg-accent px-1 mr-2 rounded'>{count}</p>
            <SearchableSelect 
                onSearch={handleSearch} 
                options={suggestions} 
                placeholder="Start Typing" 
                isLoading={isLoading}
                onSelect={handleSelect}
            />
            {addEnabled ?
                <FiPlusCircle  size={24} className='ml-2 text-primary-light' onClick={addTestItem}/>
                :
                <VscBlank size={22} className='mr-2'/>
            }
        </div>
    )
}

export default TestCaseItem;