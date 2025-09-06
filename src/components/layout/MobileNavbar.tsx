import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search, MapPin, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Logo } from '../ui/Logo';

interface MobileNavbarProps {
    isMobileMenuOpen: boolean;
    onToggleMobileMenu: () => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onSearchSubmit: (e: React.FormEvent) => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
    isMobileMenuOpen,
    onToggleMobileMenu,
    searchQuery,
    onSearchChange,
    onSearchSubmit
}) => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const location = useLocation();
    const navigate = useNavigate();

    // Calculate cart item count more safely
    const cartItemCount = cart && Array.isArray(cart)
        ? cart.reduce((total, item) => total + (typeof item.quantity === 'number' ? item.quantity : 1), 0)
        : 0;

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const isActivePath = (path: string) => {
        return location.pathname === path;
    };

    const closeMobileMenu = () => {
        onToggleMobileMenu();
    };

    return (
        <>
            {/* Mobile Logo and Menu Button */}
            <div className="md:hidden flex justify-between items-center w-full">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                        <Logo size="sm" variant="light" />
                    </div>

                </Link>

                {/* Mobile menu button */}
                <button
                    onClick={onToggleMobileMenu}
                    className="p-2 rounded-full bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop/Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={closeMobileMenu}
                    />

                    {/* Right Side Drawer */}
                    <div className={`fixed top-0 right-0 h-screen w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}>
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                                    <Logo size="sm" variant="light" />
                                </div>
                                <span className="text-lg font-bold text-gray-900">Menu</span>
                            </div>
                            <button
                                onClick={closeMobileMenu}
                                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Drawer Content */}
                        <div className="flex flex-col h-full">


                            {/* Navigation Links */}
                            <div className="flex-1 px-6 py-6 overflow-y-auto">
                                <div className="space-y-2">
                                    {/* Home Link */}
                                    <Link
                                        to="/"
                                        onClick={closeMobileMenu}
                                        className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActivePath('/')
                                            ? 'bg-primary-600 text-white shadow-md'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                    >
                                        Home
                                    </Link>

                                    {/* Delivery Address */}
                                    <div className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200">
                                        <MapPin className="w-4 h-4 mr-3" />
                                        <div>
                                            <div className="text-xs text-gray-500">Deliver to</div>
                                            <div>New York, 10001</div>
                                        </div>
                                    </div>

                                    {/* Returns & Orders */}
                                    <Link
                                        to="/orders"
                                        onClick={closeMobileMenu}
                                        className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActivePath('/orders')
                                            ? 'bg-primary-600 text-white shadow-md'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                    >
                                        <Package className="w-4 h-4 mr-3" />
                                        Returns & Orders
                                    </Link>

                                    {/* Cart Link - available to all users */}
                                    <Link
                                        to="/cart"
                                        onClick={closeMobileMenu}
                                        className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActivePath('/cart')
                                            ? 'bg-primary-600 text-white shadow-md'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                    >
                                        <ShoppingCart className="w-4 h-4 mr-3" />
                                        Cart
                                        {cartItemCount > 0 && (
                                            <span className="ml-auto bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                                                {cartItemCount}
                                            </span>
                                        )}
                                    </Link>

                                    {/* Profile Link - available to all users */}
                                    <Link
                                        to="/profile"
                                        onClick={closeMobileMenu}
                                        className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActivePath('/profile')
                                            ? 'bg-primary-600 text-white shadow-md'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                    >
                                        <User className="w-4 h-4 mr-3" />
                                        Profile
                                    </Link>
                                </div>
                            </div>

                            {/* Bottom Actions */}
                            <div className="p-4 mb-24 border-t border-gray-200 bg-white">
                                {user ? (
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            closeMobileMenu();
                                        }}
                                        className="w-full px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors border border-red-300 hover:border-red-400"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <div className="space-y-3">
                                        <Link
                                            to="/login"
                                            onClick={closeMobileMenu}
                                            className="block w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 transition-colors border border-gray-300 hover:border-gray-400 text-center"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={closeMobileMenu}
                                            className="block w-full px-4 py-3 rounded-xl text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors text-center shadow-md"
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default MobileNavbar;
