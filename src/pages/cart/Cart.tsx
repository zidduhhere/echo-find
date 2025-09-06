import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import CartItemCard from './CartItemCard';
import OrderSummary from './OrderSummary';
import { CartItem, Product } from '../../types';
import { demoProducts } from '../../context/demo_products';

export const Cart: React.FC = () => {
    const { cart, loading, updateQuantity, removeFromCart, getTotalPrice, checkout } = useCart();
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [savedForLater, setSavedForLater] = useState<string[]>([]);
    const [demoCart, setDemoCart] = useState<CartItem[]>([]);
    const [useDemoCart, setUseDemoCart] = useState(false);

    useEffect(() => {
        // Create demo cart items if the real cart is empty
        if (cart.length === 0) {
            // Generate demo cart items from demo products
            const demoCartItems: CartItem[] = demoProducts.slice(0, 4).map((product, index) => ({
                id: `demo-${index}`,
                user_id: 'demo-user',
                product_id: product.id,
                quantity: Math.floor(Math.random() * 3) + 1, // Random quantity between 1-3
                product: product,
                created_at: new Date().toISOString()
            }));

            setDemoCart(demoCartItems);
            setUseDemoCart(true);
        } else {
            setUseDemoCart(false);
        }
    }, [cart]);

    const handleCheckout = async () => {
        if (useDemoCart) {
            // For demo cart, just show success and clear
            alert('Demo checkout completed successfully!');
            navigate('/purchase-history');
        } else {
            await checkout();
            navigate('/purchase-history');
        }
    };

    const handleSaveForLater = (productId: string) => {
        if (savedForLater.includes(productId)) {
            setSavedForLater(savedForLater.filter(id => id !== productId));
        } else {
            setSavedForLater([...savedForLater, productId]);
        }
    };

    const handleDemoUpdateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            setDemoCart(prevCart => prevCart.filter(item => item.product_id !== productId));
        } else {
            setDemoCart(prevCart =>
                prevCart.map(item =>
                    item.product_id === productId
                        ? { ...item, quantity }
                        : item
                )
            );
        }
    };

    const handleDemoRemoveFromCart = (productId: string) => {
        setDemoCart(prevCart => prevCart.filter(item => item.product_id !== productId));
    };

    const getTotalItems = () => {
        if (useDemoCart) {
            return demoCart.reduce((total, item) => total + item.quantity, 0);
        }
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const getDemoTotalPrice = () => {
        return demoCart.reduce((total, item) => {
            if (item.product) {
                return total + (item.product.price * item.quantity);
            }
            return total;
        }, 0);
    };

    const getEstimatedDelivery = () => {
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + 5); // Estimate 5 days for delivery

        return deliveryDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    };

    if (authLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="flex items-center space-x-4">
                                        <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                            <div className="space-y-3">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-4 bg-gray-200 rounded"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (user) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <ShoppingCart className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Shopping Cart</h2>
                    <p className="text-gray-600 mb-6">
                        {cart.length === 0
                            ? "Your cart is empty. Start shopping to add items."
                            : "Sign in to complete your purchase."}
                    </p>
                    {cart.length > 0 && (
                        <>
                            <div className="mt-4 mb-6">
                                <p className="text-lg font-medium text-gray-900">Items in your cart:</p>
                                <div className="mt-4 space-y-4">
                                    {cart.map(item => (
                                        <div key={item.id} className="flex items-center p-4 border rounded-lg">
                                            <img
                                                src={item.product?.image_url || 'https://via.placeholder.com/80'}
                                                alt={item.product?.title || 'Product'}
                                                className="w-16 h-16 object-cover rounded-md mr-4"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900">{item.product?.title || 'Product'}</h3>
                                                <p className="text-gray-600">${(item.product?.price || 0).toFixed(2)} × {item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Link to="/login" className="inline-block mr-4">
                                <Button className="bg-primary-500 hover:bg-primary-600 text-white">Sign In to Checkout</Button>
                            </Link>
                        </>
                    )}
                    <Link to="/" className="inline-block mt-4">
                        <Button variant="outline" className="flex items-center">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (cart.length === 0 && !useDemoCart) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Continue Shopping</span>
                    </Link>
                </div>

                <div className="text-center">
                    <ShoppingCart className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6">Start browsing to add items to your cart.</p>
                    <div className="space-y-4">
                        <Link to="/">
                            <Button className="bg-primary-500 hover:bg-primary-600 text-white">Browse Products</Button>
                        </Link>
                        <div>
                            <button
                                onClick={() => setUseDemoCart(true)}
                                className="text-primary-600 hover:text-primary-700 underline"
                            >
                                View demo cart with sample products
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Continue Shopping</span>
                </Link>

                {useDemoCart && (
                    <div className="text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-sm font-medium">
                        Demo Cart (Sample Products)
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                            <p className="text-gray-600">
                                {useDemoCart ? demoCart.length : cart.length}
                                {(useDemoCart ? demoCart.length : cart.length) === 1 ? ' item' : ' items'}
                                ({getTotalItems()} total)
                            </p>
                        </div>

                        <div className="divide-y divide-gray-200">
                            {useDemoCart ? (
                                demoCart.map((item) => (
                                    <CartItemCard
                                        key={item.id}
                                        item={item}
                                        updateQuantity={handleDemoUpdateQuantity}
                                        removeFromCart={handleDemoRemoveFromCart}
                                        savedForLater={savedForLater}
                                        onSaveForLater={handleSaveForLater}
                                        getEstimatedDelivery={getEstimatedDelivery}
                                    />
                                ))
                            ) : (
                                cart.map((item) => (
                                    <CartItemCard
                                        key={item.id}
                                        item={item}
                                        updateQuantity={updateQuantity}
                                        removeFromCart={removeFromCart}
                                        savedForLater={savedForLater}
                                        onSaveForLater={handleSaveForLater}
                                        getEstimatedDelivery={getEstimatedDelivery}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <OrderSummary
                        cart={useDemoCart ? demoCart : cart}
                        getTotalPrice={useDemoCart ? getDemoTotalPrice : getTotalPrice}
                        getTotalItems={getTotalItems}
                        getEstimatedDelivery={getEstimatedDelivery}
                        loading={loading}
                        handleCheckout={handleCheckout}
                    />
                </div>
            </div>
        </div>
    );
};

export default Cart;
