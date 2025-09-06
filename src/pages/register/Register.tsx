import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validateRegisterForm } from '../../validations/register';
import { DesktopRegisterForm } from './DesktopRegisterForm';
import { DesktopWelcomeSection } from './DesktopWelcomeSection';
import { MobileRegister } from './MobileRegister';

/**
 * Register component that serves as the main container for the registration page.
 * It manages form state and authentication logic while delegating UI rendering
 * to specialized components for desktop and mobile views.
 */
const Register: React.FC = () => {
    // Form state
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    });

    // UI state
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Hooks
    const { createAccount, updateRegistrationData } = useAuth();
    const navigate = useNavigate();

    // Update registration data in the context only when the form is submitted
    // This avoids the infinite loop caused by continuous updates
    const updateFormDataInContext = () => {
        updateRegistrationData({
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            username: formData.username,
            // Set default values for required fields
            firstName: 'User', // Temporary default
            lastName: 'Account', // Temporary default
            agreeToTerms: true // Default to true for now
        });
    };

    /**
     * Validates the form data and updates error state
     * @returns boolean indicating if the form is valid
     */
    const validateForm = () => {
        const newErrors = validateRegisterForm(formData);
        setErrors(newErrors as { [key: string]: string });
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Handles form submission and account creation
     * @param e Form submission event
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Update form data in context before creating account
        updateFormDataInContext();
        setLoading(true);

        try {
            console.log("Creating account with data:", formData);
            const success = await createAccount();

            if (success) {
                navigate('/');
            } else {
                console.log("Account creation failed");
                setErrors({ email: 'An account with this email already exists' });
            }
        } catch (err) {
            console.error("Registration error:", err);
            setErrors({ general: 'An error occurred during registration' });
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handles form input changes
     * @param e Input change event
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    /**
     * Toggle password visibility
     */
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    /**
     * Toggle confirm password visibility
     */
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Mobile Layout */}
            <div className="md:hidden">
                <MobileRegister
                    formData={formData}
                    errors={errors}
                    loading={loading}
                    showPassword={showPassword}
                    showConfirmPassword={showConfirmPassword}
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    onTogglePassword={handleTogglePassword}
                    onToggleConfirmPassword={handleToggleConfirmPassword}
                />
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex min-h-screen justify-center aign-center">
                {/* Left Side - Register Form */}
                <div className="w-1/2 bg-white">
                    <DesktopRegisterForm
                        formData={formData}
                        errors={errors}
                        loading={loading}
                        showPassword={showPassword}
                        showConfirmPassword={showConfirmPassword}
                        onSubmit={handleSubmit}
                        onChange={handleChange}
                        onTogglePassword={handleTogglePassword}
                        onToggleConfirmPassword={handleToggleConfirmPassword}
                    />
                </div>

                {/* Right Side - Welcome Section */}
                <DesktopWelcomeSection />
            </div>
        </div>
    );
};

export default Register;
