import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? 'bg-white text-gray-900 shadow-md py-4' : 'bg-[#008080] text-white  py-10'
      }`}
    >
      <header className="flex items-center justify-between px-6 sm:px-10 md:px-16 max-w-[1440px] mx-auto transition-all duration-500 ease-in-out">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="font-extrabold text-lg select-none">Towers Laundry</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-10 font-medium text-sm">
          {['How it works', 'Prices & Services', 'About us', 'For business'].map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="hover:text-[#60A5FA]"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex items-center space-x-6 font-medium text-sm">
          <a href="#" className="hover:text-[#60A5FA]">
            Log in
          </a>
          <a
            href="#"
            className={`px-5 py-2 rounded-md text-black  ${
              isScrolled ? 'bg-[#F4B400] hover:bg-[rgb(280,200,0)]' : 'bg-white text-black '
            }`}
          >
            Book now
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
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
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`md:hidden flex flex-col space-y-4 px-6 pb-6 transition-all duration-300 ${
            isScrolled ? 'bg-white text-gray-900' : 'bg-[#008080] text-white'
          }`}
        >
          <a href="#" className="hover:text-[#60A5FA] transition">How it works</a>
          <a href="#" className="hover:text-[#60A5FA] transition">Prices & Services</a>
          <a href="#" className="hover:text-[#60A5FA] transition">About us</a>
          <a href="#" className="hover:text-[#60A5FA] transition">For business</a>
          <a href="#" className="hover:text-[#60A5FA] transition">Log in</a>
          <a href="#" className="bg-white text-[#008080] hover:bg-gray-100 py-2 px-4 rounded-md transition">Book now</a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
