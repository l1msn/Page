import React, { JSX } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './CallDateLine.module.scss';
import { DatesUtils } from '@/shared/lib/dates/DatesUtils';
import { HStack } from '@/shared/ui/Stack';

interface ICallDateLineProps {
    className?: string;
    date: string;
    count: number;
}

const CallDateLine: React.FC<ICallDateLineProps> = ({
    className,
    date,
    count,
}: ICallDateLineProps): JSX.Element => {
    return (
        <li className={classNames(cls.callDateLine, {}, [className])}>
            <HStack max align={'center'} className={cls.infoDate}>
                <p className={cls.date}>
                    {date === DatesUtils.getYesterdayDate(Date.now())
                        ? 'вчера'
                        : DatesUtils.getFormatDate(date)}
                </p>
                <p className={cls.count}>{count}</p>
            </HStack>
        </li>
    );
};

export default CallDateLine;
