"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/team', label: 'Team' },
    { href: '/programs', label: 'Programs' },
    { href: '/activities', label: 'Activities' },
    { href: '/contact', label: 'Contact Us' },
  ];

  const moreLinks = [
    { href: '/reports', label: 'Reports' },
    { href: '/get-involved', label: 'Get Involved' },
    { href: '/volunteer', label: 'Volunteer' },
  ];

  return (
    <nav className="bg-white py-4 px-4 shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.jpg"
            alt="Karunya Special School"
            width={80}
            height={80}
            className="h-16 w-auto"
          />
        </Link>

        {/* Mobile Navigation Controls */}
        <div className="flex items-center space-x-3 md:hidden">
          {/* Facebook Icon */}
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1877F2] hover:opacity-80 transition-opacity p-2"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </Link>

          {/* Donate Button */}
          <Link
            href="/donate"
            className="inline-block bg-[#FF4B00] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#0077BE] transition-colors duration-300"
          >
            Donate
          </Link>

          {/* Hamburger Menu Button */}
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-[#0077BE]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-[#0077BE] font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="relative">
            <button
              className="text-gray-600 hover:text-[#0077BE] font-medium transition-colors flex items-center"
              onClick={() => setIsMoreOpen(!isMoreOpen)}
            >
              More <span className="ml-1">▼</span>
            </button>
            {isMoreOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100">
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-gray-600 hover:text-[#0077BE] hover:bg-gray-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Social and Donate */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1877F2] hover:opacity-80 transition-opacity"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </Link>
          <Link
            href="/donate"
            className="inline-block bg-[#FF4B00] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#0077BE] transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            DONATE
          </Link>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden border-t border-gray-100">
            <div className="px-4 py-3 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-600 hover:text-[#0077BE] font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-3">
                <p className="text-sm font-medium text-gray-400 mb-2">More</p>
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-gray-600 hover:text-[#0077BE] font-medium transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;