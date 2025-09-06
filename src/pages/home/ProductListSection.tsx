import React from 'react';
import { ProductList } from '../../components/products/ProductList';

const ProductListSection: React.FC = () => {
    return (
        <div className="w-full bg-white py-10">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                {/* Only the heading is constrained to max-width for readability */}
                <div className="mb-8 max-w-7xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
                        Explore All Products
                    </h2>
                    <p className="text-lg text-gray-600 max-w-7xl text-center">
                        Browse our full collection of sustainable and eco-friendly products
                    </p>
                </div>
                {/* Full width product list with no max-width constraint */}
                <div className="w-full">
                    <ProductList />
                </div>
            </div>
        </div>
    );
};

export default ProductListSection;
