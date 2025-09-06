import { Routes, Route } from 'react-router-dom';
import { RouteGuard } from './RouteGuard';
import { allRoutes } from '../../config/routes';

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {allRoutes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <RouteGuard route={route}>
                            {route.element}
                        </RouteGuard>
                    }
                />
            ))}
        </Routes>
    );
};
