import { RoutePaths } from '@/shared/consts/routerPaths';
import { IDropdownItem } from '@/shared/ui/Popups';

const itemsDateFilterDropwdown: IDropdownItem[] = [
    {
        content: '3 дня',
        href: RoutePaths.getRouteSettings(),
    },
    {
        content: 'Неделя',
        href: RoutePaths.getRouteSettings(),
    },
    {
        content: 'Месяц',
        href: RoutePaths.getRouteSettings(),
    },
    {
        content: 'Год',
        href: RoutePaths.getRouteSettings(),
    },
    {
        content: 'Указать даты',
        disabled: true,
    },
];

export default itemsDateFilterDropwdown;
