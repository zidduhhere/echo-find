import React, { useState, useEffect, useRef } from 'react';

// Sample carousel data
const carouselItems = [
    {
        id: 1,
        title: "Sustainable Living",
        description: "Discover eco-friendly products that help reduce your carbon footprint",
        buttonText: "Shop Green",

        imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
        id: 2,
        title: "Recycled Materials",
        description: "Products crafted from recycled materials for a cleaner planet",
        buttonText: "Explore Collection",

        imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
        id: 3,
        title: "Eco Conscious Brands",
        description: "Support brands committed to environmental sustainability",
        buttonText: "Discover More",

        imageUrl: "https://images.unsplash.com/photo-1523461811963-7f1023caeddd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
    }
];

const BannerSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-swipe functionality
    useEffect(() => {
        const startAutoSwipe = () => {
            timerRef.current = setInterval(() => {
                setActiveIndex(prev => (prev + 1) % carouselItems.length);
            }, 5000); // Change slide every 5 seconds
        };

        startAutoSwipe();

        // Clear interval on component unmount
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    // Reset timer when manually changing slides
    const goToSlide = (index: number) => {
        if (timerRef.current) clearInterval(timerRef.current);
        setActiveIndex(index);
        timerRef.current = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % carouselItems.length);
        }, 5000);
    };



    return (
        <div className="bg-gray-50">
            <div className="w-full mx-auto relative">
                <div className="h-[70vh] relative overflow-hidden">
                    {/* Carousel slides */}
                    <div className="h-full relative">
                        {carouselItems.map((item, index) => (
                            <div
                                key={item.id}
                                className={`
                                    absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out
                                    ${index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                                `}
                            >
                                {/* Background image with overlay */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                                >

                                </div>

                                {/* Content */}
                                <div className="flex items-center justify-center h-full">
                                    <div className="relative z-10 text-center px-4">
                                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                                            {item.title}
                                        </h2>
                                        <p className="text-lg md:text-xl text-white text-opacity-90 mb-6 max-w-2xl mx-auto">
                                            {item.description}
                                        </p>
                                        <button className="bg-white text-primary-700 px-8 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors shadow-lg">
                                            {item.buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>



                </div>
            </div>
        </div>
    );
};

export default BannerSection;
