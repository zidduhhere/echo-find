import React from 'react';
import { Button } from '../../components/ui/Button';
import { Truck, CheckCircle2, AlertCircle } from 'lucide-react';
import { CartItem } from '../../types';

interface OrderSummaryProps {
    cart: CartItem[];
    getTotalPrice: () => number;
    getTotalItems: () => number;
    getEstimatedDelivery: () => string;
    loading: boolean;
    handleCheckout: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
    cart,
    getTotalPrice,
    getTotalItems,
    getEstimatedDelivery,
    loading,
    handleCheckout
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items ({getTotalItems()})</span>
                    <span className="text-gray-900">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">${(getTotalPrice() * 0.05).toFixed(2)}</span>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary-600">${(getTotalPrice() * 1.05).toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                    Inclusive of all taxes
                </p>
            </div>

            {/* Estimated Delivery */}
            <div className="bg-gray-50 p-3 rounded-lg mb-6">
                <div className="flex items-start">
                    <Truck className="w-5 h-5 text-primary-600 mt-0.5 mr-2" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">Estimated Delivery</p>
                        <p className="text-sm text-gray-600">{getEstimatedDelivery()}</p>
                    </div>
                </div>
            </div>

            {/* Product list summary */}
            {cart.length > 0 && (
                <div className="mb-6 max-h-60 overflow-y-auto border border-gray-100 rounded-lg">
                    {cart.map(item => (
                        <div key={item.id} className="p-3 border-b border-gray-100 last:border-b-0 flex justify-between">
                            <div className="flex items-center space-x-2">
                                <img
                                    src={item.product?.image_url || `https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=400`}
                                    alt={item.product?.title || 'Product'}
                                    className="w-10 h-10 object-cover rounded"
                                />
                                <div>
                                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.product?.title}</p>
                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                                ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Safe and Secure */}
            <div className="mb-6 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-primary-600 mr-2" />
                    <span>Free shipping on all orders</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-primary-600 mr-2" />
                    <span>Secure payment processing</span>
                </div>
            </div>

            <Button
                onClick={handleCheckout}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white"
                disabled={loading}
                size="lg"
            >
                {loading ? 'Processing...' : 'Proceed to Checkout'}
            </Button>


        </div>
    );
};

export default OrderSummary;
