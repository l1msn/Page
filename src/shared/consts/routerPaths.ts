enum AppRoutes {
    MAIN = 'main',
    TOTAL = 'total',
    ORDERS = 'orders',
    MESSAGES = 'messages',
    CALLS = 'calls',
    COUNTERPARTIES = 'counterparties',
    DOCUMENTATION = 'documentation',
    PERFORMS = 'performs',
    REPORTS = 'reports',
    KNOWLEDGE = 'knowledge',
    SETTINGS = 'settings',
    FORBIDDEN = 'forbidden',
    NOT_FOUND = 'not_found',
}

class RoutePaths {
    static getRouteMain() {
        return '/';
    }
    static getRouteTotal() {
        return '/total';
    }
    static getRouteOrders() {
        return '/orders';
    }
    static getRouteMessages() {
        return '/messages';
    }
    static getRouteCalls() {
        return '/calls';
    }
    static getRouteCounterparties() {
        return '/counterparties';
    }
    static getRouteDocumentation() {
        return '/documentation';
    }
    static getRoutePerformers() {
        return '/performers';
    }
    static getRouteReports() {
        return '/reports';
    }
    static getRouteKnowledge() {
        return '/knowledge';
    }
    static getRouteSettings() {
        return '/settings';
    }
    static getRouteForbidden() {
        return '/forbidden';
    }
}

const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [RoutePaths.getRouteMain()]: AppRoutes.MAIN,
    [RoutePaths.getRouteTotal()]: AppRoutes.TOTAL,
    [RoutePaths.getRouteOrders()]: AppRoutes.ORDERS,
    [RoutePaths.getRouteMessages()]: AppRoutes.MESSAGES,
    [RoutePaths.getRouteCalls()]: AppRoutes.CALLS,
    [RoutePaths.getRouteCounterparties()]: AppRoutes.COUNTERPARTIES,
    [RoutePaths.getRouteDocumentation()]: AppRoutes.DOCUMENTATION,
    [RoutePaths.getRoutePerformers()]: AppRoutes.PERFORMS,
    [RoutePaths.getRouteReports()]: AppRoutes.REPORTS,
    [RoutePaths.getRouteKnowledge()]: AppRoutes.KNOWLEDGE,
    [RoutePaths.getRouteSettings()]: AppRoutes.SETTINGS,
    [RoutePaths.getRouteForbidden()]: AppRoutes.FORBIDDEN,
};

export { AppRoutes, RoutePaths, AppRouteByPathPattern };
