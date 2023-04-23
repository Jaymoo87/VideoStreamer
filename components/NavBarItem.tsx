import React from 'react';

interface NavBarItemProps {
  label: string;
}

const NavBarItem: React.FC<NavBarItemProps> = ({ label }) => {
  return <div className="text-white transition cursor-pointer hover:text-gray-300">{label}</div>;
};

export default NavBarItem;
