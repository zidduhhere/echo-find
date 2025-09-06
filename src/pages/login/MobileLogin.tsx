import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { TextBox } from '../../components/ui/TextBox';
import { Logo } from '../../components/ui/Logo';

interface MobileLoginProps {
    formData: {
        email: string;
        password: string;
    };
    error: string;
    loading: boolean;
    showPassword: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTogglePassword: () => void;
}

export const MobileLogin: React.FC<MobileLoginProps> = ({
    formData,
    error,
    loading,
    showPassword,
    onSubmit,
    onChange,
    onTogglePassword
}) => {
    return (
        <div className="md:hidden min-h-screen bg-white flex flex-col">
            {/* Back Arrow - Top Left */}
            <div className="fixed top-4 left-4 z-50">
                <Link
                    to="/"
                    className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
                {/* Logo */}
                <div className="mb-8">
                    <Logo size="lg" variant="default" />
                </div>

                {/* Login Form - Mobile */}
                <div className="w-full max-w-sm">
                    <form onSubmit={onSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <TextBox
                                name="email"
                                type="email"
                                required
                                label="Email / Username :"
                                value={formData.email}
                                onChange={onChange}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <TextBox
                                name="password"
                                label="Password:"
                                required
                                value={formData.password}
                                onChange={onChange}
                                placeholder="Enter your password"
                                showPasswordToggle
                                showPassword={showPassword}
                                onTogglePassword={onTogglePassword}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in...' : 'Login'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <span className="text-gray-600 text-sm">Don't have an account? </span>
                        <Link to="/register" className="text-primary-600 hover:text-primary-800 font-medium text-sm">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
