import React, { useCallback, useEffect, useState } from 'react';

import NavBarItem from './NavBarItem';
import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu';

import { BsBell, BsChevronDown, BsSearch } from 'react-icons/bs';

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="fixed z-40 w-full">
      <div
        className={`flex flex-row items-center px-4 py-6 transition duration-500 md:px-16 bg-opacity-90 ${
          showBackground ? 'bg-zinc-900 bg-opacity-90' : ''
        }`}
      >
        <img src="/images/Netflixlogo.png" alt="logo" className="h-4 lg:h-7" />
        <div className="flex-row hidden ml-8 gap-7 lg:flex">
          <NavBarItem label="Home" />
          <NavBarItem label="Shows" />
          <NavBarItem label="Movies" />
          <NavBarItem label="New" />
          <NavBarItem label="My List" />
          <NavBarItem label="Browse by language" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="relative flex flex-row items-center gap-2 ml-8 cursor-pointer lg:hidden"
        >
          <p className="text-sm text-white">Browse</p>
          <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row items-center ml-auto gap-7">
          <div className="text-gray-200 transition cursor-pointer hover:text-gray-300">
            <BsSearch />
          </div>
          <div className="text-gray-200 transition cursor-pointer hover:text-gray-300">
            <BsBell />
          </div>
          <div onClick={toggleAccountMenu} className="relative flex flex-row items-center gap-2 cursor-pointer">
            <div className="w-6 h-6 overflow-hidden rounded-md lg:w-10 lg:h-10">
              <img src="/images/profileLogo.png" alt="logo" />
            </div>
            <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : ''}`} />
            <AccountMenu visible={showAccountMenu} />
          </div>{' '}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
