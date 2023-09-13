import OrdersIcon from '@/shared/assets/icons/orders-icon.svg';
import TotalIcon from '@/shared/assets/icons/total-icon.svg';
import MessagesIcon from '@/shared/assets/icons/messages-icon.svg';
import CounteragentsIcon from '@/shared/assets/icons/counteragents-icon.svg';
import DocumentationIcon from '@/shared/assets/icons/documents-icon.svg';
import PerformersIcon from '@/shared/assets/icons/performers-icon.svg';
import ReportsIcon from '@/shared/assets/icons/reports-icon.svg';
import KnowledgeIcon from '@/shared/assets/icons/knowledge-icon.svg';
import SettingsIcon from '@/shared/assets/icons/settings-icon.svg';
import CallsIcon from '@/shared/assets/icons/calls-icon.svg';
import ISidebar from '../types/ISidebar';
import { RoutePaths } from '@/shared/consts/routerPaths';

const useSidebarItems = () => {
    const SidebarItemsList: ISidebar[] = [
        {
            path: RoutePaths.getRouteTotal(),
            Icon: TotalIcon,
            text: 'Итого',
        },
        {
            path: RoutePaths.getRouteOrders(),
            Icon: OrdersIcon,
            text: 'Заказы',
        },
        {
            path: RoutePaths.getRouteMessages(),
            Icon: MessagesIcon,
            text: 'Сообщения',
        },
        {
            path: RoutePaths.getRouteCalls(),
            Icon: CallsIcon,
            text: 'Звонки',
        },
        {
            path: RoutePaths.getRouteCounterparties(),
            Icon: CounteragentsIcon,
            text: 'Контрагенты',
        },
        {
            path: RoutePaths.getRouteDocumentation(),
            Icon: DocumentationIcon,
            text: 'Документы',
        },
        {
            path: RoutePaths.getRoutePerformers(),
            Icon: PerformersIcon,
            text: 'Исполнители',
        },
        {
            path: RoutePaths.getRouteReports(),
            Icon: ReportsIcon,
            text: 'Отчеты',
        },
        {
            path: RoutePaths.getRouteKnowledge(),
            Icon: KnowledgeIcon,
            text: 'База знаний',
        },
        {
            path: RoutePaths.getRouteSettings(),
            Icon: SettingsIcon,
            text: 'Настройки',
        },
    ];
    return SidebarItemsList;
};

export default useSidebarItems;
