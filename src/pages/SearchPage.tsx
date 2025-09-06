import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { ProductCard } from '../components/products/ProductCard';
import { Search } from 'lucide-react';

const SearchPage: React.FC = () => {
    const { searchQuery, setSearchQuery, searchResults, isSearching } = useSearch();
    const location = useLocation();

    // Extract search query from URL on initial load
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const urlQuery = queryParams.get('q');

        if (urlQuery && urlQuery !== searchQuery) {
            setSearchQuery(urlQuery);
        }
    }, [location.search]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    Search Results {searchQuery && <span>for "{searchQuery}"</span>}
                </h1>
                <p className="text-gray-600">
                    {isSearching
                        ? 'Searching...'
                        : searchResults.length === 0
                            ? 'No products found'
                            : `Found ${searchResults.length} product${searchResults.length !== 1 ? 's' : ''}`
                    }
                </p>
            </div>

            {isSearching ? (
                <div className="flex justify-center items-center py-16">
                    <div className="animate-spin mr-2">
                        <Search className="h-6 w-6 text-primary-600" />
                    </div>
                    <span className="text-gray-600">Searching...</span>
                </div>
            ) : searchResults.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">No products found</h2>
                    <p className="text-gray-500 max-w-md mx-auto">
                        We couldn't find any products matching "{searchQuery}". Try using different keywords or browsing our categories.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {searchResults.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
