import React, { JSX, memo } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/Stack';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { useLocation } from 'react-router-dom';
import { RoutePaths } from '@/shared/consts/routerPaths';
import { Text } from '@/shared/ui/Text';
import CallStatisticsBars from '@/features/CallStatisticsBars/ui/CallStatisticsBars';
import useGetTodayDate from '@/shared/lib/hooks/useGetTodayDate/useGetTodayDate';
import MainUserInfo from '@/features/MainUserInfo';

interface INavbarProps {
    className?: string;
}

const Navbar: React.FC<INavbarProps> = memo(
    ({ className }: INavbarProps): JSX.Element => {
        const { t } = useTranslation();

        const location = useLocation();
        const { todayWeekDay, todayDay, todayMonth } = useGetTodayDate();
        console.log(location);

        return (
            <header className={classNames(cls.navbar, {}, [className])}>
                <HStack
                    gap={'16'}
                    className={cls.navbarContent}
                    justify={'between'}
                    max
                >
                    <p className={cls.date}>
                        {`${todayWeekDay}, ${todayDay} ${todayMonth}`}
                    </p>
                    {location.pathname == RoutePaths.getRouteCalls() && (
                        <CallStatisticsBars />
                    )}
                    <MainUserInfo />
                </HStack>
            </header>
        );
    },
);

export default Navbar;
