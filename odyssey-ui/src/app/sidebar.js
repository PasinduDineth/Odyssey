// components/Sidebar.js
import Link from 'next/link';
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdCardTravel } from "react-icons/md";
import { MdOutlineAccountTree } from "react-icons/md";
import { MdOutlineBrokenImage } from "react-icons/md";
import { MdOutlineBrightnessLow } from "react-icons/md";
const Sidebar = ({isOpen, toggleSidebar}) => {
  return (
    <div className={`fixed min-h-screen left-0 bg-text w-64 overflow-x-hidden transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-[200px]'}`}>
      <div className="flex items-center justify-end pl-4 py-4">
        {!isOpen ? <FaChevronCircleRight size={20} className="text-white cursor-pointer mr-5" onClick={toggleSidebar} /> :
          <FaChevronCircleLeft size={20} className="text-white cursor-pointer mr-4" onClick={toggleSidebar} />}
      </div>
      <div className={`pl-2 pr-2 transition-opacity duration-500 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}>
        <Link href="/" className='block my-5 py-4 rounded-md pl-2 bg-background bg-opacity-20'>
          <div className="flex items-center">
            <MdOutlineDashboardCustomize size={18} className="text-white cursor-pointer mr-5" />
            <span className="text-white block text-[15px] font-semibold">Dashboard</span>
          </div>
        </Link>
        <Link href="/about" className='block my-3 py-4 pl-2'>
          <div className="flex items-center">
            <MdCardTravel size={18} className="text-white cursor-pointer mr-5" />
            <span className="text-white block text-[15px] font-semibold">Projects</span>
          </div>
        </Link>
        <Link href="/test" className='block my-3 py-4 pl-2'>
          <div className="flex items-center">
            <MdOutlineAccountTree size={18} className="text-white cursor-pointer mr-5" />
            <span className="text-white block text-[15px] font-semibold">Test Creation</span>
          </div>
        </Link>
        <Link href="/reports" className='block my-3 py-4 pl-2 '>
          <div className="flex items-center">
            <MdOutlineBrokenImage size={18} className="text-white cursor-pointer mr-5" />
            <span className="text-white block text-[15px] font-semibold">Reports</span>
          </div>
        </Link>
        <Link href="/reports" className='block my-3 py-4 pl-2'>
          <div className="flex items-center">
            <MdOutlineBrightnessLow size={18} className="text-white cursor-pointer mr-5" />
            <span className="text-white block text-[15px] font-semibold">Settings</span>
          </div>
        </Link>
        {/* Add more links as needed */}
      </div>
    </div>
  );
};

export default Sidebar;

