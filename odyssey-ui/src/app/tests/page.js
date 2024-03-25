"use client"
import { Badge } from 'flowbite-react';
import TestCaseItem from "../../utils/components/test-case-item/testCaseItem"
import React from 'react';
import { useState } from 'react';
import debounce from 'lodash/debounce';
import axios from 'axios';
export default function Tests() {
    const [tests, setTests] = useState(2);
    const [isLoadingData, setIsLoadingData] = useState({testCaseID: 0, isLoading: false, suggessions: []});

    const addTestItem = () => {
      setTests(tests + 1);
    };

    const onSearch = debounce(async (searchTerm) => {
      try {
        setIsLoadingData({ testCaseID: searchTerm.testCaseId, isLoading: true, suggessions: [] });
        const response = await axios.post('http://localhost:5000/process-nlp', {
          input_text: searchTerm.term
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Response from server:', response.data);
        setIsLoadingData({ testCaseID: searchTerm.testCaseId, isLoading: false, suggessions: response.data });
        // Process the response data here
      } catch (error) {
        console.error('Error sending data to server:', error);
        setIsLoadingData({ testCaseID: searchTerm.testCaseId, isLoading: false, suggessions: [] });
      }
    }, 300);
    return (
      <div className="flex w-full flex-col mx-5">
        <div className="flex justify-start w-full mt-5 p-5 space-x-20 bg-white">
          <div className="flex flex-col justify-start">
            <p className='text-text-text'>Status</p>
            <Badge color="gray" size="xs">
              Draft
            </Badge>
          </div>
          <div className="flex flex-col justify-start">
            <p className='text-text-text'>Created By</p>
            <p className='text-text text-xs'>Pasindu Dineth</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className='text-text-text'>Assignee</p>
            <p className='text-text text-xs'>Pasindu Dineth</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className='text-text-text'>Created Date</p>
            <p className='text-text text-xs'>01 Jan 2023</p>

          </div>
        </div>
        <div className="flex w-full mt-2 min-h-screen bg-white flex-col">
          <div className='flex flex-col w-[65%]'>
            {[...Array(tests)].map((_, i, arr) => 
              <TestCaseItem testcaseID={i + 1} count={i + 1} onSearch={onSearch} addTestItem={addTestItem} addEnabled={i === arr.length - 1} isLoadingData={isLoadingData}/>
            )}
          </div>
          <div className="flex w-[35%] border-l-4">
          </div>
        </div>
      </div>
    )
  }