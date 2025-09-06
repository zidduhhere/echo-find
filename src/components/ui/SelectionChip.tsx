import React from 'react';
import { X } from 'lucide-react';

interface SelectionChipProps {
    children: React.ReactNode;
    onClick?: () => void;
    onRemove?: () => void;
    selected?: boolean;
    disabled?: boolean;
    variant?: 'default' | 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    removable?: boolean;
    className?: string;
}

const SelectionChip: React.FC<SelectionChipProps> = ({
    children,
    onClick,
    onRemove,
    selected = false,
    disabled = false,
    variant = 'default',
    size = 'md',
    removable = false,
    className = ''
}) => {
    const getVariantStyles = () => {
        const baseStyles = "transition-all duration-200 ease-in-out";

        if (disabled) {
            return `${baseStyles} bg-gray-200 text-gray-400 cursor-not-allowed`;
        }

        if (selected) {
            switch (variant) {
                case 'primary':
                    return `${baseStyles} bg-primary-500 text-white shadow-md shadow-primary-200`;
                case 'secondary':
                    return `${baseStyles} bg-gray-700 text-white shadow-sm`;
                case 'outline':
                    return `${baseStyles} bg-primary-50 text-primary-700 border border-primary-600 hover:bg-primary-100`;
                default:
                    return `${baseStyles} bg-primary-500 text-white shadow-md shadow-primary-200`;
            }
        }

        // Non-selected states
        switch (variant) {
            case 'primary':
                return `${baseStyles} bg-gray-100 text-gray-700 hover:bg-gray-200`;
            case 'secondary':
                return `${baseStyles} bg-gray-100 text-gray-700 hover:bg-gray-200`;
            case 'outline':
                return `${baseStyles} bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-100`;
            default:
                return `${baseStyles} bg-gray-100 text-gray-700 hover:bg-gray-200`;
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'sm':
                return {
                    padding: "px-4 py-1.5 text-xs",
                    iconSize: "w-3 h-3",
                    iconSpacing: "ml-1.5"
                };
            case 'lg':
                return {
                    padding: "px-6 py-3 text-base",
                    iconSize: "w-5 h-5",
                    iconSpacing: "ml-3"
                };
            default:
                return {
                    padding: "px-5 py-2 text-sm",
                    iconSize: "w-4 h-4",
                    iconSpacing: "ml-2"
                };
        }
    };

    const variantStyles = getVariantStyles();
    const sizeStyles = getSizeStyles();

    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!disabled && onRemove) {
            onRemove();
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            className={`
                inline-flex items-center justify-center
                ${sizeStyles.padding}
                ${variantStyles}
                rounded-full
                font-medium
                whitespace-nowrap
                focus:outline-none
                focus:ring-2
                focus:ring-primary-500
                focus:ring-offset-1
                ${className}
            `}
        >
            <span>{children}</span>
            {removable && !disabled && (
                <button
                    type="button"
                    onClick={handleRemove}
                    className={`
                        ${sizeStyles.iconSpacing}
                        hover:bg-black hover:bg-opacity-10
                        rounded-full
                        p-0.5
                        transition-colors
                    `}
                >
                    <X className={sizeStyles.iconSize} />
                </button>
            )}
        </button>
    );
};

export default SelectionChip;
