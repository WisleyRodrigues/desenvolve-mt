"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
} as const;

const itemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 20
    }
  },
  exit: { y: -20, opacity: 0 }
} as const;

const mobileMenuVariants = {
  open: { 
    opacity: 1,
    height: 'auto' as const,
    transition: { 
      type: 'spring' as const, 
      stiffness: 300, 
      damping: 30 
    } 
  },
  closed: { 
    opacity: 0,
    height: 0,
    transition: { 
      type: 'spring' as const, 
      stiffness: 300, 
      damping: 30 
    } 
  }
} as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm">
      <motion.div 
        className="container mx-auto px-4 py-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex justify-between items-center">
          <motion.div variants={itemVariants}>
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Desenvolve MT
              </span>
            </Link>
          </motion.div>
          
          <motion.nav 
            className="hidden md:flex space-x-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                Início
              </Link>
            </motion.div>
            <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/missing-persons" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                Pessoas Desaparecidas
              </Link>
            </motion.div>
          </motion.nav>

          <motion.button 
            className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
            whileTap={{ scale: 0.9 }}
            variants={itemVariants}
          >
            {isMenuOpen ? (
              <motion.svg 
                key="close"
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                initial={{ rotate: 0, scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                exit={{ rotate: -180, scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg 
                key="menu"
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </motion.svg>
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden overflow-hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <motion.nav 
                className="flex flex-col space-y-4 py-4"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
              >
                <motion.div
                  variants={{
                    closed: { x: -50, opacity: 0 },
                    open: { 
                      x: 0, 
                      opacity: 1,
                      transition: {
                        x: { stiffness: 1000, velocity: -100 }
                      }
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href="/" 
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Início
                  </Link>
                </motion.div>
                <motion.div
                  variants={{
                    closed: { x: -50, opacity: 0 },
                    open: { 
                      x: 0, 
                      opacity: 1,
                      transition: {
                        x: { stiffness: 1000, velocity: -100 }
                      }
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href="/missing-persons" 
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pessoas Desaparecidas
                  </Link>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
