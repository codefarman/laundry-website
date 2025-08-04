import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // Store user data after login
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate login state (replace with actual auth logic)
  useEffect(() => {
    const checkLogin = () => {
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
        setUser(JSON.parse(loggedInUser));
      } else {
        // Simulate login for testing
        setTimeout(() => {
          const testUser = {
            email: 'test@example.com', // Default for email/password login
            // Uncomment for testing:
            // name: 'John Doe', // For email/password with name
            // photoURL: 'https://via.placeholder.com/150' // For Google login
          };
          localStorage.setItem('user', JSON.stringify(testUser));
          setUser(testUser);
        }, 1000);
      }
    };
    checkLogin();

    // Handle click outside to close dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setUserDropdownOpen(false);
    navigate('/'); // Redirect to home page
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  // Default profile icon for email/password login
  const getDefaultProfileIcon = () => (
    <svg
      className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 p-1 border-2 border-[#008080]"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? 'bg-white text-gray-900 shadow-md py-4' : 'bg-[#008080] text-white py-10'
      }`}
    >
      <header className="flex items-center justify-between px-6 sm:px-10 md:px-16 max-w-[1440px] mx-auto transition-all duration-500 ease-in-out">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="font-extrabold text-lg select-none">Towers Laundry</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-10 font-medium text-sm">
          <Link to="/how-it-works" className="hover:text-[#60A5FA]">How it works</Link>
          <Link to="/prices" className="hover:text-[#60A5FA]">Prices & Services</Link>
          <Link to="/about" className="hover:text-[#60A5FA]">About us</Link>
          <Link to="/business" className="hover:text-[#60A5FA]">For business</Link>
        </nav>

        {/* Buttons/User Info */}
        <div className="hidden md:flex items-center space-x-6 font-medium text-sm">
          {user ? (
            <>
              <Link
                to="/booking"
                className={`px-5 py-2 rounded-md text-black ${
                  isScrolled ? 'bg-[#F4B400] hover:bg-[rgb(280,200,0)]' : 'bg-white text-black '
                }`}
              >
                Book now
              </Link>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User Profile"
                      className="w-8 h-8 rounded-full object-cover border-2 border-[#008080]"
                    />
                  ) : (
                    getDefaultProfileIcon()
                  )}
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 text-sm font-semibold text-gray-900 border-b border-gray-200">
                      {user.name || user.email.split('@')[0]}
                    </div>
                    <Link
                      to="/my-orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/prices"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Prices & Services
                    </Link>
                    <Link
                      to="/repeat-orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Repeat Orders
                    </Link>
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Account
                    </Link>
                    <Link
                      to="/help-center"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Help Center
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/booking"
                className={`px-5 py-2 rounded-md text-black ${
                  isScrolled ? 'bg-[#F4B400] hover:bg-[rgb(280,200,0)]' : 'bg-white text-black '
                }`}
              >
                Book now
              </Link>
              <Link to="/login" className="hover:text-[#60A5FA]">
                Log in
              </Link>
            </>
          )}
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
          {!user && (
            <>
              <Link to="/how-it-works" className="hover:text-[#60A5FA] transition">How it works</Link>
              <Link to="/prices" className="hover:text-[#60A5FA] transition">Prices & Services</Link>
              <Link to="/about" className="hover:text-[#60A5FA] transition">About us</Link>
              <Link to="/business" className="hover:text-[#60A5FA] transition">For business</Link>
            </>
          )}
          
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleUserDropdown}
                className="flex items-center space-x-2 focus:outline-none"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#008080]"
                  />
                ) : (
                  getDefaultProfileIcon()
                )}
              </button>
              {userDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-2 text-sm font-semibold text-gray-900 border-b border-gray-200">
                    {user.name || user.email.split('@')[0]}
                  </div>
                  <Link
                    to="/how-it-works"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    How it works
                  </Link>
                  <Link
                    to="/prices"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Prices & Services
                  </Link>
                  <Link
                    to="/about"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    About us
                  </Link>
                  <Link
                    to="/business"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    For business
                  </Link>
                  <Link
                    to="/my-orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/repeat-orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Repeat Orders
                  </Link>
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Account
                  </Link>
                  <Link
                    to="/help-center"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Help Center
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          {!user && (
            <Link to="/login" className="hover:text-[#60A5FA] transition">Log in</Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;