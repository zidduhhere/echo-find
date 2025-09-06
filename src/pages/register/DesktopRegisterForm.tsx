import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { TextBox } from '../../components/ui/TextBox';
import { Logo } from '../../components/ui/Logo';

interface DesktopRegisterFormProps {
    formData: {
        email: string;
        password: string;
        confirmPassword: string;
        username: string;
    };
    errors: Record<string, string>;
    loading: boolean;
    showPassword: boolean;
    showConfirmPassword: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTogglePassword: () => void;
    onToggleConfirmPassword: () => void;
}

export const DesktopRegisterForm: React.FC<DesktopRegisterFormProps> = ({
    formData,
    errors,
    loading,
    showPassword,
    showConfirmPassword,
    onSubmit,
    onChange,
    onTogglePassword,
    onToggleConfirmPassword
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
                    <div className="flex items-center space-x-3 mb-6">
                        <Logo size="md" />
                        <h1 className="text-2xl font-bold text-gray-900">EcoFinds</h1>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
                    <p className="text-gray-600">Join EcoFinds and start your sustainable journey</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    {errors.general && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                            {errors.general}
                        </div>
                    )}

                    <div>
                        <TextBox
                            name="email"
                            type="email"
                            required
                            label="Email"
                            value={formData.email}
                            onChange={onChange}
                            placeholder="Enter your email"
                            error={errors.email}
                        />
                    </div>

                    <div>
                        <TextBox
                            name="username"
                            type="text"
                            required
                            label="Username"
                            value={formData.username}
                            onChange={onChange}
                            placeholder="Choose a username"
                            error={errors.username}
                        />
                    </div>

                    <div>
                        <TextBox
                            name="password"
                            label="Password"
                            required
                            value={formData.password}
                            onChange={onChange}
                            placeholder="Create a password"
                            showPasswordToggle
                            showPassword={showPassword}
                            onTogglePassword={onTogglePassword}
                            error={errors.password}
                        />
                    </div>

                    <div>
                        <TextBox
                            name="confirmPassword"
                            label="Confirm Password"
                            required
                            value={formData.confirmPassword}
                            onChange={onChange}
                            placeholder="Confirm your password"
                            showPasswordToggle
                            showPassword={showConfirmPassword}
                            onTogglePassword={onToggleConfirmPassword}
                            error={errors.confirmPassword}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <span className="text-gray-600 text-sm">Already have an account? </span>
                    <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};
