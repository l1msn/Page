import React, { JSX, memo } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import { HStack } from '../../Stack';
import Logo from '@/shared/assets/icons/logo-icon.svg';
import Icon from '../../Icon';

interface IAppLogoProps {
    className?: string;
    width?: number;
    height?: number;
    withShadow?: boolean;
}

const AppLogo: React.FC<IAppLogoProps> = memo(
    ({
        className,
        withShadow = true,
        width = 109,
        height = 29,
    }: IAppLogoProps): JSX.Element => {
        return (
            <HStack
                max
                justify={'start'}
                className={classNames(cls.appLogoWrapper, {}, [className])}
            >
                <Icon
                    hover={false}
                    width={width}
                    height={height}
                    color={'black'}
                    className={cls.appLogo}
                    Svg={Logo}
                />
                {withShadow && <div className={cls.gradientBig} />}
                <div className={cls.gradientSmall} />
            </HStack>
        );
    },
);

export default AppLogo;
