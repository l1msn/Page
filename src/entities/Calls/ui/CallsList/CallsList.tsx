import React, { JSX } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './CallsList.module.scss';

interface ICallsListProps {
    className?: string;
}

const CallsList: React.FC<ICallsListProps> = ({
    className,
}: ICallsListProps): JSX.Element => {
    return <div className={classNames(cls.callsList, {}, [className])}></div>;
};

export default CallsList;
