"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { MdFavoriteBorder, MdOutlineHiking, MdClose, MdLogin } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch, IoLogOutOutline, IoPersonOutline } from "react-icons/io5";
import { FaRegUser } from 'react-icons/fa6';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) setShowUserMenu(false);
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) setShowSearchPopup(false);
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) setShowMobileMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [showMobileMenu]);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setShowMobileMenu(false);
  };

  const handleSearchClick = () => setShowSearchPopup(!showSearchPopup);
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  const getUserDisplayName = () => {
    if (user) return user.name || user.email?.split('@')[0] || 'User';
    return 'Guest';
  };

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#f3e7e9] bg-[#f8f6f6]/95 backdrop-blur-sm">
        <div className="layout-container flex w-full justify-center">
          <div className="flex w-full max-w-[1280px] items-center justify-between px-4 py-4 md:px-10">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ee2b4b]/10 text-[#ee2b4b]">
                  <MdOutlineHiking className="text-[24px]" />
                </div>
                <h2 className="text-xl font-bold leading-tight tracking-tight">FootStyle</h2>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {['/', '/products', '/about', '/contact'].map((link, i) => (
                <Link
                  key={i}
                  href={link}
                  className="text-sm font-medium hover:text-[#ee2b4b] transition-colors"
                >
                  {link === '/' ? 'Home' : link.replace('/', '').charAt(0).toUpperCase() + link.slice(2)}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">

              {/* Search */}
              <div className="relative hidden md:block" ref={searchRef}>
                <button
                  onClick={handleSearchClick}
                  className="group flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e7e9] hover:bg-[#ee2b4b]/20 transition-colors"
                >
                  <IoSearch className="text-lg group-hover:text-[#ee2b4b]" />
                </button>

                {showSearchPopup && (
                  <div className="absolute right-0 top-12 w-80 md:w-96 p-2 rounded-lg border border-[#f3e7e9] bg-white shadow-lg z-50">
                    <div className="relative w-full group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IoSearch className="text-slate-400 group-focus-within:text-[#ee2b4b]" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search shoes..."
                        autoFocus
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#ee2b4b] focus:border-[#ee2b4b] sm:text-sm transition-all"
                      />
                    </div>

                    {/* Recent Searches */}
                    <div className="mt-3 px-2">
                      <p className="text-xs font-medium text-gray-500 mb-2">Recent Searches</p>
                      <div className="flex flex-wrap gap-2">
                        {['Running Shoes', 'Sneakers', 'Boots'].map((item, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer transition-colors">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Favorites */}
              <div className="hidden md:block">
                <button className="relative group flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e7e9] hover:bg-[#ee2b4b]/20 transition-colors">
                  <MdFavoriteBorder className="text-lg group-hover:text-[#ee2b4b]" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ee2b4b] text-[10px] font-bold text-white">4</span>
                </button>
              </div>

              {/* Cart */}
              <div className="hidden md:block">
                <button className="relative group flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e7e9] hover:bg-[#ee2b4b]/20 transition-colors">
                  <FiShoppingCart className="text-lg group-hover:text-[#ee2b4b]" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ee2b4b] text-[10px] font-bold text-white">2</span>
                </button>
              </div>

              {/* User */}
              <div className="relative hidden md:block" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="group flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e7e9] hover:bg-[#ee2b4b]/20 transition-colors"
                >
                  <FaRegUser className="text-lg group-hover:text-[#ee2b4b]" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-12 w-48 rounded-lg border border-[#f3e7e9] bg-white p-2 shadow-lg z-50">
                    {isAuthenticated ? (
                      <>
                        {/* User Info Box with scroll */}
                        <div className="px-3 py-2 border-b border-[#f3e7e9] max-h-16 overflow-auto">
                          <p className="text-sm font-semibold text-gray-800 truncate">{getUserDisplayName()}</p>
                          {user?.email && <p className="text-xs text-gray-500 truncate">{user.email}</p>}
                        </div>

                        {/* Links */}
                        <Link href="/profile" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-[#f8f6f6] hover:text-[#ee2b4b]" onClick={() => setShowUserMenu(false)}>
                          <IoPersonOutline className="text-base" /> My Profile
                        </Link>
                        <Link href="/cart" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-[#f8f6f6] hover:text-[#ee2b4b]" onClick={() => setShowUserMenu(false)}>
                          <FiShoppingCart className="text-base" /> My Cart
                        </Link>
                        <Link href="/wishlist" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-[#f8f6f6] hover:text-[#ee2b4b]" onClick={() => setShowUserMenu(false)}>
                          <MdFavoriteBorder className="text-base" /> Wishlist
                        </Link>
                        <button
                          onClick={handleLogout}
                          disabled={isLoading}
                          className="flex w-full items-center gap-3 px-3 py-2 mt-2 border-t border-[#f3e7e9] text-sm text-gray-700 hover:bg-[#f8f6f6] hover:text-[#ee2b4b]"
                        >
                          <IoLogOutOutline className="text-base" /> {isLoading ? 'Logging out...' : 'Logout'}
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="px-3 py-2 text-sm text-gray-600">Welcome to FootStyle!</p>
                        <Link href="/login" className="flex w-full items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-[#f8f6f6] hover:text-[#ee2b4b]" onClick={() => setShowUserMenu(false)}>
                          <MdLogin className="text-base" /> Login / Register
                        </Link>
                        <Link href="/guest-checkout" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-[#f8f6f6] hover:text-[#ee2b4b]" onClick={() => setShowUserMenu(false)}>
                          <FiShoppingCart className="text-base" /> Continue as Guest
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu */}
              <button onClick={toggleMobileMenu} className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e7e9] hover:bg-[#ee2b4b]/20 transition-colors">
                <IoIosMenu className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Side Menu */}
      {showMobileMenu && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setShowMobileMenu(false)} />
          <div ref={mobileMenuRef} className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl md:hidden">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#f3e7e9]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ee2b4b]/10 text-[#ee2b4b]">
                    <MdOutlineHiking className="text-[24px]" />
                  </div>
                  <h2 className="text-xl font-bold">FootStyle</h2>
                </div>
                <button onClick={() => setShowMobileMenu(false)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e7e9] hover:bg-[#ee2b4b]/20 transition-colors">
                  <MdClose className="text-xl" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 p-6 overflow-y-auto">
                {['/', '/shop', '/about', '/contact'].map((link, i) => (
                  <Link
                    key={i}
                    href={link}
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-800 rounded-lg hover:bg-[#f8f6f6] hover:text-[#ee2b4b]"
                  >
                    {link === '/' ? 'Home' : link.replace('/', '').charAt(0).toUpperCase() + link.slice(2)}
                  </Link>
                ))}

                {isAuthenticated && (
                  <div className="mt-8 pt-6 border-t border-[#f3e7e9]">
                    <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      My Account
                    </p>
                    <Link href="/cart" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-[#f8f6f6] hover:text-[#ee2b4b]">
                      <FiShoppingCart className="text-lg" /> My Cart
                    </Link>
                    <Link href="/wishlist" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-[#f8f6f6] hover:text-[#ee2b4b]">
                      <MdFavoriteBorder className="text-lg" /> Wishlist
                      <span className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#ee2b4b] text-[10px] font-bold text-white">4</span>
                    </Link>
                  </div>
                )}
              </nav>

              {/* Footer / User Auth */}
              <div className="p-6 border-t border-[#f3e7e9]">
                <div className="px-4 py-2 border-b border-[#f3e7e9] max-h-16 overflow-auto">
                  {isAuthenticated ? (
                    <>
                      <p className="text-sm font-semibold text-gray-800 truncate">{getUserDisplayName()}</p>
                      {user?.email && <p className="text-xs text-gray-500 truncate">{user.email}</p>}
                    </>
                  ) : (
                    <p className="text-gray-600 truncate">Welcome to FootStyle!</p>
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