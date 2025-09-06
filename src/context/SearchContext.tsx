import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import { demoProducts } from './demo_products';

interface SearchContextProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchResults: Product[];
    isSearching: boolean;
    performSearch: (query: string) => void;
    clearSearch: () => void;
}

const SearchContext = createContext<SearchContextProps>({
    searchQuery: '',
    setSearchQuery: () => { },
    searchResults: [],
    isSearching: false,
    performSearch: () => { },
    clearSearch: () => { },
});

export const useSearch = () => useContext(SearchContext);

interface SearchProviderProps {
    children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // Function to search products from demo_products
    const performSearch = (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);

        // Simulate network delay for a more realistic search experience
        setTimeout(() => {
            const normalizedQuery = query.toLowerCase().trim();

            const results = demoProducts.filter((product: Product) =>
                product.title.toLowerCase().includes(normalizedQuery) ||
                product.description.toLowerCase().includes(normalizedQuery) ||
                product.category.toLowerCase().includes(normalizedQuery)
            );

            setSearchResults(results);
            setIsSearching(false);
        }, 300);
    };

    // Clear search results and query
    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

    // Perform search whenever searchQuery changes
    useEffect(() => {
        performSearch(searchQuery);
    }, [searchQuery]);

    return (
        <SearchContext.Provider
            value={{
                searchQuery,
                setSearchQuery,
                searchResults,
                isSearching,
                performSearch,
                clearSearch,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
