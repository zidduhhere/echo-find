import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../types';
import { ArrowRight } from 'lucide-react';

const CategoryIndex: React.FC = () => {
    // Create URL-friendly category slugs
    const getCategorySlug = (category: string) => {
        return category.toLowerCase().replace(/\s+&\s+/g, '-and-').replace(/\s+/g, '-');
    };

    // Category icons/images mapping
    const categoryImages = {
        'Electronics': 'https://images.pexels.com/photos/6195132/pexels-photo-6195132.jpeg?auto=compress&cs=tinysrgb&w=600',
        'Clothing': 'https://images.pexels.com/photos/5698853/pexels-photo-5698853.jpeg?auto=compress&cs=tinysrgb&w=600',
        'Home & Garden': 'https://images.pexels.com/photos/5702281/pexels-photo-5702281.jpeg?auto=compress&cs=tinysrgb&w=600',
        'Books': 'https://images.pexels.com/photos/6192117/pexels-photo-6192117.jpeg?auto=compress&cs=tinysrgb&w=600',
        'Sports & Recreation': 'https://images.pexels.com/photos/4498577/pexels-photo-4498577.jpeg?auto=compress&cs=tinysrgb&w=600',
        'Toys & Games': 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=600',
        'Automotive': 'https://images.pexels.com/photos/248687/pexels-photo-248687.jpeg?auto=compress&cs=tinysrgb&w=600',
        'Art & Crafts': 'https://images.pexels.com/photos/139764/pexels-photo-139764.jpeg?auto=compress&cs=tinysrgb&w=600',
        'Music & Instruments': 'https://images.pexels.com/photos/164694/pexels-photo-164694.jpeg?auto=compress&cs=tinysrgb&w=600',
        'Other': 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=600'
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Categories</h1>
                <p className="text-gray-600">Discover sustainable products across all categories</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {CATEGORIES.map((category) => (
                    <Link
                        key={category}
                        to={`/category/${getCategorySlug(category)}`}
                        className="group"
                    >
                        <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                            <div className="relative h-48">
                                <img
                                    src={categoryImages[category] || categoryImages['Other']}
                                    alt={category}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-bold">{category}</h2>
                                        <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryIndex;
