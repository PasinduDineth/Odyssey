// components/Sidebar.js
import Link from 'next/link';

const Sidebar = ({isOpen}) => {
  return (
    <div className={`fixed min-h-screen left-0 bg-text w-64 overflow-x-hidden transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between p-4">
        <span className="text-white text-xl font-bold">Sidebar</span>
      </div>
      <div className="p-4">
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
