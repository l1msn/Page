import React, { InputHTMLAttributes, JSX } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './CallLine.module.scss';
import { HStack } from '@/shared/ui/Stack';

type HTMLLiProps = Omit<InputHTMLAttributes<HTMLLIElement>, 'type'>;

interface ICallLineProps extends HTMLLiProps {
    className?: string;
    type: string | React.ReactNode;
    time: string;
    employer: string | React.ReactNode;
    call: string;
    source?: string;
    mark?: string | React.ReactNode;
    length?: string;
    header?: boolean;
    audio?: React.ReactNode | string;
}

const CallLine: React.FC<ICallLineProps> = (
    props: ICallLineProps,
): JSX.Element => {
    const {
        className,
        call,
        length,
        mark,
        source,
        time,
        employer,
        type,
        audio,
        header = false,
    } = props;
    return (
        <ul className={header ? cls.callLineHeader : cls.callLine}>
            <HStack max className={cls.content}>
                <li className={cls.type}>{type}</li>
                <li className={cls.time}>{time}</li>
                <li className={cls.employer}>{employer}</li>
                <li className={cls.call}>{call}</li>
                <li className={cls.source}>{source}</li>
                <li className={cls.mark}>{mark}</li>
                <li className={cls.audio}>{audio}</li>
                <li className={cls.length}>{length == '0' ? '' : length}</li>
            </HStack>
        </ul>
    );
};

export default CallLine;
