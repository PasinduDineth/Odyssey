// ./src/app/navbar.js
import Link from 'next/link';
import Image from 'next/image'
import { FaBars } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';

import { BiLeftArrowAlt } from "react-icons/bi";
import { BsJustify } from "react-icons/bs";
const Navbar = ({toggleSidebar, isOpen}) => {
  return (
    <nav className="bg-white px-4 py-1">
      <div className="mx-2 flex items-center justify-between">
        <div className='flex justify-center items-center'>
          {!isOpen ? <FaBars size={20} className="text-text-dark cursor-pointer mr-4" onClick={toggleSidebar} /> :
          <FaArrowLeft size={20} className="text-text-dark cursor-pointer mr-4" onClick={toggleSidebar} />}
          <Image src="/logo4.png" alt="ODYSSEY" width={130} height={100} />
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {/* Your navigation links */}
          <Link href="/">
            <span className="text-text-dark font-bold">Home</span>
          </Link>
          <Link href="/about">
            <span className="text-text-dark font-bold">About</span>
          </Link>
          <Link href="/contact">
            <span className="text-text-dark font-bold">Contact</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


