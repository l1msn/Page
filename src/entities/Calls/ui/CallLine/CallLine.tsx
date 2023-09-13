import React, { JSX } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './CallLine.module.scss';

interface ICallLineProps {
    className?: string;
}

const CallLine: React.FC<ICallLineProps> = ({
    className,
}: ICallLineProps): JSX.Element => {
    return <div className={classNames(cls.callLine, {}, [className])}></div>;
};

export default CallLine;
