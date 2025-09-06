import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, User, Menu, X, Search, ShoppingCart, Package, LogOut, LogIn } from 'lucide-react';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    const cartItemCount = cart?.length || 0;

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and Main Nav */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="flex items-center">
                                <ShoppingBag className="h-8 w-8 text-primary-600" />
                                <span className="ml-2 text-xl font-bold text-primary-800">EcoFinds</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:ml-8 md:flex md:space-x-8">
                            <Link
                                to="/"
                                className={`${isActive('/') ? 'text-primary-600 border-primary-500' : 'text-gray-500 hover:text-gray-700 border-transparent'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/categories"
                                className={`${isActive('/categories') ? 'text-primary-600 border-primary-500' : 'text-gray-500 hover:text-gray-700 border-transparent'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                            >
                                Categories
                            </Link>
                            <div className="relative group">
                                <button
                                    className={`${location.pathname.startsWith('/category/') ? 'text-primary-600 border-primary-500' : 'text-gray-500 hover:text-gray-700 border-transparent'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Shop
                                </button>
                                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-50">
                                    <div className="py-1">
                                        <Link
                                            to="/category/electronics"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                                        >
                                            Electronics
                                        </Link>
                                        <Link
                                            to="/category/clothing"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                                        >
                                            Clothing
                                        </Link>
                                        <Link
                                            to="/category/home-and-garden"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                                        >
                                            Home & Garden
                                        </Link>
                                        <Link
                                            to="/category/books"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                                        >
                                            Books
                                        </Link>
                                        <Link
                                            to="/category/sports-and-recreation"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                                        >
                                            Sports & Recreation
                                        </Link>
                                        <Link
                                            to="/category/art-and-crafts"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                                        >
                                            Art & Crafts
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <Link
                                to="/about"
                                className={`${isActive('/about') ? 'text-primary-600 border-primary-500' : 'text-gray-500 hover:text-gray-700 border-transparent'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                            >
                                About
                            </Link>
                        </nav>
                    </div>

                    {/* Right Menu Items */}
                    <div className="flex items-center">
                        {/* Search Icon */}
                        <button
                            onClick={toggleSearch}
                            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
                        >
                            <Search className="h-5 w-5" />
                        </button>

                        {/* Cart Icon */}
                        <Link to="/cart" className="ml-2 p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative">
                            <ShoppingCart className="h-5 w-5" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>

                        {/* User Menu */}
                        {user ? (
                            <div className="ml-2 relative">
                                <button
                                    onClick={toggleMenu}
                                    className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
                                >
                                    <User className="h-5 w-5" />
                                </button>

                                {isMenuOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1">
                                        <Link
                                            to="/dashboard"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            to="/purchase-history"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <Package className="h-4 w-4 mr-2" />
                                            Purchase History
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <LogOut className="h-4 w-4 mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="ml-2 p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 flex items-center"
                            >
                                <LogIn className="h-5 w-5 mr-1" />
                                <span className="hidden sm:inline text-sm">Login</span>
                            </Link>
                        )}

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden ml-2">
                            <button
                                onClick={toggleMenu}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
                            >
                                {isMenuOpen ? (
                                    <X className="block h-6 w-6" />
                                ) : (
                                    <Menu className="block h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link
                            to="/"
                            className={`${isActive('/') ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'} block pl-3 pr-4 py-2 border-l-4 ${isActive('/') ? 'border-primary-500' : 'border-transparent'} text-base font-medium`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/categories"
                            className={`${isActive('/categories') ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'} block pl-3 pr-4 py-2 border-l-4 ${isActive('/categories') ? 'border-primary-500' : 'border-transparent'} text-base font-medium`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Categories
                        </Link>

                        {/* Category Links */}
                        <div className="pl-3 pr-4 py-2 border-l-4 border-transparent">
                            <div className="text-sm font-medium text-gray-500 mb-2">Shop by Category</div>
                            <div className="space-y-1 pl-2">
                                <Link
                                    to="/category/electronics"
                                    className="block py-1 text-gray-700 hover:text-primary-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Electronics
                                </Link>
                                <Link
                                    to="/category/clothing"
                                    className="block py-1 text-gray-700 hover:text-primary-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Clothing
                                </Link>
                                <Link
                                    to="/category/home-and-garden"
                                    className="block py-1 text-gray-700 hover:text-primary-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home & Garden
                                </Link>
                                <Link
                                    to="/category/books"
                                    className="block py-1 text-gray-700 hover:text-primary-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Books
                                </Link>
                                <Link
                                    to="/category/sports-and-recreation"
                                    className="block py-1 text-gray-700 hover:text-primary-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sports & Recreation
                                </Link>
                                <Link
                                    to="/category/art-and-crafts"
                                    className="block py-1 text-gray-700 hover:text-primary-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Art & Crafts
                                </Link>
                            </div>
                        </div>

                        <Link
                            to="/about"
                            className={`${isActive('/about') ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'} block pl-3 pr-4 py-2 border-l-4 ${isActive('/about') ? 'border-primary-500' : 'border-transparent'} text-base font-medium`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>

                        {/* User-specific links */}
                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className={`${isActive('/dashboard') ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'} block pl-3 pr-4 py-2 border-l-4 ${isActive('/dashboard') ? 'border-primary-500' : 'border-transparent'} text-base font-medium`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/purchase-history"
                                    className={`${isActive('/purchase-history') ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'} block pl-3 pr-4 py-2 border-l-4 ${isActive('/purchase-history') ? 'border-primary-500' : 'border-transparent'} text-base font-medium flex items-center`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Package className="h-4 w-4 mr-2" />
                                    Purchase History
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full text-left text-gray-700 hover:bg-gray-50 pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className={`${isActive('/login') ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'} block pl-3 pr-4 py-2 border-l-4 ${isActive('/login') ? 'border-primary-500' : 'border-transparent'} text-base font-medium flex items-center`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <LogIn className="h-4 w-4 mr-2" />
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {/* Search Overlay */}
            {isSearchOpen && (
                <div className="absolute top-0 left-0 w-full bg-white p-4 shadow-md z-50">
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search for eco-friendly products..."
                            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <button
                            onClick={toggleSearch}
                            className="ml-2 p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
