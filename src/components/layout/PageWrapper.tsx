import { usePageMeta } from '../../hooks/useRouteInfo';

// Example of how to use route metadata in a page component
export const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Automatically sets page title and description based on current route
    usePageMeta();

    return (
        <>
            {/* Page metadata is automatically set by usePageMeta hook */}
            {children}
        </>
    );
};
