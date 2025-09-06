import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product, Category } from '../../types';
import { ProductCard } from '../../components/products/ProductCard';
import { demoProducts } from '../../context/demo_products';
import { Filter, SlidersHorizontal, Search, ArrowUpDown } from 'lucide-react';

interface CategoryPageProps {
    // If category is provided directly, use it instead of from URL params
    categoryOverride?: Category;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryOverride }) => {
    const { category: categoryParam } = useParams<{ category: string }>();

    // Use either the override or URL param (with fallback)
    const category = categoryOverride ||
        (categoryParam ?
            categoryParam.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()) as Category :
            'Electronics' as Category);

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);

    useEffect(() => {
        // Fetch and filter products based on category
        const filterProductsByCategory = () => {
            const filteredProducts = demoProducts.filter(
                product => product.category.toLowerCase() === category.toLowerCase()
            );

            // Add seller info to match the structure expected by ProductCard
            const productsWithSeller = filteredProducts.map(product => {
                const seller = {
                    id: product.seller_id,
                    email: `seller${product.seller_id.split('seller')[1]}@example.com`,
                    username: `seller${product.seller_id.split('seller')[1]}`,
                    created_at: product.created_at,
                    updated_at: product.updated_at
                };

                return {
                    ...product,
                    seller: seller
                };
            });

            // Apply sorting
            const sortedProducts = sortProducts(productsWithSeller, sortBy);
            setProducts(sortedProducts);
            setLoading(false);
        };

        filterProductsByCategory();
    }, [category, sortBy]);

    // Filter products based on search term and price range
    const getFilteredProducts = () => {
        return products.filter(product => {
            const matchesSearch = !searchTerm ||
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesPrice =
                product.price >= priceRange[0] &&
                product.price <= priceRange[1];

            return matchesSearch && matchesPrice;
        });
    };

    // Sort products based on selected sort option
    const sortProducts = (productsToSort: Product[], sortOption: string) => {
        switch (sortOption) {
            case 'price-low':
                return [...productsToSort].sort((a, b) => a.price - b.price);
            case 'price-high':
                return [...productsToSort].sort((a, b) => b.price - a.price);
            case 'newest':
            default:
                return [...productsToSort].sort(
                    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );
        }
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleSortChange = (newSortBy: 'newest' | 'price-low' | 'price-high') => {
        setSortBy(newSortBy);
    };

    const handlePriceRangeChange = (index: 0 | 1, value: number) => {
        const newRange = [...priceRange] as [number, number];
        newRange[index] = value;
        setPriceRange(newRange);
    };

    // Get the formatted category name for display
    const getCategoryDisplayName = () => {
        return category.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    };

    const filteredProducts = getFilteredProducts();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{getCategoryDisplayName()}</h1>
                <p className="text-gray-600">
                    Explore our sustainable {getCategoryDisplayName().toLowerCase()} collection
                </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="w-full md:w-64 relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={toggleFilters}
                            className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
                        >
                            <Filter className="h-5 w-5 mr-2 text-gray-500" />
                            <span>Filters</span>
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => document.getElementById('sortDropdown')?.classList.toggle('hidden')}
                                className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
                            >
                                <ArrowUpDown className="h-5 w-5 mr-2 text-gray-500" />
                                <span>Sort</span>
                            </button>

                            <div id="sortDropdown" className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10">
                                <div className="py-1">
                                    <button
                                        onClick={() => handleSortChange('newest')}
                                        className={`w-full text-left px-4 py-2 text-sm ${sortBy === 'newest' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        Newest First
                                    </button>
                                    <button
                                        onClick={() => handleSortChange('price-low')}
                                        className={`w-full text-left px-4 py-2 text-sm ${sortBy === 'price-low' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        Price: Low to High
                                    </button>
                                    <button
                                        onClick={() => handleSortChange('price-high')}
                                        className={`w-full text-left px-4 py-2 text-sm ${sortBy === 'price-high' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        Price: High to Low
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                        <button
                            onClick={toggleFilters}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <SlidersHorizontal className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price Range
                            </label>
                            <div className="flex items-center space-x-4">
                                <div>
                                    <label className="text-xs text-gray-600">Min ($)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max={priceRange[1]}
                                        value={priceRange[0]}
                                        onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value))}
                                        className="w-full px-3 py-1 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-600">Max ($)</label>
                                    <input
                                        type="number"
                                        min={priceRange[0]}
                                        value={priceRange[1]}
                                        onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value))}
                                        className="w-full px-3 py-1 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="h-48 bg-gray-300"></div>
                            <div className="p-4 space-y-3">
                                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                        <Filter className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500 mb-6">
                        Try adjusting your search or filter criteria
                    </p>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
