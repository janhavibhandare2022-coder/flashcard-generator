import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-red-600 tracking-wide">AlmaBetter</h1>
      </div>
      <div className="max-w-6xl mx-auto mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Flashcard</h2>
        <div className="flex gap-8 border-b border-gray-300 text-sm font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `pb-2 transition-all ${
                isActive
                  ? 'border-b-4 border-red-500 text-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`
            }
          >
            Create New
          </NavLink>
          <NavLink
            to="/my-flashcards"
            className={({ isActive }) =>
              `pb-2 transition-all ${
                isActive
                  ? 'border-b-4 border-red-500 text-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`
            }
          >
            My Flashcard
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;