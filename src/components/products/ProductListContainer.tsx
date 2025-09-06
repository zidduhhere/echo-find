import React from 'react';
import { ProductList } from './ProductList';

interface ProductListContainerProps {
    title?: string;
    description?: string;
}

export const ProductListContainer: React.FC<ProductListContainerProps> = ({
    title,
    description
}) => {
    return (
        <div className="w-full bg-gray-50 py-10">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                {(title || description) && (
                    <div className="text-center mb-8 max-w-7xl mx-auto">
                        {title && (
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                {description}
                            </p>
                        )}
                    </div>
                )}
                <div className="max-w-7xl mx-auto">
                    <ProductList />
                </div>
            </div>
        </div>
    );
};
