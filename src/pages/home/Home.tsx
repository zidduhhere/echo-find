import React from 'react';
import HeroSearchSection from './HeroSearchSection';
import BannerSection from './BannerSection';
import CategoriesSection from './CategoriesSection';
import FeaturedProductsSection from './FeaturedProductsSection';
import ProductListSection from './ProductListSection';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-0 m-0">
            {/* Hero Search Section */}
            <HeroSearchSection />

            {/* Banner Section */}
            <BannerSection />

            {/* Categories Section */}
            <CategoriesSection />

            {/* Featured Products Section */}
            <FeaturedProductsSection />

            {/* All Products Section */}
            <ProductListSection />
        </div>
    );
};

export default Home;
