import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  if (location.pathname === '/ledger' || location.pathname === '/more') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bohboo-light frosted-card border-t border-gray-200 p-2 flex justify-around items-center z-20 md:hidden">
      <NavLink to="/" className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-bohboo-accent' : 'text-gray-500'}`}>
        <span className="text-2xl">🏠</span>
        <span className="text-xs">Home</span>
      </NavLink>
      <NavLink to="/ledger" className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-bohboo-accent' : 'text-gray-500'}`}>
        <span className="text-2xl">📊</span>
        <span className="text-xs">Ledger</span>
      </NavLink>
      <NavLink to="/more" className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-bohboo-accent' : 'text-gray-500'}`}>
        <span className="text-xl">⋯</span>
        <span className="text-xs">More</span>
      </NavLink>
    </nav>
  );
};

export default NavBar;