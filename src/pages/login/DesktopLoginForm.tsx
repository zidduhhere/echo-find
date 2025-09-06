import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { TextBox } from '../../components/ui/TextBox';

interface DesktopLoginFormProps {
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

export const DesktopLoginForm: React.FC<DesktopLoginFormProps> = ({
    formData,
    error,
    loading,
    showPassword,
    onSubmit,
    onChange,
    onTogglePassword
}) => {
    return (
        <div className="w-1/2 bg-white flex items-center justify-center px-8 relative">
            {/* Back Arrow - Top Left */}
            <div className="absolute top-8 left-8">
                <Link
                    to="/"
                    className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
            </div>

            <div className="w-full max-w-md">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                    <p className="text-gray-600">Sign in to continue to EcoFinds</p>
                </div>

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
                            label="Email / Username"
                            value={formData.email}
                            onChange={onChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <TextBox
                            name="password"
                            label="Password"
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
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 space-y-2">
                    <div className="text-center">
                        <span className="text-gray-600 text-sm">Need an account? </span>
                        <Link to="/register" className="text-primary-600 hover:text-primary-800 font-medium text-sm">
                            Register
                        </Link>
                    </div>
                    <div className="text-center">
                        <span className="text-gray-600 text-sm">Forgot your password? </span>
                        <a href="#" className="text-primary-600 hover:text-primary-800 font-medium text-sm">
                            Reset here
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
