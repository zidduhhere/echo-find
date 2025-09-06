import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Plus, Home, BarChart3, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useRouteInfo } from '../../hooks/useRouteInfo';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';

// Icon mapping for route icons
const iconMap = {
    home: Home,
    dashboard: BarChart3,
    'shopping-cart': ShoppingCart,
    history: Clock,
    plus: Plus
};

export const DynamicHeader: React.FC = () => {
    const { user, loading, logout } = useAuth();
    const { cart } = useCart();
    const { navigationRoutes } = useRouteInfo();

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    if (loading) {
        return (
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                            <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                            <Logo size="sm" variant="light" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">EcoFinds</span>
                    </Link>

                    {/* Dynamic Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigationRoutes.map((route) => {
                            const IconComponent = route.icon ? iconMap[route.icon as keyof typeof iconMap] : null;

                            return (
                                <Link
                                    key={route.path}
                                    to={route.path}
                                    className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600 transition-colors"
                                >
                                    {IconComponent && <IconComponent className="w-4 h-4" />}
                                    <span>{route.navLabel}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right section */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                {/* Cart with dynamic counter */}
                                <Link to="/cart" className="relative">
                                    <Button variant="ghost" size="sm">
                                        <ShoppingCart className="w-5 h-5" />
                                        {cartItemCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                {cartItemCount}
                                            </span>
                                        )}
                                    </Button>
                                </Link>

                                {/* Quick Action - Create Product */}
                                <Link to="/create-product">
                                    <Button variant="secondary" size="sm">
                                        <Plus className="w-4 h-4 mr-1" />
                                        Sell
                                    </Button>
                                </Link>

                                {/* User Info */}
                                <div className="flex items-center space-x-2">
                                    <User className="w-5 h-5 text-gray-600" />
                                    <span className="text-sm text-gray-700">{user.username}</span>
                                </div>

                                {/* Logout */}
                                <Button variant="ghost" size="sm" onClick={logout}>
                                    <LogOut className="w-4 h-4" />
                                </Button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link to="/login">
                                    <Button variant="outline" size="sm">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button size="sm">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
