"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-800 dark:text-white">Desenvolve MT</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors">
              Início
            </Link>
            <Link href="/missing-persons" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors">
              Pessoas Desaparecidas
            </Link>
          </nav>

          <button 
            className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4 pb-4`}>
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              href="/missing-persons" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pessoas Desaparecidas
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
