import React, { JSX } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './Balance.module.scss';
import Icon from '@/shared/ui/Icon';
import IconPlus from '@/shared/assets/icons/add-icon.svg';
import { HStack } from '@/shared/ui/Stack';

interface IBalanceProps {
    className?: string;
}

const Balance: React.FC<IBalanceProps> = ({
    className,
}: IBalanceProps): JSX.Element => {
    return (
        <HStack className={classNames(cls.balance, {}, [className])}>
            <HStack className={cls.balance} gap={'4'}>
                <p>Баланс:</p>
                <p className={cls.sum}>272 ₽</p>
            </HStack>
            <Icon className={cls.iconAdd} Svg={IconPlus} />
        </HStack>
    );
};

export default Balance;
