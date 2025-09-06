import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Package, Heart, CreditCard, Settings, LogOut } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Profile: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left sidebar */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary-100 text-primary-600 mb-4">
                            <User size={32} />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            {user ? user.username : 'Guest User'}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            {user ? user.email : 'Sign in to access your profile'}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Link to="/profile" className="flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100">
                            <User className="w-5 h-5 text-primary-600 mr-3" />
                            <span className="font-medium">Profile Information</span>
                        </Link>
                        <Link to="/orders" className="flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100">
                            <Package className="w-5 h-5 text-primary-600 mr-3" />
                            <span className="font-medium">Orders & Returns</span>
                        </Link>
                        <Link to="/wishlist" className="flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100">
                            <Heart className="w-5 h-5 text-primary-600 mr-3" />
                            <span className="font-medium">Saved Items</span>
                        </Link>
                        <Link to="/payment" className="flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100">
                            <CreditCard className="w-5 h-5 text-primary-600 mr-3" />
                            <span className="font-medium">Payment Methods</span>
                        </Link>
                        <Link to="/settings" className="flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100">
                            <Settings className="w-5 h-5 text-primary-600 mr-3" />
                            <span className="font-medium">Account Settings</span>
                        </Link>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        {user ? (
                            <Button
                                variant="outline"
                                className="w-full flex items-center justify-center"
                                onClick={() => logout()}
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </Button>
                        ) : (
                            <Link to="/login">
                                <Button className="w-full">Sign In</Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Main content */}
                <div className="lg:col-span-2">
                    {user ? (
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Profile</h1>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm font-medium text-gray-500 mb-1">Username</p>
                                            <p className="text-gray-900">{user.username}</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                                            <p className="text-gray-900">{user.email}</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm font-medium text-gray-500 mb-1">Member Since</p>
                                            <p className="text-gray-900">{new Date(user.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm font-medium text-gray-500 mb-1">Account Status</p>
                                            <p className="text-green-600 font-medium">Active</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-200">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
                                        <Link to="/orders" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                                            View All
                                        </Link>
                                    </div>
                                    <div className="text-center py-8">
                                        <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                        <h3 className="text-gray-900 font-medium mb-1">No recent orders</h3>
                                        <p className="text-gray-500 mb-4">When you place orders, they will appear here</p>
                                        <Link to="/">
                                            <Button>Start Shopping</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                            <Lock className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to view your profile</h2>
                            <p className="text-gray-600 mb-6">Sign in to view and manage your profile information.</p>
                            <Link to="/login">
                                <Button>Sign In</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
