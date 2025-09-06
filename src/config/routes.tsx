import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

// Page Components
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import { Dashboard } from '../pages/Dashboard';
import Profile from '../pages/Profile';
import ProductDetail from '../pages/product/ProductDetail';
import { ProductForm } from '../components/products/ProductForm';
import Cart from '../pages/cart/Cart';
import PurchaseHistory from '../pages/history/PurchaseHistory';
import SearchPage from '../pages/SearchPage';

// Category Pages
import CategoryIndex from '../pages/category/CategoryIndex';
import CategoryPage from '../pages/category/CategoryPage';
import ElectronicsPage from '../pages/category/ElectronicsPage';
import ClothingPage from '../pages/category/ClothingPage';
import HomeAndGardenPage from '../pages/category/HomeAndGardenPage';
import BooksPage from '../pages/category/BooksPage';
import SportsAndRecreationPage from '../pages/category/SportsAndRecreationPage';
import ArtAndCraftsPage from '../pages/category/ArtAndCraftsPage';

// Route Configuration Types
export interface RouteConfig {
    path: string;
    element: ReactElement;
    requiresAuth?: boolean;
    requiresGuest?: boolean; // Only for non-authenticated users
    title?: string;
    description?: string;
    showInNav?: boolean;
    navLabel?: string;
    icon?: string;
}

// Route Groups for better organization
export interface RouteGroup {
    name: string;
    routes: RouteConfig[];
}

// Public Routes (accessible without authentication)
export const publicRoutes: RouteConfig[] = [
    {
        path: '/',
        element: <Home />,
        title: 'EcoFinds - Sustainable Marketplace',
        description: 'Discover pre-loved items and contribute to a sustainable future',
        showInNav: true,
        navLabel: 'Browse',
        icon: 'home'
    },
    {
        path: '/product/:id',
        element: <ProductDetail />,
        title: 'Product Details',
        description: 'View product information and details'
    },
    {
        path: '/cart',
        element: <Cart />,
        title: 'Shopping Cart - EcoFinds',
        description: 'Review items in your cart',
        showInNav: true,
        navLabel: 'Cart',
        icon: 'shopping-cart'
    },
    {
        path: '/profile',
        element: <Profile />,
        title: 'Profile - EcoFinds',
        description: 'View and manage your profile information',
        showInNav: true,
        navLabel: 'Profile',
        icon: 'user'
    },
    {
        path: '/orders',
        element: <PurchaseHistory />,
        title: 'Orders - EcoFinds',
        description: 'View your orders and purchase history',
        showInNav: true,
        navLabel: 'Orders',
        icon: 'package'
    },
    {
        path: '/search',
        element: <SearchPage />,
        title: 'Search Results - EcoFinds',
        description: 'Search for sustainable and eco-friendly products',
        showInNav: false
    },
    // Category Routes
    {
        path: '/categories',
        element: <CategoryIndex />,
        title: 'Browse Categories - EcoFinds',
        description: 'Browse all product categories',
        showInNav: true,
        navLabel: 'Categories',
        icon: 'grid'
    },
    {
        path: '/category/:category',
        element: <CategoryPage />,
        title: 'Category Products - EcoFinds',
        description: 'Browse products by category'
    },
    {
        path: '/category/electronics',
        element: <ElectronicsPage />,
        title: 'Electronics - EcoFinds',
        description: 'Browse sustainable electronics products'
    },
    {
        path: '/category/clothing',
        element: <ClothingPage />,
        title: 'Clothing - EcoFinds',
        description: 'Browse sustainable clothing products'
    },
    {
        path: '/category/home-and-garden',
        element: <HomeAndGardenPage />,
        title: 'Home & Garden - EcoFinds',
        description: 'Browse sustainable home and garden products'
    },
    {
        path: '/category/books',
        element: <BooksPage />,
        title: 'Books - EcoFinds',
        description: 'Browse sustainable books and stationery'
    },
    {
        path: '/category/sports-and-recreation',
        element: <SportsAndRecreationPage />,
        title: 'Sports & Recreation - EcoFinds',
        description: 'Browse sustainable sports and recreation products'
    },
    {
        path: '/category/art-and-crafts',
        element: <ArtAndCraftsPage />,
        title: 'Art & Crafts - EcoFinds',
        description: 'Browse sustainable art and craft supplies'
    }
];

// Authentication Routes (only for non-authenticated users)
export const authRoutes: RouteConfig[] = [
    {
        path: '/login',
        element: <Login />,
        requiresGuest: true,
        title: 'Login - EcoFinds',
        description: 'Sign in to your EcoFinds account'
    },
    {
        path: '/register',
        element: <Register />,
        requiresGuest: true,
        title: 'Register - EcoFinds',
        description: 'Create your EcoFinds account'
    }
];

// Protected Routes (require authentication)
export const protectedRoutes: RouteConfig[] = [
    {
        path: '/dashboard',
        element: <Dashboard />,
        requiresAuth: true,
        title: 'Dashboard - EcoFinds',
        description: 'Manage your products and view your activity',
        showInNav: true,
        navLabel: 'Dashboard',
        icon: 'dashboard'
    },
    {
        path: '/create-product',
        element: <ProductForm mode="create" />,
        requiresAuth: true,
        title: 'Create Product - EcoFinds',
        description: 'List a new product for sale'
    },
    {
        path: '/edit-product/:id',
        element: <ProductForm mode="edit" />,
        requiresAuth: true,
        title: 'Edit Product - EcoFinds',
        description: 'Edit your product listing'
    },
    {
        path: '/purchase-history',
        element: <PurchaseHistory />,
        requiresAuth: true,
        title: 'Purchase History - EcoFinds',
        description: 'View your past purchases',
        showInNav: true,
        navLabel: 'History',
        icon: 'history'
    }
];

// Catch-all route
export const fallbackRoute: RouteConfig = {
    path: '*',
    element: <Navigate to="/" replace />,
    title: 'Page Not Found'
};

// All routes combined
export const allRoutes: RouteConfig[] = [
    ...publicRoutes,
    ...authRoutes,
    ...protectedRoutes,
    fallbackRoute
];

// Route groups for navigation and organization
export const routeGroups: RouteGroup[] = [
    {
        name: 'main',
        routes: publicRoutes
    },
    {
        name: 'auth',
        routes: authRoutes
    },
    {
        name: 'user',
        routes: protectedRoutes
    }
];

// Helper functions
export const getRouteByPath = (path: string): RouteConfig | undefined => {
    return allRoutes.find(route => route.path === path);
};

export const getNavigationRoutes = (isAuthenticated: boolean): RouteConfig[] => {
    return allRoutes.filter(route => {
        if (!route.showInNav) return false;
        if (route.requiresAuth && !isAuthenticated) return false;
        if (route.requiresGuest && isAuthenticated) return false;
        return true;
    });
};

export const getProtectedRoutes = (): RouteConfig[] => {
    return allRoutes.filter(route => route.requiresAuth);
};

export const getPublicRoutes = (): RouteConfig[] => {
    return allRoutes.filter(route => !route.requiresAuth && !route.requiresGuest);
};
