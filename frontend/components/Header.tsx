"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { MdFavoriteBorder, MdOutlineHiking, MdClose, MdLogin } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch, IoLogOutOutline, IoPersonOutline } from "react-icons/io5";
import { FaRegUser } from 'react-icons/fa6';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Effect for handling clicks outside dropdown menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close user menu if clicked outside
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      // Close search popup if clicked outside
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchPopup(false);
      }
      // Close mobile menu if clicked outside
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Effect for preventing body scroll when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileMenu]);

  // Handler for login action
  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowUserMenu(false);
  };

  // Handler for logout action
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowUserMenu(false);
  };

  // Handler for search button click
  const handleSearchClick = () => {
    setShowSearchPopup(!showSearchPopup);
  };

  // Handler for toggling mobile menu
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <>
      {/* ----------- Main Header ----------- */}
      <header className="sticky top-0 z-50 w-full border-b border-[#f3e7e9] bg-[#f8f6f6]/95 backdrop-blur-sm">
        <div className="layout-container flex w-full justify-center">
          <div className="flex w-full max-w-[1280px] items-center justify-between px-4 py-4 md:px-10">
            
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ee2b4b]/10 text-[#ee2b4b]">
                  <span className="material-symbols-outlined text-[24px]"><MdOutlineHiking /></span>
                </div>
                <h2 className="text-xl font-bold leading-tight tracking-tight">FootStyle</h2>
              </Link>
            </div>

            {/* Desktop Navigation Menu */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium hover:text-[#ee2b4b] transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-sm font-medium hover:text-[#ee2b4b] transition-colors">
                Products
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-[#ee2b4b] transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-[#ee2b4b] transition-colors">
                Contact
              </Link>
            </nav>

            {/* Action Buttons Section */}
            <div className="flex items-center gap-4 ">
              {/* Search Button and Popup */}
              <div className="relative hidden md:block" ref={searchRef}>
                <button 
                  onClick={handleSearchClick}
                  className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#f3e7e9] transition-colors hover:bg-[#ee2b4b]/20"
                  aria-label="Search"
                >
                  <span className="material-symbols-outlined text-lg group-hover:text-[#ee2b4b]"><IoSearch /></span>
                </button>

                {/* Search Popup */}
                {showSearchPopup && (
                  <div className="absolute right-0 top-12 w-80 md:w-96 p-2 rounded-lg border border-[#f3e7e9] bg-white shadow-lg z-50">
                    <div className="relative w-full group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400 group-focus-within:text-[#ee2b4b]">
                          <IoSearch />
                        </span>
                      </div>
                      <input
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-surface-light placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#ee2b4b] focus:border-[#ee2b4b] sm:text-sm transition-all"
                        placeholder="Search shoes..."
                        type="text"
                        autoFocus
                      />
                    </div>
                    
                    {/* Recent Searches Section */}
                    <div className="mt-3 px-2">
                      <p className="text-xs font-medium text-gray-500 mb-2">Recent Searches</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer transition-colors">
                          Running Shoes
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer transition-colors">
                          Sneakers
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer transition-colors">
                          Boots
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Favorites Button */}
              <div className='hidden md:block'>
                <button 
                  className="relative group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#f3e7e9] transition-colors hover:bg-[#ee2b4b]/20"
                  aria-label="Favorites"
                >
                  <span className="material-symbols-outlined text-lg group-hover:text-[#ee2b4b]"><MdFavoriteBorder /></span>
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ee2b4b] text-[10px] font-bold text-white">
                    4
                  </span>
                </button>
              </div>
              
              {/* Shopping Cart Button */}
              <div className='hidden md:block'>
                <button 
                  className="relative group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#f3e7e9] transition-colors hover:bg-[#ee2b4b]/20"
                  aria-label="Shopping Cart"
                >
                  <span className="material-symbols-outlined text-lg group-hover:text-[#ee2b4b]"><FiShoppingCart /></span>
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ee2b4b] text-[10px] font-bold text-white">
                    2
                  </span>
                </button>
              </div>
            

              {/* User Profile Button with Dropdown */}
              <div className="relative hidden md:block" ref={userMenuRef}>
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#f3e7e9] transition-colors hover:bg-[#ee2b4b]/20"
                  aria-label="User Profile"
                >
                  <span className="material-symbols-outlined text-lg group-hover:text-[#ee2b4b]">
                    <FaRegUser />
                  </span>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 top-12 w-48 rounded-lg border border-[#f3e7e9] bg-white p-2 shadow-lg z-50">
                    {isLoggedIn ? (
                      <>
                        {/* Profile Information */}
                        <div className="px-3 py-2 border-b border-[#f3e7e9]">
                          <p className="text-sm font-semibold text-gray-800">Puvanakopis</p>
                          <p className="text-xs text-gray-500">puvanakopis@gmail.com</p>
                        </div>
                        
                        {/* Profile Navigation Links */}
                        <Link 
                          href="/profile" 
                          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-[#f8f6f6] hover:text-[#ee2b4b] transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <IoPersonOutline className="text-base" />
                          My Profile
                        </Link>
                        <Link 
                          href="/orders" 
                          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-[#f8f6f6] hover:text-[#ee2b4b] transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiShoppingCart className="text-base" />
                          My Orders
                        </Link>
                        <Link 
                          href="/wishlist" 
                          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-[#f8f6f6] hover:text-[#ee2b4b] transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <MdFavoriteBorder className="text-base" />
                          Wishlist
                        </Link>
                        
                        {/* Logout Button */}
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-[#f8f6f6] hover:text-[#ee2b4b] transition-colors mt-2 border-t border-[#f3e7e9] pt-2"
                        >
                          <IoLogOutOutline className="text-base" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Guest User Options */}
                        <p className="px-3 py-2 text-sm text-gray-600">Welcome to FootStyle!</p>
                        <button
                          onClick={handleLogin}
                          className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-[#f8f6f6] hover:text-[#ee2b4b] transition-colors"
                        >
                          <MdLogin className="text-base" />
                          Login / Register
                        </button>
                        <Link 
                          href="/guest-checkout" 
                          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-[#f8f6f6] hover:text-[#ee2b4b] transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiShoppingCart className="text-base" />
                          Continue as Guest
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button (Visible only on mobile) */}
              <button 
                onClick={toggleMobileMenu}
                className="md:hidden flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#f3e7e9] hover:bg-[#ee2b4b]/20 transition-colors"
                aria-label="Menu"
              >
                <span className="material-symbols-outlined text-lg"><IoIosMenu /></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ----------- Mobile Side Menu ----------- */}
      {showMobileMenu && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setShowMobileMenu(false)}
          />
          
          {/* Side Menu Content */}
          <div 
            ref={mobileMenuRef}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Menu Header with logo and close button */}
              <div className="flex items-center justify-between p-6 border-b border-[#f3e7e9]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ee2b4b]/10 text-[#ee2b4b]">
                    <MdOutlineHiking className="text-[24px]" />
                  </div>
                  <h2 className="text-xl font-bold">FootStyle</h2>
                </div>
                <button 
                  onClick={() => setShowMobileMenu(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e7e9] hover:bg-[#ee2b4b]/20 transition-colors"
                >
                  <MdClose className="text-xl" />
                </button>
              </div>

              {/* Navigation Links Section */}
              <nav className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-1">
                  <Link 
                    href="/" 
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-800 rounded-lg hover:bg-[#f8f6f6] hover:text-[#ee2b4b] transition-colors"
                  >
                    Home
                  </Link>
                  <Link 
                    href="/shop" 
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-800 rounded-lg hover:bg-[#f8f6f6] hover:text-[#ee2b4b] transition-colors"
                  >
                    Shop
                  </Link>
                  <Link 
                    href="/about" 
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-800 rounded-lg hover:bg-[#f8f6f6] hover:text-[#ee2b4b] transition-colors"
                  >
                    About
                  </Link>
                  <Link 
                    href="/contact" 
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-800 rounded-lg hover:bg-[#f8f6f6] hover:text-[#ee2b4b] transition-colors"
                  >
                    Contact
                  </Link>
                </div>

                {/* User Account Section (Visible only when logged in) */}
                {isLoggedIn && (
                  <div className="mt-8 pt-6 border-t border-[#f3e7e9]">
                    <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      My Account
                    </p>
                    <div className="space-y-1">
                      <Link 
                        href="/orders" 
                        onClick={() => setShowMobileMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-[#f8f6f6] hover:text-[#ee2b4b] transition-colors"
                      >
                        <FiShoppingCart className="text-lg" />
                        My Orders
                      </Link>
                      <Link 
                        href="/wishlist" 
                        onClick={() => setShowMobileMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-[#f8f6f6] hover:text-[#ee2b4b] transition-colors"
                      >
                        <MdFavoriteBorder className="text-lg" />
                        Wishlist
                        <span className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#ee2b4b] text-[10px] font-bold text-white">
                          4
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </nav>

              {/* User Authentication Section Footer */}
              <div className="p-6 border-t border-[#f3e7e9]">
                {/* User Information Section */}
                <div className="p-6 border-b border-[#f3e7e9]">
                  {isLoggedIn ? (
                    <>
                      {/* Logged In User Info */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ee2b4b]/10 text-[#ee2b4b]">
                          <FaRegUser className="text-lg" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Puvanakopis</p>
                          <p className="text-xs text-gray-500">puvanakopis@gmail.com</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setShowMobileMenu(false);
                            setShowUserMenu(false);
                          }}
                          className="flex-1 px-4 py-2 text-sm font-medium text-[#ee2b4b] border border-[#ee2b4b] rounded-full hover:bg-[#ee2b4b]/10 transition-colors"
                        >
                          View Profile
                        </button>
                        <button 
                          onClick={handleLogout}
                          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Guest User Options */
                    <div className="text-center">
                      <p className="text-gray-600 mb-4">Welcome to FootStyle!</p>
                      <button 
                        onClick={handleLogin}
                        className="w-full px-4 py-3 text-sm font-medium text-white bg-[#ee2b4b] rounded-full hover:bg-[#ee2b4b]/90 transition-colors"
                      >
                        Login / Register
                      </button>
                      <Link 
                        href="/guest-checkout" 
                        onClick={() => setShowMobileMenu(false)}
                        className="inline-block mt-3 text-sm text-[#ee2b4b] hover:underline"
                      >
                        Continue as Guest
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;