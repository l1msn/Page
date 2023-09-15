import React, { JSX } from 'react';
import cls from './Balance.module.scss';
import Icon from '@/shared/ui/Icon';
import IconPlus from '@/shared/assets/icons/add-icon.svg';
import { HStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import classNames from '@/shared/lib/classNames/classNames';

interface IBalanceProps {
    className?: string;
}

const Balance: React.FC<IBalanceProps> = ({
    className,
}: IBalanceProps): JSX.Element => {
    return (
        <Card border={'round'}>
            <HStack className={classNames(cls.cardBalance, {}, [className])}>
                <HStack className={cls.balance} gap={'4'}>
                    <p>Баланс:</p>
                    <p className={cls.sum}>272 ₽</p>
                </HStack>
                <Icon className={cls.iconAdd} Svg={IconPlus} />
            </HStack>
        </Card>
    );
};

export default Balance;
