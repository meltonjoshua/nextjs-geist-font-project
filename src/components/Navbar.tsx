'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{ backgroundColor: '#003366' }} className="text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight">Suffolk Cleaning</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
            <Link href="/services" className="hover:text-blue-300 transition-colors">Services</Link>
            <Link href="/about" className="hover:text-blue-300 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-blue-300 transition-colors">Contact</Link>
            <Link href="/contractor/login" className="bg-white text-blue-900 px-4 py-1.5 rounded font-semibold hover:bg-blue-100 transition-colors text-sm">
              Contractor Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded hover:bg-blue-800 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-0.5 bg-white mb-1"></div>
            <div className="w-5 h-0.5 bg-white mb-1"></div>
            <div className="w-5 h-0.5 bg-white"></div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="/" className="hover:text-blue-300 transition-colors" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/services" className="hover:text-blue-300 transition-colors" onClick={() => setMenuOpen(false)}>Services</Link>
            <Link href="/about" className="hover:text-blue-300 transition-colors" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/contact" className="hover:text-blue-300 transition-colors" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link href="/contractor/login" className="bg-white text-blue-900 px-4 py-1.5 rounded font-semibold hover:bg-blue-100 transition-colors text-sm w-fit" onClick={() => setMenuOpen(false)}>
              Contractor Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
