import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types';
import { demoProducts } from '../../context/demo_products';
import {
    Truck,
    ShieldCheck,
    Star,
    ChevronDown,
    Clock,
    CheckCircle2,
    MapPin,
    ArrowRight,
    Percent,
    CreditCard,
    Heart,
    Share2,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface ProductDimension {
    width: number;
    height: number;
    depth: number;
    weight: number;
}

interface ProductReview {
    id: string;
    userId: string;
    username: string;
    rating: number;
    comment: string;
    date: string;
}

interface BankOffer {
    id: string;
    bank: string;
    description: string;
    discount: string;
}

interface EMIOption {
    months: number;
    interestRate: number;
    monthlyAmount: number;
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    // Comment this out since it's not used but may be needed later
    // const { user } = useAuth();
    const { addToCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [pincode, setPincode] = useState('');
    const [pincodeValid, setPincodeValid] = useState<boolean | null>(null);
    const [estimatedDelivery, setEstimatedDelivery] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    // Sections visibility states
    const [showDescription, setShowDescription] = useState(true);
    const [showSpecifications, setShowSpecifications] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [showBankOffers, setShowBankOffers] = useState(false);
    const [showEMIOptions, setShowEMIOptions] = useState(false);

    // Mock product images (in a real app, these would come from the backend)
    const [productImages, setProductImages] = useState<string[]>([]);

    // Mock product dimensions
    const [dimensions] = useState<ProductDimension>({
        width: 30,
        height: 20,
        depth: 15,
        weight: 1.2,
    });

    // Mock reviews
    const [reviews] = useState<ProductReview[]>([
        {
            id: '1',
            userId: 'user1',
            username: 'John D.',
            rating: 5,
            comment: 'Excellent product! Very eco-friendly and durable.',
            date: '2025-08-15',
        },
        {
            id: '2',
            userId: 'user2',
            username: 'Emma S.',
            rating: 4,
            comment: 'Great quality, though shipping took a bit longer than expected.',
            date: '2025-08-10',
        },
        {
            id: '3',
            userId: 'user3',
            username: 'Michael T.',
            rating: 5,
            comment: 'Love how sustainable this product is. Will buy again!',
            date: '2025-08-05',
        },
    ]);

    // Mock bank offers
    const bankOffers: BankOffer[] = [
        {
            id: 'offer1',
            bank: 'EcoBank',
            description: '10% instant discount on EcoBank Credit Cards',
            discount: '10%',
        },
        {
            id: 'offer2',
            bank: 'GreenCard',
            description: 'No cost EMI on GreenCard Credit Cards',
            discount: 'EMI',
        },
        {
            id: 'offer3',
            bank: 'SustainPay',
            description: '5% cashback on SustainPay wallets',
            discount: '5%',
        },
    ];

    // Mock EMI options
    const emiOptions: EMIOption[] = [
        {
            months: 3,
            interestRate: 0,
            monthlyAmount: 0, // Will be calculated based on product price
        },
        {
            months: 6,
            interestRate: 0,
            monthlyAmount: 0,
        },
        {
            months: 12,
            interestRate: 12,
            monthlyAmount: 0,
        },
    ];

    // Calculate average rating
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    useEffect(() => {
        // Fetch product by ID (in a real app, this would be an API call)
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                // Find product in demo products
                const foundProduct = demoProducts.find((p) => p.id === id);

                if (foundProduct) {
                    // Add seller information
                    const productWithSeller = {
                        ...foundProduct,
                        seller: {
                            id: foundProduct.seller_id,
                            email: `seller${foundProduct.seller_id.split('seller')[1]}@example.com`,
                            username: `seller${foundProduct.seller_id.split('seller')[1]}`,
                            created_at: foundProduct.created_at,
                            updated_at: foundProduct.updated_at,
                        },
                    };

                    setProduct(productWithSeller);

                    // Generate multiple product images based on the main image
                    const mainImage = foundProduct.image_url;
                    setProductImages([
                        mainImage,
                        'https://images.pexels.com/photos/4079283/pexels-photo-4079283.jpeg?auto=compress&cs=tinysrgb&w=600',
                        'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=600',
                        'https://images.pexels.com/photos/6444091/pexels-photo-6444091.jpeg?auto=compress&cs=tinysrgb&w=600',
                    ]);

                    // Update EMI options with correct monthly amounts
                    // Calculate updated EMI options
                    emiOptions.map(option => ({
                        ...option,
                        monthlyAmount: calculateEMI(foundProduct.price, option.months, option.interestRate)
                    }));

                } else {
                    console.error('Product not found');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Calculate EMI
    const calculateEMI = (price: number, months: number, interestRate: number): number => {
        if (interestRate === 0) {
            return price / months;
        }

        const monthlyInterestRate = interestRate / 100 / 12;
        const emi = (price * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) /
            (Math.pow(1 + monthlyInterestRate, months) - 1);

        return emi;
    };

    const handlePincodeCheck = () => {
        // Validate pincode (in a real app, this would be an API call)
        const isValid = /^\d{6}$/.test(pincode);

        setPincodeValid(isValid);

        if (isValid) {
            // Simulate delivery time calculation
            const randomDays = Math.floor(Math.random() * 5) + 3;
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + randomDays);

            setEstimatedDelivery(`Estimated delivery: ${deliveryDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            })}`);
        } else {
            setEstimatedDelivery(null);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
        }
    };

    const handleBuyNow = () => {
        if (product) {
            addToCart(product);
            // Navigate to checkout
            window.location.href = '/checkout';
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="md:flex md:space-x-6">
                        <div className="md:w-1/2 bg-gray-200 h-96 rounded-lg"></div>
                        <div className="md:w-1/2 space-y-4 mt-4 md:mt-0">
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-10 bg-gray-200 rounded w-full"></div>
                            <div className="flex space-x-4">
                                <div className="h-12 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-12 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
                    <p className="mt-2 text-gray-600">Sorry, we couldn't find the product you're looking for.</p>
                    <Link to="/" className="mt-4 inline-block text-primary-600 hover:underline">
                        Return to Homepage
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="text-sm mb-6">
                <ol className="list-none p-0 inline-flex">
                    <li className="flex items-center">
                        <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
                        <ArrowRight className="h-3 w-3 mx-2 text-gray-400" />
                    </li>
                    <li className="flex items-center">
                        <Link to={`/category/${product.category.toLowerCase().replace(' & ', '-')}`} className="text-gray-500 hover:text-primary-600">
                            {product.category}
                        </Link>
                        <ArrowRight className="h-3 w-3 mx-2 text-gray-400" />
                    </li>
                    <li className="text-gray-800">{product.title}</li>
                </ol>
            </nav>

            {/* Product Detail Main Section */}
            <div className="lg:flex lg:space-x-8">
                {/* Product Images */}
                <div className="lg:w-1/2">
                    <div className="relative bg-white rounded-lg overflow-hidden shadow-sm mb-4">
                        <img
                            src={productImages[selectedImageIndex] || product.image_url}
                            alt={product.title}
                            className="w-full h-96 object-contain"
                        />
                        <div className="absolute top-4 right-4 space-y-2">
                            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                                <Heart className="h-5 w-5 text-gray-600" />
                            </button>
                            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                                <Share2 className="h-5 w-5 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Image Thumbnails */}
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                        {productImages.map((image, index) => (
                            <button
                                key={index}
                                className={`w-20 h-20 border-2 rounded-md flex-shrink-0 ${selectedImageIndex === index ? 'border-primary-600' : 'border-gray-200'
                                    }`}
                                onClick={() => setSelectedImageIndex(index)}
                            >
                                <img src={image} alt={`${product.title} thumbnail ${index}`} className="w-full h-full object-cover rounded" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="lg:w-1/2 mt-8 lg:mt-0">
                    <h1 className="text-4xl font-isans font-bold text-gray-900 mb-2">{product.title}</h1>

                    {/* Ratings */}
                    <div className="flex items-center mb-4">
                        <div className="flex items-center bg-primary-100 px-2 py-1 rounded">
                            <span className="text-primary-800 font-medium mr-1">{averageRating.toFixed(1)}</span>
                            <Star className="w-4 h-4 text-primary-800 fill-current" />
                        </div>
                        <span className="text-gray-500 ml-2">{reviews.length} reviews</span>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                        <div className="flex items-center">
                            <span className="text-3xl font-bold text-primary-600">${product.price.toFixed(2)}</span>
                            <span className="ml-3 text-lg text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
                            <span className="ml-2 text-lg text-primary-500">20% off</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
                    </div>

                    {/* Product Variants (if needed) */}

                    {/* Quantity */}
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Quantity</label>
                        <div className="flex items-center">
                            <button
                                className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                className="w-16 text-center border-y border-gray-300 py-1 focus:outline-none"
                            />
                            <button
                                className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Pincode Check */}
                    <div className="mb-6">
                        <label className="text-gray-700 mb-2 flex items-center">
                            <MapPin className="w-4 h-4 mr-1 text-primary-600" />
                            Delivery
                        </label>
                        <div className="flex">
                            <Input
                                type="text"
                                placeholder="Enter Pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                className="rounded-r-none"
                            />
                            <Button
                                onClick={handlePincodeCheck}
                                className="rounded-l-none bg-primary-500 hover:bg-primary-600 text-white"
                            >
                                Check
                            </Button>
                        </div>
                        {pincodeValid === false && (
                            <p className="text-red-500 text-sm mt-1">Please enter a valid 5-digit pincode</p>
                        )}
                        {estimatedDelivery && (
                            <div className="flex items-center mt-2 text-primary-700">
                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                <span className="text-sm">{estimatedDelivery}</span>
                            </div>
                        )}
                    </div>

                    {/* Bank Offers */}
                    <div className="mb-6 border border-gray-200 rounded-lg p-4">
                        <button
                            className="w-full flex items-center justify-between"
                            onClick={() => setShowBankOffers(!showBankOffers)}
                        >
                            <div className="flex items-center">
                                <Percent className="w-5 h-5 mr-2 text-primary-600" />
                                <h3 className="font-medium text-gray-900">Bank Offers</h3>
                            </div>
                            <ChevronDown className={`w-5 h-5 transition-transform ${showBankOffers ? 'transform rotate-180' : ''}`} />
                        </button>

                        {showBankOffers && (
                            <div className="mt-3 space-y-3 pl-7">
                                {bankOffers.map(offer => (
                                    <div key={offer.id} className="flex items-start">
                                        <CheckCircle2 className="w-4 h-4 mr-2 text-primary-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-700">{offer.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* EMI Options */}
                    <div className="mb-6 border border-gray-200 rounded-lg p-4">
                        <button
                            className="w-full flex items-center justify-between"
                            onClick={() => setShowEMIOptions(!showEMIOptions)}
                        >
                            <div className="flex items-center">
                                <CreditCard className="w-5 h-5 mr-2 text-primary-600" />
                                <h3 className="font-medium text-gray-900">EMI Options</h3>
                            </div>
                            <ChevronDown className={`w-5 h-5 transition-transform ${showEMIOptions ? 'transform rotate-180' : ''}`} />
                        </button>

                        {showEMIOptions && (
                            <div className="mt-3 space-y-3 pl-7">
                                {emiOptions.map((option, index) => (
                                    <div key={index} className="flex items-start">
                                        <CheckCircle2 className="w-4 h-4 mr-2 text-primary-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                {option.months} months{' '}
                                                {option.interestRate > 0 ? `(${option.interestRate}% interest)` : '(No interest)'}{' '}
                                                <span className="font-medium">${(product.price / option.months).toFixed(2)}/month</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                        <Button
                            onClick={handleAddToCart}
                            className="flex-1 flex items-center justify-center  hover:bg-primary-200 text-primary-800 border-primary-300"
                            variant="outline"
                        >
                            Add to Cart
                        </Button>
                        <Button
                            onClick={handleBuyNow}
                            className="flex-1 bg-primary-500 hover:bg-primary-600 text-white"
                        >
                            Buy Now
                        </Button>
                    </div>

                    {/* Product USPs */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="flex items-center">
                            <ShieldCheck className="w-4 h-4 text-primary-600 mr-2" />
                            <span className="text-sm text-gray-700">1 Year Warranty</span>
                        </div>
                        <div className="flex items-center">
                            <Truck className="w-4 h-4 text-primary-600 mr-2" />
                            <span className="text-sm text-gray-700">Free Shipping</span>
                        </div>
                        <div className="flex items-center">
                            <CheckCircle2 className="w-4 h-4 text-primary-600 mr-2" />
                            <span className="text-sm text-gray-700">100% Authentic</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 text-primary-600 mr-2" />
                            <span className="text-sm text-gray-700">30-Day Returns</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Tabs */}
            <div className="mt-12 border-t border-gray-200 pt-8">
                {/* Description Tab */}
                <div className="border-b border-gray-200 pb-4">
                    <button
                        className="w-full flex items-center justify-between py-2"
                        onClick={() => setShowDescription(!showDescription)}
                    >
                        <h2 className="text-xl font-bold text-gray-900">Product Description</h2>
                        <ChevronDown className={`w-5 h-5 transition-transform ${showDescription ? 'transform rotate-180' : ''}`} />
                    </button>

                    {showDescription && (
                        <div className="mt-4 prose prose-sm max-w-none text-gray-700">
                            <p>{product.description}</p>
                            <p className="mt-4">
                                This eco-friendly product is designed with sustainability in mind. Made from high-quality materials
                                that are both durable and environmentally responsible. Perfect for environmentally conscious consumers
                                who don't want to compromise on quality.
                            </p>
                            <ul className="mt-4 list-disc pl-5 space-y-2">
                                <li>Eco-friendly materials</li>
                                <li>Sustainable production process</li>
                                <li>Minimal packaging</li>
                                <li>Long-lasting design</li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Specifications Tab */}
                <div className="border-b border-gray-200 py-4">
                    <button
                        className="w-full flex items-center justify-between py-2"
                        onClick={() => setShowSpecifications(!showSpecifications)}
                    >
                        <h2 className="text-xl font-bold text-gray-900">Specifications & Dimensions</h2>
                        <ChevronDown className={`w-5 h-5 transition-transform ${showSpecifications ? 'transform rotate-180' : ''}`} />
                    </button>

                    {showSpecifications && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Physical Dimensions</h3>
                                <dl className="space-y-2">
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <dt className="text-gray-500">Width</dt>
                                        <dd className="text-gray-900">{dimensions.width} cm</dd>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <dt className="text-gray-500">Height</dt>
                                        <dd className="text-gray-900">{dimensions.height} cm</dd>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <dt className="text-gray-500">Depth</dt>
                                        <dd className="text-gray-900">{dimensions.depth} cm</dd>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <dt className="text-gray-500">Weight</dt>
                                        <dd className="text-gray-900">{dimensions.weight} kg</dd>
                                    </div>
                                </dl>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Materials & Composition</h3>
                                <dl className="space-y-2">
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <dt className="text-gray-500">Main Material</dt>
                                        <dd className="text-gray-900">Recycled Materials</dd>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <dt className="text-gray-500">Certification</dt>
                                        <dd className="text-gray-900">Eco-Certified</dd>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <dt className="text-gray-500">Manufacturing</dt>
                                        <dd className="text-gray-900">Sustainable Process</dd>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <dt className="text-gray-500">Carbon Footprint</dt>
                                        <dd className="text-gray-900">Low Impact</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    )}
                </div>

                {/* Reviews Tab */}
                <div className="py-4">
                    <button
                        className="w-full flex items-center justify-between py-2"
                        onClick={() => setShowReviews(!showReviews)}
                    >
                        <h2 className="text-xl font-bold text-gray-900">Customer Reviews ({reviews.length})</h2>
                        <ChevronDown className={`w-5 h-5 transition-transform ${showReviews ? 'transform rotate-180' : ''}`} />
                    </button>

                    {showReviews && (
                        <div className="mt-4">
                            {/* Review Summary */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-6 flex flex-wrap items-center">
                                <div className="mr-8">
                                    <div className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                                    <div className="flex mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">{reviews.length} reviews</div>
                                </div>

                                <div className="flex-grow mt-4 md:mt-0">
                                    {/* Rating Bars */}
                                    {[5, 4, 3, 2, 1].map(rating => {
                                        const count = reviews.filter(r => r.rating === rating).length;
                                        const percentage = (count / reviews.length) * 100;

                                        return (
                                            <div key={rating} className="flex items-center mb-1">
                                                <div className="w-10 text-sm text-gray-600">{rating} stars</div>
                                                <div className="flex-grow mx-3 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-yellow-400 h-2 rounded-full"
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                                <div className="w-8 text-sm text-gray-600">{count}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Review List */}
                            <div className="space-y-6">
                                {reviews.map(review => (
                                    <div key={review.id} className="border-b border-gray-200 pb-6">
                                        <div className="flex items-center mb-2">
                                            <div className="flex mr-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="font-medium text-gray-900">{review.username}</span>
                                            <span className="mx-2 text-gray-400">•</span>
                                            <span className="text-sm text-gray-500">
                                                {new Date(review.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <p className="text-gray-700">{review.comment}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Write a Review Button */}
                            <div className="mt-6 text-center">
                                <Button
                                    variant="outline"
                                    onClick={() => {/* Write review logic */ }}
                                    className="px-8"
                                >
                                    Write a Review
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {demoProducts.slice(0, 4).map(relatedProduct => (
                        <div key={relatedProduct.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                            <Link to={`/product/${relatedProduct.id}`}>
                                <img
                                    src={relatedProduct.image_url}
                                    alt={relatedProduct.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-medium text-gray-900">{relatedProduct.title}</h3>
                                    <p className="text-gray-500 mt-1 text-sm">{relatedProduct.category}</p>
                                    <div className="mt-2 flex justify-between items-center">
                                        <span className="font-bold text-gray-900">${relatedProduct.price.toFixed(2)}</span>
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="ml-1 text-sm text-gray-600">4.5</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
