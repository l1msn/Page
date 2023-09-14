import { RoutePaths } from '@/shared/consts/routerPaths';
import { IDropdownItem } from '@/shared/ui/Popups';

const itemsAvatarDropdown: IDropdownItem[] = [
    {
        content: 'Settings',
        href: RoutePaths.getRouteSettings(),
    },
    {
        content: 'Logout',
        href: RoutePaths.getRouteSettings(),
    },
];

export default itemsAvatarDropdown;
