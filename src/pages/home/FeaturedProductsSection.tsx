import React, { useState } from 'react';
import { ProductList } from '../../components/products/ProductList';
import SelectionChip from '../../components/ui/SelectionChip';

interface Section {
    id: string;
    name: string;
}

const FeaturedProductsSection: React.FC = () => {
    const [activeSection, setActiveSection] = useState('all');

    const sections: Section[] = [
        { id: 'all', name: 'All Items' },
        { id: 'popular', name: 'Popular' },
        { id: 'trending', name: 'Trending' },
        { id: 'new', name: 'New Arrivals' },
        { id: 'eco', name: 'Eco-friendly' },
        { id: 'sale', name: 'On Sale' },
    ];

    const handleSectionClick = (sectionId: string) => {
        setActiveSection(sectionId);
        // In a real application, you would filter products based on the selected section
        // For now, we're just changing the active state
    };

    return (
        <div className="py-10 bg-gray-50">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 max-w-7xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        Featured Products
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover amazing eco-friendly items from our community
                    </p>
                </div>

                {/* Section Selection Chips */}
                <div className="mb-8 overflow-x-auto scrollbar-hide pb-2 max-w-7xl mx-auto">
                    <div className="flex justify-center space-x-4 min-w-max mx-auto">
                        {sections.map((section) => (
                            <SelectionChip
                                key={section.id}
                                onClick={() => handleSectionClick(section.id)}
                                selected={activeSection === section.id}
                                variant="primary"
                            >
                                {section.name}
                            </SelectionChip>
                        ))}
                    </div>
                </div>

                {/* Full width product list with no max-width constraint */}
                <div className="w-full">
                    <ProductList />
                </div>
            </div>
        </div>
    );
};

export default FeaturedProductsSection;
