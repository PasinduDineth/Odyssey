"use client"
import { Badge } from 'flowbite-react';
import TestCaseItem from "../../utils/components/test-case-item/testCaseItem"
import React from 'react';
import { useState } from 'react';

export default function Tests() {
    const [tests, setTests] = useState(1);

    const addTestItem = () => {
      setTests(tests + 1);
    };
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
              <TestCaseItem key={i} testcaseID={i + 1} count={i + 1} addTestItem={addTestItem} addEnabled={i === arr.length - 1} />
            )}
          </div>
          <div className="flex w-[35%] border-l-4">
          </div>
        </div>
      </div>
    )
  }