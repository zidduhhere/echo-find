import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteByPath, getNavigationRoutes } from "../config/routes";
import { useAuth } from "../context/AuthContext";

export const useRouteInfo = () => {
  const location = useLocation();
  const { user } = useAuth();

  const currentRoute = getRouteByPath(location.pathname);
  const navigationRoutes = getNavigationRoutes(!!user);

  const setPageTitle = (title?: string) => {
    if (title) {
      document.title = title;
    } else if (currentRoute?.title) {
      document.title = currentRoute.title;
    }
  };

  const setPageDescription = (description?: string) => {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        description || currentRoute?.description || ""
      );
    }
  };

  return {
    currentRoute,
    navigationRoutes,
    isAuthenticated: !!user,
    setPageTitle,
    setPageDescription,
    location,
  };
};

// Custom hook for route-based page metadata
export const usePageMeta = () => {
  const { currentRoute, setPageTitle, setPageDescription } = useRouteInfo();

  useEffect(() => {
    if (currentRoute) {
      setPageTitle(currentRoute.title);
      setPageDescription(currentRoute.description);
    }
  }, [currentRoute, setPageTitle, setPageDescription]);

  return {
    title: currentRoute?.title,
    description: currentRoute?.description,
  };
};
