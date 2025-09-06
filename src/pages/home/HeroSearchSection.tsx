import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/ui/SearchBar';

const HeroSearchSection: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [isMobile, isSetMobile] = useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            isSetMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div className="bg-transperent  text-white md:p-0 pt-16 pb-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Search Bar */}
                {isMobile && (
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        onSubmit={handleSearch}
                        placeholder="Search products..."
                    />
                )}
            </div>
        </div>
    );
};

export default HeroSearchSection;
