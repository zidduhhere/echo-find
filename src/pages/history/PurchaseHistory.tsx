import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Purchase, PurchaseItem } from '../../types';
import { demoProducts } from '../../context/demo_products';
import { ArrowLeft, Package, Clock, MapPin, Calendar, TrendingUp, ShoppingBag, Truck, CheckCircle } from 'lucide-react';

// Generate demo address data
const demoAddresses = [
    {
        name: 'John Doe',
        street: '123 Eco Street',
        city: 'Green City',
        state: 'EC',
        zip: '12345',
        country: 'USA'
    },
    {
        name: 'Jane Smith',
        street: '456 Sustainable Ave',
        city: 'Eco Town',
        state: 'ET',
        zip: '67890',
        country: 'USA'
    }
];

// Generate random delivery date between purchase date and today
const generateDeliveryDate = (purchaseDate: string): string => {
    const purchaseDateObj = new Date(purchaseDate);
    const today = new Date();
    const diffTime = today.getTime() - purchaseDateObj.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Set delivery date to 3-7 days after purchase, or today if purchase was less than 3 days ago
    const deliveryDays = Math.min(diffDays, Math.floor(Math.random() * 5) + 3);
    const deliveryDate = new Date(purchaseDateObj);
    deliveryDate.setDate(purchaseDateObj.getDate() + deliveryDays);

    return deliveryDate.toISOString();
};

// Generate demo purchase history
const generateDemoPurchases = (): Purchase[] => {
    // Create sample purchases over the last 3 months
    const purchases: Purchase[] = [];

    // Generate 5 past purchases with different dates
    for (let i = 0; i < 5; i++) {
        const purchaseDate = new Date();
        // Set purchase date to a random date in the past 90 days
        purchaseDate.setDate(purchaseDate.getDate() - Math.floor(Math.random() * 90));

        // Select 1-3 random products for this purchase
        const itemCount = Math.floor(Math.random() * 3) + 1;
        const purchaseItems: PurchaseItem[] = [];
        let total = 0;

        for (let j = 0; j < itemCount; j++) {
            // Get a random product
            const productIndex = Math.floor(Math.random() * demoProducts.length);
            const product = demoProducts[productIndex];
            const quantity = Math.floor(Math.random() * 3) + 1;
            const price = product.price;

            // Create purchase item
            purchaseItems.push({
                id: `item-${i}-${j}`,
                purchase_id: `purchase-${i}`,
                product_id: product.id,
                quantity: quantity,
                price_at_purchase: price,
                product: {
                    ...product,
                    seller: {
                        id: product.seller_id,
                        email: `seller${product.seller_id.split('seller')[1]}@example.com`,
                        username: `seller${product.seller_id.split('seller')[1]}`,
                        created_at: product.created_at,
                        updated_at: product.updated_at
                    }
                }
            });

            total += price * quantity;
        }

        // Create purchase with items
        purchases.push({
            id: `purchase-${i}`,
            buyer_id: 'demo-user',
            total: total,
            purchase_date: purchaseDate.toISOString(),
            purchase_items: purchaseItems
        });
    }

    // Sort purchases by date (newest first)
    purchases.sort((a, b) =>
        new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime()
    );

    return purchases;
};

const PurchaseHistory: React.FC = () => {
    const { user, loading } = useAuth();
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [expandedPurchase, setExpandedPurchase] = useState<string | null>(null);
    const [useDemoData, setUseDemoData] = useState(true);

    useEffect(() => {
        // In a real app, we would fetch actual purchase history
        // For now, we'll use demo data
        const demoPurchases = generateDemoPurchases();
        setPurchases(demoPurchases);
    }, []);

    const togglePurchaseDetails = (purchaseId: string) => {
        if (expandedPurchase === purchaseId) {
            setExpandedPurchase(null);
        } else {
            setExpandedPurchase(purchaseId);
        }
    };

    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Get a random address for a purchase
    const getAddressForPurchase = (purchaseId: string) => {
        // Use a consistent random selection based on purchase ID
        const addressIndex = parseInt(purchaseId.replace(/[^0-9]/g, '')) % demoAddresses.length;
        return demoAddresses[addressIndex];
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="space-y-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!user && !useDemoData) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <ShoppingBag className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Purchase History</h2>
                    <p className="text-gray-600 mb-6">Please sign in to view your purchase history.</p>
                    <div className="space-y-4">
                        <Link to="/login" className="inline-block">
                            <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-md">
                                Sign In
                            </button>
                        </Link>
                        <div>
                            <button
                                onClick={() => setUseDemoData(true)}
                                className="text-primary-600 hover:text-primary-700 underline"
                            >
                                View demo purchase history
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6 flex justify-between items-center">


                {useDemoData && !user && (
                    <div className="text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-sm font-medium">
                        Demo Purchase History
                    </div>
                )}
            </div>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Your Purchase History</h1>
                <p className="text-gray-600">View and track all your past orders</p>
            </div>

            {purchases.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <ShoppingBag className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                    <h2 className="text-xl font-medium text-gray-900 mb-2">No purchases yet</h2>
                    <p className="text-gray-600 mb-6">Start shopping to create your purchase history.</p>
                    <Link to="/">
                        <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-md">
                            Browse Products
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {purchases.map((purchase) => {
                        const deliveryDate = generateDeliveryDate(purchase.purchase_date);
                        const address = getAddressForPurchase(purchase.id);

                        return (
                            <div key={purchase.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                {/* Purchase Header */}
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <Package className="w-5 h-5 text-primary-600 mr-2" />
                                                <h2 className="text-lg font-medium text-gray-900">Order #{purchase.id.replace('purchase-', '')}</h2>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                <span className="text-sm">Ordered on {formatDate(purchase.purchase_date)}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 sm:mt-0">
                                            <div className="flex items-center mb-2">
                                                <span className="font-medium text-gray-900">Total: ${purchase.total.toFixed(2)}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Truck className="w-4 h-4 mr-1" />
                                                <span className="text-sm">Delivered on {formatDate(deliveryDate)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => togglePurchaseDetails(purchase.id)}
                                        className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                                    >
                                        {expandedPurchase === purchase.id ? 'Hide Details' : 'Show Details'}
                                    </button>
                                </div>

                                {/* Purchase Items (Collapsed by Default) */}
                                {expandedPurchase === purchase.id && (
                                    <div className="px-6 py-4 bg-gray-50">
                                        <div className="mb-4">
                                            <h3 className="text-sm font-medium text-gray-700 mb-2">Delivered To:</h3>
                                            <div className="bg-white p-3 rounded border border-gray-200">
                                                <div className="flex items-start">
                                                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5 mr-2" />
                                                    <div>
                                                        <p className="text-sm font-medium">{address.name}</p>
                                                        <p className="text-sm text-gray-600">{address.street}</p>
                                                        <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zip}</p>
                                                        <p className="text-sm text-gray-600">{address.country}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <h3 className="text-sm font-medium text-gray-700 mb-2">Order Items:</h3>
                                        <div className="space-y-4">
                                            {purchase.purchase_items?.map((item) => (
                                                <div key={item.id} className="bg-white p-4 rounded border border-gray-200">
                                                    <div className="flex flex-col sm:flex-row">
                                                        <div className="sm:w-20 sm:h-20 mb-4 sm:mb-0">
                                                            <img
                                                                src={item.product?.image_url || 'https://via.placeholder.com/80'}
                                                                alt={item.product?.title || 'Product'}
                                                                className="w-full h-full object-cover rounded"
                                                            />
                                                        </div>

                                                        <div className="sm:ml-4 flex-1">
                                                            <Link
                                                                to={`/product/${item.product_id}`}
                                                                className="text-md font-medium text-gray-900 hover:text-primary-600"
                                                            >
                                                                {item.product?.title}
                                                            </Link>

                                                            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                                                                <div>
                                                                    <span className="font-medium">${item.price_at_purchase.toFixed(2)}</span> × {item.quantity}
                                                                </div>

                                                                <div className="flex items-center">
                                                                    <TrendingUp className="w-3 h-3 mr-1" />
                                                                    <span>Quantity: {item.quantity}</span>
                                                                </div>

                                                                <div className="flex items-center">
                                                                    <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                                                                    <span className="text-green-600">Delivered</span>
                                                                </div>
                                                            </div>

                                                            <div className="mt-2 flex justify-between items-center">
                                                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                                    {item.product?.category}
                                                                </span>

                                                                <span className="font-medium text-gray-900">
                                                                    Subtotal: ${(item.price_at_purchase * item.quantity).toFixed(2)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between border-t border-gray-200 pt-4">
                                            <div className="mb-4 sm:mb-0">
                                                <div className="flex items-center text-gray-600">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    <span className="text-sm">Order placed: {formatDate(purchase.purchase_date)}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600 mt-1">
                                                    <Truck className="w-4 h-4 mr-1" />
                                                    <span className="text-sm">Delivered: {formatDate(deliveryDate)}</span>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Order Total</p>
                                                <p className="text-xl font-bold text-primary-600">${purchase.total.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PurchaseHistory;
