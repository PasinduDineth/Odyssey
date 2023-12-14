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
      <body className={`flex flex-col min-h-screen overflow-hidden`}>
        <Navbar toggleSidebar={toggleSidebar} isOpen={isOpen}/>
        <div className='flex flex-1 overflow-hidden'>
          <div className={`flex-shrink-0 ${isOpen ? 'w-64' : 'w-14'} transition-width duration-300 ease-in-out overflow-hidden`}>
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
          </div>
          <div className='flex flex-1 overflow-x-hidden overflow-y-auto'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}


