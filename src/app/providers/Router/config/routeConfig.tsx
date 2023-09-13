import { MainPage } from '@/pages/MainPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { AppRoutes, RoutePaths } from '@/shared/consts/routerPaths';
import { AppRoutesProps } from '@/shared/types/router';
import NotFoundPage from '@/pages/NotFoundPage';
import { CallsPage } from '@/pages/CallsPage';

const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePaths.getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.TOTAL]: {
        path: RoutePaths.getRouteTotal(),
        element: <MainPage />,
    },
    [AppRoutes.ORDERS]: {
        path: RoutePaths.getRouteOrders(),
        element: <MainPage />,
    },
    [AppRoutes.MESSAGES]: {
        path: RoutePaths.getRouteMessages(),
        element: <MainPage />,
    },
    [AppRoutes.CALLS]: {
        path: RoutePaths.getRouteCalls(),
        element: <CallsPage />,
    },
    [AppRoutes.COUNTERPARTIES]: {
        path: RoutePaths.getRouteCounterparties(),
        element: <MainPage />,
    },
    [AppRoutes.DOCUMENTATION]: {
        path: RoutePaths.getRouteDocumentation(),
        element: <MainPage />,
    },
    [AppRoutes.PERFORMS]: {
        path: RoutePaths.getRoutePerformers(),
        element: <MainPage />,
    },
    [AppRoutes.REPORTS]: {
        path: RoutePaths.getRouteReports(),
        element: <MainPage />,
    },
    [AppRoutes.KNOWLEDGE]: {
        path: RoutePaths.getRouteKnowledge(),
        element: <MainPage />,
    },
    [AppRoutes.SETTINGS]: {
        path: RoutePaths.getRouteSettings(),
        element: <MainPage />,
    },
    [AppRoutes.FORBIDDEN]: {
        path: RoutePaths.getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};

export { routeConfig };
