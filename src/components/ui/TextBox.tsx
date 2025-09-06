import { InputHTMLAttributes, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface TextBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    showPasswordToggle?: boolean;
    showPassword?: boolean;
    onTogglePassword?: () => void;
    variant?: 'default' | 'search' | 'minimal';
    size?: 'default' | 'sm' | 'lg';
}

export const TextBox = forwardRef<HTMLInputElement, TextBoxProps>(
    (
        {
            className,
            label,
            error,
            type = 'text',
            showPasswordToggle = false,
            showPassword = false,
            onTogglePassword,
            variant = 'default',
            size = 'default',
            ...props
        },
        ref
    ) => {
        // Size-based classes
        const sizeClasses = {
            sm: 'px-3 py-2 text-sm',
            default: 'px-4 py-3',
            lg: 'px-5 py-4 text-lg'
        };

        // Variant-based classes
        const variantClasses = {
            default: 'border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500',
            search: 'border-2 border-gray-200 rounded-full focus:outline-none focus:border-primary-500',
            minimal: 'border-b-2 border-gray-300 rounded-none focus:outline-none focus:border-primary-500'
        };

        // Conditional error classes
        const errorClasses = error
            ? 'border-red-300 focus:border-red-500 bg-red-50'
            : 'border-gray-300 focus:border-primary-500 bg-white';

        return (
            <div className="w-full">
                {label && (
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
                        className={cn(
                            'w-full text-gray-900 placeholder-gray-400 transition-colors',
                            sizeClasses[size],
                            variantClasses[variant],
                            showPasswordToggle && 'pr-12',
                            error && errorClasses,
                            className
                        )}
                        {...props}
                    />

                    {showPasswordToggle && (
                        <button
                            type="button"
                            onClick={onTogglePassword}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    )}
                </div>
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
        );
    }
);

TextBox.displayName = 'TextBox';
