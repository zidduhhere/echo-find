import React from 'react';
import { Logo } from '../../components/ui/Logo';

export const DesktopWelcomeSection: React.FC = () => {
    return (
        <div className="w-1/2 bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center px-8">
            <div className="text-center text-white max-w-md">
                <div className="mb-8">
                    <Logo size="lg" variant="light" />
                </div>

                <h1 className="text-4xl font-bold mb-6">Welcome to EcoFinds</h1>
                <p className="text-primary-100 text-lg leading-relaxed mb-8">
                    Sustainable Commerce Platform - Building a greener future through conscious shopping and selling
                </p>

                <div className="space-y-4 text-primary-200">
                    <div className="flex items-center justify-center space-x-3">
                        <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
                        <span className="text-sm">Eco-friendly marketplace</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3">
                        <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
                        <span className="text-sm">Sustainable shopping choices</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3">
                        <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
                        <span className="text-sm">Community-driven platform</span>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-primary-600">
                    <p className="text-xs text-primary-300">
                        Designed and developed by EcoFinds Team
                    </p>
                </div>
            </div>
        </div>
    );
};
