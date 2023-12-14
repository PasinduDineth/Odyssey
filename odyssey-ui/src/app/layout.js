"use client"
import './globals.css'
import Navbar from "./navbar"
import Sidebar from './sidebar'
import { useState } from 'react';

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <html lang="en">
      <body className="flex flex-1 flex-col h-[100vh]">
        <Navbar toggleSidebar={toggleSidebar} isOpen={isOpen}/>
        <div className='flex h-[100%]'>
          <div className='flex'>
            <Sidebar isOpen={isOpen}/>
          </div>
          <div className='flex'>
          {children}
          </div>
        </div>
      </body>
    </html>
  )
}
