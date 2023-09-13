import React, { JSX, memo } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './MainUserInfo.module.scss';
import { HStack } from '@/shared/ui/Stack';
import AvatarDropdown from '../../AvatarDropdown/ui/AvatarDropdown/AvatarDropdown';
import Icon from '@/shared/ui/Icon';
import SearchIcon from '@/shared/assets/icons/search-big-icon.svg';
import { Text } from '@/shared/ui/Text';
import ArrowDownIcon from '@/shared/assets/icons/arrow-down-icon.svg';

interface IMainUserInfoProps {
    className?: string;
}

const MainUserInfo: React.FC<IMainUserInfoProps> = memo(
    ({ className }: IMainUserInfoProps): JSX.Element => {
        return (
            <HStack
                justify={'between'}
                className={classNames(cls.mainUserInfo, {}, [className])}
            >
                <Icon
                    width={44}
                    height={44}
                    Svg={SearchIcon}
                    className={cls.search}
                />
                <HStack className={cls.userName}>
                    <p>ИП Сидорова Александра Михайловна</p>
                    <Icon Svg={ArrowDownIcon} className={cls.arrowBtn} />
                </HStack>
                <AvatarDropdown />
            </HStack>
        );
    },
);

export default MainUserInfo;
