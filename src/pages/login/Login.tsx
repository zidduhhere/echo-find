import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MobileLogin } from './MobileLogin';
import { DesktopLoginForm } from './DesktopLoginForm';
import { DesktopWelcomeSection } from './DesktopWelcomeSection';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as any)?.from?.pathname || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const success = await login(formData.email, formData.password);

            if (success) {
                navigate(from, { replace: true });
            } else {
                setError('Invalid email or password. For demo purposes, try registering a new account.');
            }
        } catch (err) {
            setError('An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(''); // Clear error when user starts typing
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const commonProps = {
        formData,
        error,
        loading,
        showPassword,
        onSubmit: handleSubmit,
        onChange: handleChange,
        onTogglePassword: handleTogglePassword
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Mobile Layout */}
            <MobileLogin {...commonProps} />

            {/* Desktop Layout */}
            <div className="hidden md:flex min-h-screen">
                <DesktopLoginForm {...commonProps} />
                <DesktopWelcomeSection />
            </div>
        </div>
    );
};

export default Login;
