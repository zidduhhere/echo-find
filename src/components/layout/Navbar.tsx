import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <nav className="bg-transparent text-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="bg-black rounded-2xl px-6 py-3 shadow-lg">
                    {/* Desktop Navbar */}
                    <DesktopNavbar
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        onSearchSubmit={handleSearch}
                    />

                    {/* Mobile Navbar */}
                    <MobileNavbar
                        isMobileMenuOpen={isMobileMenuOpen}
                        onToggleMobileMenu={toggleMobileMenu}
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        onSearchSubmit={handleSearch}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
