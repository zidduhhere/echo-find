import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, QrCode, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: (e: React.FormEvent) => void;
    onFilterClick?: () => void;
    onQrScanClick?: () => void;
    placeholder?: string;
    className?: string;
    variant?: 'default' | 'hero' | 'navbar';
    size?: 'sm' | 'md' | 'lg';
    showActions?: boolean;
    autoSearch?: boolean; // Automatically search as you type
}

const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange,
    onSubmit,
    onFilterClick,
    onQrScanClick,
    placeholder = "Search products...",
    className = "",
    variant = 'default',
    size = 'md',
    showActions = true,
    autoSearch = false
}) => {
    const [showFilterOverlay, setShowFilterOverlay] = useState(false);
    const [showQrNotification, setShowQrNotification] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { performSearch } = useSearch();

    useEffect(() => {
        // Close filter when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setShowFilterOverlay(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Auto-search effect
    useEffect(() => {
        if (autoSearch && value.trim().length > 2) {
            const debounceTimer = setTimeout(() => {
                performSearch(value);
            }, 300);

            return () => clearTimeout(debounceTimer);
        }
    }, [value, autoSearch, performSearch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(e);
        } else if (value.trim()) {
            // Default behavior if no onSubmit provided
            performSearch(value);
            navigate(`/search?q=${encodeURIComponent(value.trim())}`);
        }
    };

    const handleFilterClick = () => {
        setShowFilterOverlay(prev => !prev);
        if (onFilterClick) onFilterClick();
    };

    const handleQrScanClick = () => {
        setShowQrNotification(true);
        setTimeout(() => setShowQrNotification(false), 3000);
        if (onQrScanClick) onQrScanClick();
    };

    const getVariantStyles = () => {
        switch (variant) {
            case 'hero':
                return "bg-grey-400 border-gray-600 text-black placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500";
            case 'navbar':
                return "bg-grey-400 border-gray-600 text-black placeholder-gray-300 focus:border-primary-500 focus:ring-primary-500";
            default:
                return "bg-white border-gray-400 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500";
        }
    };

    const getSizeStyles = () => {
        const rightPadding = showActions ? "pr-20" : "pr-4";
        switch (size) {
            case 'sm':
                return {
                    container: "py-2",
                    input: `pl-10 ${rightPadding} text-sm`,
                    icon: "w-4 h-4 left-3",
                    actionButton: "w-8 h-8 p-1.5",
                    actionIcon: "w-4 h-4"
                };
            case 'lg':
                return {
                    container: "py-4",
                    input: `pl-12 ${rightPadding} text-lg`,
                    icon: "w-5 h-5 left-4",
                    actionButton: "w-12 h-12 p-2.5",
                    actionIcon: "w-6 h-6"
                };
            default:
                return {
                    container: "py-3",
                    input: `pl-11 ${rightPadding} text-base`,
                    icon: "w-5 h-5 left-3",
                    actionButton: "w-10 h-10 p-2",
                    actionIcon: "w-5 h-5"
                };
        }
    };

    const variantStyles = getVariantStyles();
    const sizeStyles = getSizeStyles();

    return (
        <div className={`relative ${className}`}>
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                    <Search className={`absolute top-1/2 transform -translate-y-1/2 text-black ${sizeStyles.icon}`} />
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        className={`
                            w-full ${sizeStyles.input} ${sizeStyles.container}
                            ${variantStyles}
                            border rounded-xl 
                            focus:outline-none focus:ring-2 
                            transition-colors
                        `}
                        autoComplete="off"
                        role="search"
                    />
                    {showActions && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                            <button
                                type="button"
                                onClick={handleQrScanClick}
                                className={`
                                    ${sizeStyles.actionButton}
                                    text-primary-500 hover:bg-primary-50
                                    rounded-lg
                                    transition-colors duration-200
                                    flex items-center justify-center
                                `}
                            >
                                <QrCode className={sizeStyles.actionIcon} />
                            </button>
                            <button
                                type="button"
                                onClick={handleFilterClick}
                                className={`
                                    ${sizeStyles.actionButton}
                                    text-primary-500 hover:bg-primary-50
                                    ${showFilterOverlay ? 'bg-primary-50' : ''}
                                    rounded-lg
                                    transition-colors duration-200
                                    flex items-center justify-center
                                `}
                            >
                                <Filter className={sizeStyles.actionIcon} />
                            </button>
                        </div>
                    )}
                </div>
            </form>

            {/* QR Code Scanner notification */}
            {showQrNotification && (
                <div className="absolute top-full mt-2 right-0 z-50 bg-white p-4 rounded-xl shadow-lg border border-gray-200 w-72 animate-fade-in">
                    <div className="flex items-start">
                        <div className="mr-3 mt-0.5 text-primary-500">
                            <QrCode className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-medium text-gray-900">Coming Soon!</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                The QR code scanner feature is currently in development and will be available soon.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowQrNotification(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Filter Overlay */}
            {showFilterOverlay && (
                <div
                    ref={filterRef}
                    className="absolute top-full mt-2 right-0 z-40 bg-white p-4 rounded-xl shadow-lg border border-gray-200 w-72 animate-fade-in"
                >
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-lg text-gray-900">Filter Options</h3>
                        <button
                            onClick={() => setShowFilterOverlay(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Price Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="range"
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                                />
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>$0</span>
                                <span>$1000+</span>
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                            <div className="space-y-2">
                                {['Sustainable', 'Recycled', 'Organic', 'Eco-friendly'].map((category) => (
                                    <label key={category} className="flex items-center">
                                        <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500 h-4 w-4" />
                                        <span className="ml-2 text-sm text-gray-700">{category}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Ratings */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ratings</label>
                            <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        className="text-yellow-400 hover:text-yellow-500"
                                    >
                                        ★
                                    </button>
                                ))}
                                <span className="ml-2 text-sm text-gray-600">& Up</span>
                            </div>
                        </div>

                        <button className="w-full py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
