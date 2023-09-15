import React, { JSX } from 'react';
import Icon from '@/shared/ui/Icon';
import ArrowDownIcon from '@/shared/assets/icons/arrow-down-icon.svg';
import { HStack } from '@/shared/ui/Stack';
import cls from './AvatarDropdown.module.scss';
import Foto from '@/shared/assets/foto/user.png';

interface IAvatarDropdownProps {
    className?: string;
}

const AvatarDropdown: React.FC<IAvatarDropdownProps> = ({
    className,
}: IAvatarDropdownProps): JSX.Element => {
    return (
        <HStack className={cls.trigger}>
            <img alt={'foto'} src={Foto} />
            <Icon
                height={32}
                width={32}
                Svg={ArrowDownIcon}
                className={cls.arrowBtn}
            />
        </HStack>
    );
};

export default AvatarDropdown;
