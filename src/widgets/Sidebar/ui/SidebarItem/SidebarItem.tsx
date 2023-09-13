import React, { memo } from 'react';
import cls from './SidebarItem.module.scss';
import ISidebar from '../../model/types/ISidebar';
import { useTranslation } from 'react-i18next';
import classNames from '@/shared/lib/classNames/classNames';
import AppLink from '@/shared/ui/AppLink';
import Icon from '@/shared/ui/Icon';

interface ISidebarItemProps {
    item: ISidebar;
    collapsed: boolean;
}

const SidebarItem: React.FC<ISidebarItemProps> = memo(
    ({ item, collapsed }: ISidebarItemProps): React.JSX.Element => {
        const { t } = useTranslation();

        return (
            <AppLink
                to={item.path}
                className={classNames(cls.itemRedesigned, {
                    [cls.collapsedRedesigned]: collapsed,
                })}
                activeClassName={cls.active}
                withDot
            >
                <Icon Svg={item.Icon} />
                <span className={cls.link}>{t(item.text)}</span>
            </AppLink>
        );
    },
);

export default SidebarItem;
