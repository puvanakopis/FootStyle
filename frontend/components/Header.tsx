"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { MdFavoriteBorder, MdOutlineHiking, MdClose, MdLogin } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch, IoLogOutOutline, IoPersonOutline } from "react-icons/io5";
import { FaRegUser } from 'react-icons/fa6';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { showToast } from '@/utils/toast';

const Header = () => {
  const { user, isAuthenticated, logout, isLoading: authLoading } = useAuth();
  const { cart, fetchCart } = useCart();
  const { wishlist, fetchWishlist } = useWishlist();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInitialized && isAuthenticated) {
      fetchCart();
      fetchWishlist();
      setIsInitialized(true);
    }
  }, [isAuthenticated, fetchCart, fetchWishlist, isInitialized]);

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

  const getCartItemCount = () => {
    if (!cart?.items || cart.items.length === 0) return 0;
    return cart.items.reduce((total: number, item) => {
      const itemQty = item.variants?.reduce((sum: number, v) => sum + (v.quantity || 0), 0) ?? 0;
      return total + itemQty;
    }, 0);
  };

  const handleLogout = async () => {
    try {
      await logout();
      showToast('success', 'Logged out successfully!');
      setShowUserMenu(false);
      setShowMobileMenu(false);
    } catch (error) {
      showToast('error', 'Failed to logout. Please try again.');
      console.error('Logout error:', error);
    }
  };

  const handleSearchClick = () => setShowSearchPopup(!showSearchPopup);
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  const getUserDisplayName = () => {
    if (user) return user.firstName || 'User';
    return 'Guest';
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <>
      {/* Main Floating Light Glass Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-xl transition-all duration-300 shadow-xs">
        <div className="layout-container flex w-full justify-center">
          <div className="flex w-full max-w-[1280px] items-center justify-between px-4 py-3.5 md:px-8">

            {/* Logo Brand */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="group flex items-center gap-3.5"
                onClick={() => {
                  setShowMobileMenu(false);
                  setShowUserMenu(false);
                }}
              >
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#ee2b4b] to-[#ff4b6b] text-white shadow-lg shadow-[#ee2b4b]/25 group-hover:scale-105 transition-transform duration-300">
                  <MdOutlineHiking className="text-[24px]" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-[#ee2b4b] transition-colors">
                    FOOT<span className="text-[#ee2b4b]">STYLE</span>
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Street & Luxury Drops</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 rounded-full border border-slate-200/80 bg-slate-100/60 px-4 py-1.5 backdrop-blur-md">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 hover:bg-white rounded-full transition-all duration-200 group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#ee2b4b] rounded-full group-hover:w-1/2 transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Action Bar */}
            <div className="flex items-center gap-3">

              {/* Instant Search Popup */}
              <div className="relative hidden md:block" ref={searchRef}>
                <button
                  onClick={handleSearchClick}
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-100/60 text-slate-700 hover:border-[#ee2b4b]/50 hover:bg-[#ee2b4b]/10 hover:text-[#ee2b4b] transition-all duration-300"
                  aria-label="Search"
                >
                  <IoSearch className="text-lg transition-transform group-hover:scale-110" />
                </button>

                {showSearchPopup && (
                  <div className="absolute right-0 top-13 w-80 md:w-96 p-4 rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="relative w-full group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#ee2b4b]">
                        <IoSearch className="text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search drops, sneakers, brands..."
                        autoFocus
                        className="block w-full pl-10 pr-4 py-2.5 border border-slate-200/80 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ee2b4b] focus:ring-1 focus:ring-[#ee2b4b] text-xs font-medium transition-all"
                      />
                    </div>

                    {/* Quick Trending Suggestions */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                        <span>Trending Searches</span>
                        <span className="text-[#ee2b4b]">Live Drop</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {['Air Jordan 1 High', 'Yeezy Boost 350', 'Nike Dunk Low', 'UltraBoost', 'Court Vision'].map((item, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-slate-100 hover:bg-[#ee2b4b]/10 hover:text-[#ee2b4b] text-slate-700 text-xs font-medium rounded-lg border border-slate-200/80/60 cursor-pointer transition-all duration-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Favorites / Wishlist */}
              <div className="hidden md:block">
                <Link
                  href="/wishlist"
                  className="relative group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-100/60 text-slate-700 hover:border-[#ee2b4b]/50 hover:bg-[#ee2b4b]/10 hover:text-[#ee2b4b] transition-all duration-300"
                  aria-label="Wishlist"
                >
                  <MdFavoriteBorder className="text-lg group-hover:scale-110 transition-transform" />
                  {wishlist && wishlist.length > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#ee2b4b] text-[10px] font-extrabold text-white shadow-md shadow-[#ee2b4b]/40 animate-pulse">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              </div>

              {/* Cart */}
              <div className="hidden md:block">
                <Link
                  href="/cart"
                  className="relative group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-100/60 text-slate-700 hover:border-[#ee2b4b]/50 hover:bg-[#ee2b4b]/10 hover:text-[#ee2b4b] transition-all duration-300"
                  aria-label="Cart"
                >
                  <FiShoppingCart className="text-lg group-hover:scale-110 transition-transform" />
                  {cart && getCartItemCount() > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#ee2b4b] text-[10px] font-extrabold text-white shadow-md shadow-[#ee2b4b]/40">
                      {getCartItemCount()}
                    </span>
                  )}
                </Link>
              </div>

              {/* User Account Menu */}
              <div className="relative hidden md:block" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-100/60 text-slate-700 hover:border-[#ee2b4b]/50 hover:bg-[#ee2b4b]/10 hover:text-[#ee2b4b] transition-all duration-300"
                  aria-label="User menu"
                >
                  <FaRegUser className="text-lg group-hover:scale-110 transition-transform" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-13 w-56 rounded-2xl border border-slate-200/80 bg-white/95 p-2 backdrop-blur-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                    {isAuthenticated ? (
                      <>
                        <div className="px-3.5 py-3 border-b border-slate-200/80 bg-slate-50 rounded-xl mb-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                            <span className="text-[10px] font-extrabold tracking-widest text-[#ee2b4b] uppercase">VIP SNEAKERHEAD</span>
                          </div>
                          <p className="text-xs font-bold text-slate-900 truncate">{getUserDisplayName()}</p>
                          {user?.email && <p className="text-[11px] text-slate-500 truncate">{user.email}</p>}
                        </div>

                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <IoPersonOutline className="text-base text-[#ee2b4b]" /> My Profile
                        </Link>
                        <Link
                          href="/cart"
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiShoppingCart className="text-base text-[#ee2b4b]" /> My Cart
                          {cart && getCartItemCount() > 0 && (
                            <span className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#ee2b4b] text-[10px] font-extrabold text-white">
                              {getCartItemCount()}
                            </span>
                          )}
                        </Link>
                        <Link
                          href="/wishlist"
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <MdFavoriteBorder className="text-base text-[#ee2b4b]" /> Wishlist
                          {wishlist && wishlist.length > 0 && (
                            <span className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#ee2b4b] text-[10px] font-extrabold text-white">
                              {wishlist.length}
                            </span>
                          )}
                        </Link>
                        <button
                          onClick={handleLogout}
                          disabled={authLoading}
                          className="flex w-full items-center gap-3 px-3.5 py-2.5 mt-1 border-t border-slate-200/80 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <IoLogOutOutline className="text-base" />
                          {authLoading ? 'Logging out...' : 'Logout'}
                        </button>
                      </>
                    ) : (
                      <div className="p-2">
                        <p className="px-3 py-2 text-xs font-semibold text-slate-500">Welcome to FootStyle!</p>
                        <Link
                          href="/login"
                          className="flex w-full items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-white bg-[#ee2b4b] hover:bg-[#ff3b5c] rounded-xl transition-colors justify-center mb-1.5 shadow-md shadow-[#ee2b4b]/30"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <MdLogin className="text-base" /> Login
                        </Link>
                        <Link
                          href="/signup"
                          className="flex items-center justify-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 rounded-xl transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Register Account
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-100 text-slate-700 hover:bg-slate-200 md:hidden"
                aria-label="Toggle Menu"
              >
                {showMobileMenu ? <MdClose className="text-xl" /> : <IoIosMenu className="text-xl" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {showMobileMenu && (
          <div className="border-b border-slate-200/80 bg-white/95 px-6 py-6 md:hidden backdrop-blur-xl animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-sm font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-2 border-t border-slate-200/80" />

              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/wishlist"
                  className="flex items-center justify-center gap-2 p-3 text-xs font-bold bg-slate-100 text-slate-700 rounded-xl"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <MdFavoriteBorder className="text-base text-[#ee2b4b]" /> Wishlist ({wishlist?.length || 0})
                </Link>
                <Link
                  href="/cart"
                  className="flex items-center justify-center gap-2 p-3 text-xs font-bold bg-slate-100 text-slate-700 rounded-xl"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <FiShoppingCart className="text-base text-[#ee2b4b]" /> Cart ({getCartItemCount()})
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;