import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { IoSettingsOutline } from "react-icons/io5";
import { VscBell } from "react-icons/vsc";
const Navigation = () => {
  return (
    <Navbar fluid>
      <div className='px-10 flex w-full justify-between'>
        <Navbar.Brand>
          <img src="/logo4.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        </Navbar.Brand>
        <div className="flex md:order-2 items-center">
          <IoSettingsOutline  size={19} className="text-text cursor-pointer mr-6" />
          <VscBell size={19} className="text-text cursor-pointer mr-6" />
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar img="./user.png" size="md" rounded bordered status='online' />
            }
          >
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      </div>
    </Navbar>
  );
};

export default Navigation;


