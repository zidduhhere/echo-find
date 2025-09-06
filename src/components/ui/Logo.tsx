import { Leaf } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'light' | 'dark';

    className?: string;
}

export function Logo({
    size = 'md',
    variant = 'default',

    className
}: LogoProps) {
    // Define sizes for the container
    const containerSizes = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-20 h-20'
    };

    // Define sizes for the icon
    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-10 h-10'
    };

    // Define text sizes


    // Define colors based on variant
    const colors = {
        default: {
            bg: 'bg-gradient-to-br from-primary-500 to-primary-700',
            icon: 'text-white',
            text: 'text-gray-900'
        },
        light: {
            bg: 'bg-white bg-opacity-10',
            icon: 'text-primary-200',
            text: 'text-primary-200'
        },
        dark: {
            bg: 'bg-black bg-opacity-10',
            icon: 'text-primary-600',
            text: 'text-gray-800'
        }
    };

    return (
        <div className={cn('flex flex-col items-center', className)}>
            <div
                className={cn(
                    'rounded-full flex items-center justify-center mb-2',
                    containerSizes[size],
                    colors[variant].bg
                )}
            >
                <Leaf className={cn(iconSizes[size], colors[variant].icon)} />
            </div>


        </div>
    );
}
