import React, { JSX } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './DateFilter.module.scss';

interface IDateFilterProps {
    className?: string;
}

const DateFilter: React.FC<IDateFilterProps> = ({
    className,
}: IDateFilterProps): JSX.Element => {
    return <div className={classNames(cls.dateFilter, {}, [className])}></div>;
};

export default DateFilter;
