/**
 * The AuthContext component provides authentication-related state and functions to its children.
 * It manages user authentication state, registration data, and validation errors.
 * 
 * @context AuthContext
 * 
 * @property {User | null} user - The current authenticated user object or null if not authenticated
 * @property {boolean} loading - Indicates whether authentication state is being loaded
 * @property {RegistrationFormData} registrationData - Form data for user registration
 * @property {ValidationErrors} validationErrors - Validation errors for registration form
 * @property {(email: string, password: string) => Promise<boolean>} login - Function to log in a user
 * @property {(data: Partial<RegistrationFormData>) => void} updateRegistrationData - Function to update registration form data
 * @property {(email: string, password: string, username: string) => Promise<boolean>} createAccount - Function to create a new user account
 * @property {() => void} logout - Function to log out the current user
 * @property {(updatedUser: User) => void} updateUser - Function to update user profile information
 * 
 * @example
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../types';
import { getCurrentUser } from '../utils/storage';
import { RegistrationFormData, ValidationErrors } from '../types/auth';
import { validateRegistrationData as validateRegData } from '../validations/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  registrationData: RegistrationFormData;
  validationErrors: ValidationErrors;
  login: (email: string, password: string) => Promise<boolean>;
  updateRegistrationData: (data: Partial<RegistrationFormData>) => void;
  createAccount: () => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [loading, setLoading] = useState(true);

  // Initialize the registration data state
  const [registrationData, setRegistrationData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    agreeToTerms: false,
  });

  // State for validation errors
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update registration data
  const updateRegistrationData = (data: Partial<RegistrationFormData>) => {
    setRegistrationData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  // Create account function
  const createAccount = async (): Promise<boolean> => {
    // Import and use the validateRegistrationData function directly
    const errors = validateRegData(registrationData);
    setValidationErrors(errors);

    // Return false if there are validation errors
    if (Object.keys(errors).length > 0) {
      return false;
    }

    try {
      // Register user with Supabase authentication
      const { error } = await supabase.auth.signUp({
        email: registrationData.email,
        password: registrationData.password,
        options: {
          data: {
            first_name: registrationData.firstName,
            last_name: registrationData.lastName,
            username: registrationData.username,
          },
        },
      });

      if (error) throw error;

      // Additional profile creation in your database if needed
      // This will be handled by the auth webhook that adds to the profiles table

      return true;
    } catch (error: any) {
      console.error('Registration error:', error);
      setValidationErrors({
        general: error instanceof Error ? error.message : 'Failed to create account'
      });
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    supabase.auth.signOut();
  };

  const updateUser = (updatedUser: User) => {
    supabase
      .from('profiles')
      .update({
        username: updatedUser.username,
        email: updatedUser.email,
      })
      .eq('id', updatedUser.id)
      .then(() => {
        setUser(updatedUser);
      });
  };

  // Provide all values to the context
  const contextValue = {
    user,
    loading,
    login,
    registrationData,
    validationErrors,
    updateRegistrationData,
    createAccount,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
