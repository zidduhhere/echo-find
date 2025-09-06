import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../../types';
import { Minus, Plus, Trash2, Heart, Star, Clock } from 'lucide-react';

interface CartItemCardProps {
    item: CartItem;
    updateQuantity: (productId: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    savedForLater: string[];
    onSaveForLater: (productId: string) => void;
    getEstimatedDelivery: () => string;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
    item,
    updateQuantity,
    removeFromCart,
    savedForLater,
    onSaveForLater,
    getEstimatedDelivery
}) => {
    return (
        <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <Link to={`/product/${item.product?.id || ''}`} className="mb-4 md:mb-0">
                    <img
                        src={item.product?.image_url || `https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=400`}
                        alt={item.product?.title || 'Product'}
                        className="w-full md:w-28 md:h-28 object-cover rounded-lg"
                    />
                </Link>

                <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product?.id || ''}`}>
                        <h3 className="text-lg font-medium text-gray-900 hover:text-primary-600 transition-colors">
                            {item.product?.title}
                        </h3>
                    </Link>

                    <div className="flex items-center mt-1">
                        <div className="flex items-center text-amber-500">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < 4 ? 'fill-current' : ''}`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">(4.0)</span>
                    </div>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {item.product?.description || 'No description available'}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                        Seller: {item.product?.seller?.username || 'Unknown'}
                    </p>

                    <div className="flex items-center mt-2">
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded inline-block">
                            {item.product?.category}
                        </span>

                        <div className="flex items-center ml-4 text-primary-600 text-sm">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>Delivery by {getEstimatedDelivery()}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 md:mt-0 flex flex-col space-y-3 md:w-1/4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Price:</span>
                        <span className="font-medium text-primary-600">
                            ${(item.product?.price || 0).toFixed(2)}
                        </span>
                    </div>

                    <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-50 transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-2 text-gray-900 min-w-[3rem] text-center">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-50 transition-colors"
                            aria-label="Increase quantity"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                            ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                        </p>
                    </div>

                    <div className="flex items-center space-x-2 mt-2">
                        <button
                            onClick={() => onSaveForLater(item.product_id)}
                            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${savedForLater.includes(item.product_id) ? 'text-primary-600' : 'text-gray-500'
                                }`}
                            aria-label="Save for later"
                        >
                            <Heart className={`w-5 h-5 ${savedForLater.includes(item.product_id) ? 'fill-current' : ''}`} />
                        </button>

                        <button
                            onClick={() => removeFromCart(item.product_id)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                            aria-label="Remove from cart"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItemCard;
