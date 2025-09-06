import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { ProductCard } from '../components/products/ProductCard';
import SearchBar from '../components/ui/SearchBar';
import { Loader, Search } from 'lucide-react';

const SearchPage: React.FC = () => {
    const location = useLocation();
    const { searchQuery, setSearchQuery, searchResults, isSearching } = useSearch();

    // Extract query from URL parameters when the page loads
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('q') || '';
        if (query !== searchQuery) {
            setSearchQuery(query);
        }
    }, [location.search, searchQuery, setSearchQuery]);

    // Update URL when search query changes
    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(location.search);
        params.set('q', searchQuery);
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Results</h1>
                    <div className="max-w-2xl">
                        <SearchBar
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onSubmit={handleSearchSubmit}
                            placeholder="Search eco-friendly products..."
                            variant="default"
                            size="md"
                            showActions={true}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Search Results */}
                {isSearching ? (
                    <div className="flex justify-center items-center min-h-[300px]">
                        <Loader className="w-12 h-12 text-primary-500 animate-spin" />
                    </div>
                ) : searchResults.length > 0 ? (
                    <div>
                        <div className="mb-4 text-gray-600">
                            Found {searchResults.length} results for "{searchQuery}"
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {searchResults.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                ) : searchQuery ? (
                    <div className="text-center py-16">
                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Search className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            We couldn't find any products matching "{searchQuery}". Try checking your spelling or using more general terms.
                        </p>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-gray-500">Enter a search term to find products.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
