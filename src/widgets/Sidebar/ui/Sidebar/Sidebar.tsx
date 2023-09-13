import React, { JSX, memo, useMemo, useState } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import SidebarItem from '../SidebarItem/SidebarItem';
import { VStack } from '@/shared/ui/Stack';
import { AppLogo } from '@/shared/ui/AppLogo';
import Icon from '@/shared/ui/Icon';
import AddIcon from '@/shared/assets/icons/add-icon.svg';
import AlertIcon from '@/shared/assets/icons/alert-icon.svg';
import useSidebarItems from '../../model/selectors/getSidebarItems';
import Button from '@/shared/ui/Button';
import { AvatarDropdown } from '@/features/AvatarDropdown';

interface ISidebarProps {
    className?: string;
}

const Sidebar: React.FC<ISidebarProps> = memo(
    ({ className }: ISidebarProps): JSX.Element => {
        const [collapsed, setCollapsed] = useState<boolean>(false);

        const onToggle = () => {
            setCollapsed((prevState) => !prevState);
        };

        const sidebarItemsList = useSidebarItems();

        const itemsList = useMemo(
            () =>
                sidebarItemsList.map((item) => (
                    <SidebarItem
                        item={item}
                        collapsed={collapsed}
                        key={item.text}
                    />
                )),
            [sidebarItemsList, collapsed],
        );

        return (
            <aside
                data-testid={'sidebar'}
                className={classNames(
                    cls.SidebarRedesigned,
                    { [cls.collapsedRedesigned]: collapsed },
                    [className],
                )}
            >
                <AppLogo
                    // withShadow={!collapsed}
                    // size={collapsed ? 60 : 120}
                    className={cls.appLogo}
                />
                <VStack role={'navigation'} className={cls.items}>
                    {itemsList}
                    <VStack className={cls.additionalBtn}>
                        <Button
                            className={cls.addBtn}
                            size={'xl'}
                            variant={'filled'}
                            addonRight={
                                <Icon width={28} height={28} Svg={AddIcon} />
                            }
                        >
                            Добавить заказ
                        </Button>
                        <Button
                            className={cls.payBtn}
                            size={'xl'}
                            variant={'filled'}
                            addonRight={
                                <Icon width={30} height={30} Svg={AlertIcon} />
                            }
                        >
                            Оплата
                        </Button>
                    </VStack>
                </VStack>
            </aside>
        );
    },
);

export default Sidebar;
