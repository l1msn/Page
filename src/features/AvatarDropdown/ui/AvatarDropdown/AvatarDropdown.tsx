import React, { JSX, useMemo } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import { RoutePaths } from '@/shared/consts/routerPaths';
import Avatar from '@/shared/ui/Avatar';
import { Dropdown } from '@/shared/ui/Popups';
import Icon from '@/shared/ui/Icon';
import ArrowDownIcon from '@/shared/assets/icons/arrow-down-icon.svg';
import { HStack } from '@/shared/ui/Stack';
import cls from './AvatarDropdown.module.scss';

interface IAvatarDropdownProps {
    className?: string;
}

const AvatarDropdown: React.FC<IAvatarDropdownProps> = ({
    className,
}: IAvatarDropdownProps): JSX.Element => {
    const itemsDropwdown = useMemo(
        () => [
            {
                content: 'Settings',
                href: RoutePaths.getRouteSettings(),
            },
            {
                content: 'Logout',
                href: RoutePaths.getRouteSettings(),
            },
        ],
        [],
    );

    return (
        <Dropdown
            className={classNames('', {}, [className])}
            direction={'bottom left'}
            items={itemsDropwdown}
            trigger={
                <HStack className={cls.trigger}>
                    <Avatar
                        size={40}
                        src={
                            'https://sun9-41.userapi.com/impg/xWupIr7eSZMBvcGAdCPDu1EbkzSDVX7VDM8mKw/wczpsRC_UFk.jpg?size=720x1080&quality=95&sign=76d7d6c245dba7faab008048a657c0ba&type=album'
                        }
                    />
                    <Icon
                        height={32}
                        width={32}
                        Svg={ArrowDownIcon}
                        className={cls.arrowBtn}
                    />
                </HStack>
            }
        />
    );
};

export default AvatarDropdown;
