import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, MapPin, ChevronDown, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import SearchBar from '../ui/SearchBar';
import { Logo } from '../ui/Logo';

interface DesktopNavbarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onSearchSubmit: (e: React.FormEvent) => void;
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
    searchQuery = '',
    onSearchChange = () => { },
    onSearchSubmit = () => { }
}) => {
    const { user } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();
    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

    // Calculate cart item count more safely
    const cartItemCount = cart && Array.isArray(cart)
        ? cart.reduce((total, item) => total + (typeof item.quantity === 'number' ? item.quantity : 1), 0)
        : 0;

    const handleSearchChange = (value: string) => {
        setLocalSearchQuery(value);
        onSearchChange(value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearchSubmit(e);

        // If no external submit handler is provided, handle navigation here
        if (onSearchSubmit === (() => { })) {
            if (localSearchQuery.trim()) {
                navigate(`/search?q=${encodeURIComponent(localSearchQuery.trim())}`);
            }
        }
    };

    return (
        <div className="hidden md:flex justify-between items-center w-full">
            <div className="flex items-center space-x-8">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                        <Logo size="sm" variant="light" />
                    </div>
                    <span className="text-xl font-bold text-white">EcoFinds</span>
                </Link>

                {/* Address Selection */}
                <div className="hidden lg:flex items-center text-white cursor-pointer hover:text-primary-300">
                    <MapPin className="w-5 h-5 mr-1" />
                    <div>
                        <div className="text-xs text-gray-300">Deliver to</div>
                        <div className="text-sm font-medium flex items-center">
                            New York, 10001
                            <ChevronDown className="w-3 h-3 ml-1" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4">
                <SearchBar
                    value={localSearchQuery}
                    onChange={handleSearchChange}
                    onSubmit={handleSearchSubmit}
                    placeholder="Search eco-friendly products..."
                    variant="navbar"
                    size="md"
                    showActions={true}
                    className="w-full"
                />
            </div>

            {/* Desktop Actions */}
            <div className="flex items-center space-x-5">
                {/* Country Selection */}
                <div className="hidden lg:flex items-center text-white cursor-pointer hover:text-primary-300">
                    <span className="text-lg font-semibold mr-1">🇺🇸</span>
                    <ChevronDown className="w-3 h-3" />
                </div>

                {/* Auth actions */}
                <div className="hidden lg:block">
                    {user ? (
                        <div className="text-white cursor-pointer hover:text-primary-300">
                            <div className="text-xs">Hello, {user.email ? user.email.split('@')[0] : 'User'}</div>
                            <div className="text-sm font-medium flex items-center">
                                Account & Lists
                                <ChevronDown className="w-3 h-3 ml-1" />
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="text-white hover:text-primary-300">
                            <div className="text-xs">Hello, Sign in</div>
                            <div className="text-sm font-medium flex items-center">
                                Account & Lists
                                <ChevronDown className="w-3 h-3 ml-1" />
                            </div>
                        </Link>
                    )}
                </div>

                {/* Returns & Orders */}
                <Link to="/orders" className="hidden lg:block text-white hover:text-primary-300">
                    <div className="text-xs">Returns</div>
                    <div className="text-sm font-medium flex items-center">
                        & Orders
                        <Package className="w-4 h-4 ml-1" />
                    </div>
                </Link>

                {/* Cart */}
                <Link
                    to="/cart"
                    className="relative flex items-center text-white hover:text-primary-300"
                >
                    <div className="relative">
                        <ShoppingCart className="w-6 h-6" />
                        {cartItemCount > 0 && (
                            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                                3
                            </div>
                        )}
                    </div>
                    <span className="ml-1 hidden lg:inline font-medium">Cart</span>
                </Link>

                {/* User Profile */}
                <Link
                    to="/profile"
                    className="text-white hover:text-primary-300"
                >
                    <User className="w-6 h-6" />
                    <span className="sr-only">Profile</span>
                </Link>
            </div>
        </div>
    );
};

export default DesktopNavbar;
