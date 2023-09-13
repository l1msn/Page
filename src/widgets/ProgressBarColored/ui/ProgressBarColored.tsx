import React, { JSX, memo } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './ProgressBarColored.module.scss';
import ProgressBar from '@ramonak/react-progress-bar';
import { Text } from '@/shared/ui/Text';
import { ProgressBarColor } from '../consts/progressBarColoredStatus';
import { HStack, VStack } from '@/shared/ui/Stack';
import TextColor from '@/shared/ui/Text/consts/TextColor';

interface IProgressBarProps {
    className?: string;
    label?: string;
    length: number;
    color?: ProgressBarColor;
    specialText?: string;
}

const mapColorTextToString: Record<ProgressBarColor, string> = {
    green: '#28A879',
    yellow: '#FFD500',
    red: '#EA1A4F',
    blue: '#002CFB',
};

const mapColorToString: Record<ProgressBarColor, string> = {
    green: cls['green'],
    yellow: cls['yellow'],
    red: cls['red'],
    blue: cls['blue'],
};

const ProgressBarColored: React.FC<IProgressBarProps> = memo(
    ({
        className,
        label,
        color = 'blue',
        specialText,
        length = 50,
    }: IProgressBarProps): JSX.Element => {
        const colorTextClass = mapColorTextToString[color];
        const colorClass = mapColorToString[color];

        return (
            <VStack className={classNames(cls.progressBar, {}, [className])}>
                <HStack className={cls.text} max gap={'4'}>
                    {label && <p>{label + ' '}</p>}
                    {specialText && <p className={colorClass}>{specialText}</p>}
                </HStack>
                <ProgressBar
                    completed={length}
                    height="6px"
                    width="156px"
                    borderRadius="12px"
                    bgColor={colorTextClass}
                    isLabelVisible={false}
                    animateOnRender
                />
            </VStack>
        );
    },
);

export default ProgressBarColored;
