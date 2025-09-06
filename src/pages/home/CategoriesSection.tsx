import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScrollStyles.css';
import './CategoryPatterns.css';
import {
    Laptop,
    ShoppingBag,
    Home,
    BookOpen,
    Bike,
    Palette,
    Music,
    Car,
    Leaf,
    Coffee
} from 'lucide-react';

interface Category {
    id: string;
    name: string;
    description: string;
    gradient: string;
    icon: React.ReactNode;
}

const CategoriesSection: React.FC = () => {
    const navigate = useNavigate();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Track scroll position to update active dot indicator
    useEffect(() => {
        const handleScroll = () => {
            if (scrollContainerRef.current) {
                const containerWidth = scrollContainerRef.current.clientWidth;
                const scrollPosition = scrollContainerRef.current.scrollLeft;
                const newIndex = Math.round(scrollPosition / containerWidth);
                setActiveIndex(newIndex);
            }
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const categories: Category[] = [
        {
            id: 'electronics',
            name: 'Electronics',
            description: 'Discover sustainable tech products that minimize environmental impact while maximizing performance.',
            gradient: 'from-primary-400 to-primary-600',
            icon: <Laptop className="w-12 h-12 text-white" />
        },
        {
            id: 'clothing',
            name: 'Clothing',
            description: 'Explore eco-friendly fashion made from sustainable materials with ethical manufacturing.',
            gradient: 'from-primary-300 to-primary-500',
            icon: <ShoppingBag className="w-12 h-12 text-white" />
        },
        {
            id: 'home-and-garden',
            name: 'Home & Garden',
            description: 'Transform your living space with sustainable home goods and garden products.',
            gradient: 'from-primary-500 to-primary-700',
            icon: <Home className="w-12 h-12 text-white" />
        },
        {
            id: 'books',
            name: 'Books',
            description: 'Browse our selection of books on sustainability, eco-friendly living, and environmental topics.',
            gradient: 'from-primary-600 to-primary-800',
            icon: <BookOpen className="w-12 h-12 text-white" />
        },
        {
            id: 'sports-and-recreation',
            name: 'Sports & Recreation',
            description: 'Stay active with eco-friendly sports equipment and outdoor recreational products.',
            gradient: 'from-primary-400 to-primary-700',
            icon: <Bike className="w-12 h-12 text-white" />
        },
        {
            id: 'art-and-crafts',
            name: 'Art & Crafts',
            description: 'Express your creativity with sustainable art supplies and eco-friendly craft materials.',
            gradient: 'from-primary-300 to-primary-600',
            icon: <Palette className="w-12 h-12 text-white" />
        },
        {
            id: 'music-and-instruments',
            name: 'Music & Instruments',
            description: 'Discover musical instruments made from sustainable materials and eco-friendly music accessories.',
            gradient: 'from-primary-500 to-primary-800',
            icon: <Music className="w-12 h-12 text-white" />
        },
        {
            id: 'automotive',
            name: 'Automotive',
            description: 'Find eco-friendly automotive products that reduce your carbon footprint.',
            gradient: 'from-primary-400 to-primary-500',
            icon: <Car className="w-12 h-12 text-white" />
        },
        {
            id: 'food-and-beverages',
            name: 'Food & Beverages',
            description: 'Explore organic, sustainably sourced food and beverage options for a healthier lifestyle.',
            gradient: 'from-primary-500 to-primary-600',
            icon: <Coffee className="w-12 h-12 text-white" />
        },
        {
            id: 'eco-friendly-kits',
            name: 'Eco-Friendly Kits',
            description: 'Get started with comprehensive eco-friendly kits for various aspects of sustainable living.',
            gradient: 'from-primary-600 to-primary-700',
            icon: <Leaf className="w-12 h-12 text-white" />
        }
    ];

    const handleCategoryClick = (categoryId: string) => {
        navigate(`/category/${categoryId}`);
    };

    return (
        <div className="py-16 bg-gray-50 relative overflow-hidden section-dot-pattern">
            {/* Background dots are now handled by CSS */}

            <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Title */}
                <div className="text-left mb-8 w-full mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Categories</h2>
                </div>

                {/* Category Slider/Cards */}
                <div className="relative max-w-7xl mx-auto">
                    {/* Navigation Buttons */}
                    <div className="absolute -top-16 right-0 transform z-10 flex space-x-3">
                        <button
                            onClick={() => {
                                if (scrollContainerRef.current) {
                                    scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                                }
                            }}
                            className="h-12 w-12 rounded-full border border-gray-300 flex items-center justify-center bg-white shadow-sm hover:bg-gray-50"
                        >
                            <span className="sr-only">Previous</span>
                            <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => {
                                if (scrollContainerRef.current) {
                                    scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                                }
                            }}
                            className="h-12 w-12 rounded-full border border-gray-300 flex items-center justify-center bg-white shadow-sm hover:bg-gray-50"
                        >
                            <span className="sr-only">Next</span>
                            <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Scrollable Cards Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex pt-5 overflow-x-auto pb-8 snap-x snap-mandatory gap-6 hide-scrollbar"
                        style={{
                            WebkitOverflowScrolling: 'touch',
                            scrollBehavior: 'smooth'
                        }}
                    >
                        {categories.map((category, index) => (
                            <div
                                key={category.id}
                                className="rounded-3xl overflow-hidden shadow-lg flex-shrink-0 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] snap-start"
                            >
                                <div
                                    className={`bg-gradient-to-br ${category.gradient} p-8 h-full flex flex-col min-h-[320px] card-with-pattern dot-pattern-${(index % 5) + 1}`}
                                >
                                    <div className="rounded-full bg-white/20 w-20 h-20 flex items-center justify-center mb-8 shadow-lg backdrop-blur-sm relative z-10">
                                        {category.icon}
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-bold text-white mb-4">{category.name}</h3>
                                        <p className="text-white/90 mb-auto">{category.description}</p>
                                        <button
                                            onClick={() => handleCategoryClick(category.id)}
                                            className="flex items-center text-white mt-6 group bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all"
                                        >
                                            <span>Shop Now</span>
                                            <svg className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Custom Scrollbar Indicator */}
                    <div className="mt-6 flex justify-center gap-2">
                        {Array.from({ length: Math.ceil(categories.length / 4) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (scrollContainerRef.current) {
                                        const containerWidth = scrollContainerRef.current.clientWidth;
                                        scrollContainerRef.current.scrollTo({
                                            left: containerWidth * index,
                                            behavior: 'smooth'
                                        });
                                        setActiveIndex(index);
                                    }
                                }}
                                className={`w-2 h-2 rounded-full transition-colors ${activeIndex === index ? 'bg-primary-500' : 'bg-gray-300 hover:bg-primary-300'
                                    }`}
                                aria-label={`Scroll to page ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriesSection;
