// components/Sidebar.js
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
const Sidebar = ({isOpen, toggleSidebar}) => {
  return (
    <div className={`fixed min-h-screen left-0 bg-text w-64 overflow-x-hidden transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between pl-4 py-4">
        <span className="text-white text-xl font-bold">Sidebar</span>
        {!isOpen ? <FaBars size={20} className="text-text-dark cursor-pointer mr-4" onClick={toggleSidebar} /> :
          <FaArrowLeft size={20} className="text-text-dark cursor-pointer mr-4" onClick={toggleSidebar} />}
      </div>
      <div className="pl-4 pr-1">
        <Link href="/">
          <span className="text-white block py-2">Home</span>
        </Link>
        <Link href="/about">
          <span className="text-white block py-2">About</span>
        </Link>
        {/* Add more links as needed */}
      </div>
    </div>
  );
};

export default Sidebar;

