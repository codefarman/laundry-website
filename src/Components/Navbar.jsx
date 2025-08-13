import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    updateUser();

    window.addEventListener('userLogin', updateUser);
    window.addEventListener('userLogout', updateUser);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('userLogin', updateUser);
      window.removeEventListener('userLogout', updateUser);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('userLogout'));
    setUserDropdownOpen(false);
    setMenuOpen(false);
    navigate('/');
  };

  const toggleUserDropdown = (event) => {
    event.stopPropagation();
    setUserDropdownOpen(!userDropdownOpen);
  };

  const getDefaultProfileIcon = () => (
    <svg
      className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 p-1 border-2 border-[#008080]"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
        1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 
        1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out 
        ${
          isScrolled
            ? 'bg-white text-gray-900 shadow-md py-4'
            : `${
                isHome ? ' md:bg-[#017C80]' : 'bg-[#017C80]'
              } text-white py-10`
        }`}
    >
      <header className="flex items-center justify-between px-6 sm:px-10 md:px-16 max-w-[1440px] mx-auto">
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

        {/* Desktop Buttons/User Info */}
        <div className="hidden md:flex items-center space-x-6 font-medium text-sm">
          {user ? (
            <>
              <Link
                to="/booking"
                className={`px-5 py-2 rounded-md text-black ${isScrolled ? 'bg-[#F4B400] hover:bg-[rgb(280,200,0)]' : 'bg-white text-black'
                  }`}
              >
                Book now
              </Link>
              <div className="relative" ref={dropdownRef}>
                <button onClick={toggleUserDropdown} className="flex items-center space-x-2">
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
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-[1000] pointer-events-auto">
                    <div className="px-4 py-2 text-sm font-semibold text-gray-900 border-b border-gray-200">
                      {user.name || user.email?.split('@')[0]}
                    </div>
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-[#008080] font-bold hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUserDropdownOpen(false);
                      }}
                    >
                      Account
                    </Link>
                    <Link
                      to="/my-orders"
                      className="block px-4 py-2 text-sm text-[#008080] font-bold hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUserDropdownOpen(false);
                      }}
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/repeat-orders"
                      className="block px-4 py-2 text-sm text-[#008080] font-bold hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUserDropdownOpen(false);
                      }}
                    >
                      Repeat Orders
                    </Link>
                    <Link
                      to="/help-center"
                      className="block px-4 py-2 text-sm text-[#008080] font-bold hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUserDropdownOpen(false);
                      }}
                    >
                      Help Center
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 font-bold hover:bg-gray-100"
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
                className={`px-5 py-2 rounded-md text-black ${isScrolled ? 'bg-[#F4B400] hover:bg-[rgb(280,200,0)]' : 'bg-white text-black'
                  }`}
              >
                Book now
              </Link>
              <Link to="/login" className="hover:text-[#60A5FA]">Log in</Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleUserDropdown} className="flex items-center space-x-2">
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
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-[1000] pointer-events-auto">
                  <div className="px-4 py-2 text-sm font-semibold text-gray-900 border-b border-gray-200">
                    {user.name || user.email?.split('@')[0]}
                  </div>
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-[#008080] font-bold hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserDropdownOpen(false);
                    }}
                  >
                    Account
                  </Link>
                  <Link
                    to="/my-orders"
                    className="block px-4 py-2 text-sm text-[#008080] font-bold hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserDropdownOpen(false);
                    }}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/repeat-orders"
                    className="block px-4 py-2 text-sm text-[#008080] font-bold hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserDropdownOpen(false);
                    }}
                  >
                    Repeat Orders
                  </Link>
                  <Link
                    to="/help-center"
                    className="block px-4 py-2 text-sm text-[#008080] font-bold hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserDropdownOpen(false);
                    }}
                  >
                    Help Center
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 font-bold hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* Mobile Menu for non-logged in */}
      {menuOpen && !user && (
        <div className={`md:hidden flex flex-col space-y-4 px-6 pb-6 ${isScrolled ? 'bg-white text-gray-900' : 'bg-gradient-to-b from-black/70 via-black/50 to-black/70 text-white'}`}>
          <Link to="/login" className={`px-5 py-2 rounded-md mt-2 text-black ${isScrolled ? 'bg-[#F4B400]' : 'bg-gradient-to-b from-black/70 via-black/50 to-black/70 text-white'}`}>Log in</Link>
          <Link to="/how-it-works" className="hover:text-[#60A5FA]">How it works</Link>
          <Link to="/prices" className="hover:text-[#60A5FA]">Prices & Services</Link>
          <Link to="/about" className="hover:text-[#60A5FA]">About us</Link>
          <Link to="/business" className="hover:text-[#60A5FA]">For business</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;