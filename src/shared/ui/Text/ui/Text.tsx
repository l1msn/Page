import React, { JSX, memo } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';
import TextVariant from '../consts/TextVariant';
import TextAlign from '../consts/TextAlign';
import TextSize from '../consts/TextSize';
import TextColor from '@/shared/ui/Text/consts/TextColor';

interface ITextProps {
    className?: string;
    title?: string | number;
    text?: string | number;
    size?: TextSize;
    variant?: TextVariant;
    align?: TextAlign;
    bold?: boolean;
    color?: TextColor;

    'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToClass: Record<TextSize, string> = {
    s: cls['size_s'],
    m: cls['size_m'],
    l: cls['size_l'],
};

const mapColorToClass: Record<TextColor, string> = {
    default: '',
    green: cls['color_green'],
    yellow: cls['color_yellow'],
    red: cls['color_red'],
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
};

const Text: React.FC<ITextProps> = memo((props: ITextProps): JSX.Element => {
    const {
        className,
        title,
        text,
        color = 'default',
        bold = false,
        align = 'left',
        variant = 'primary',
        size = 'm',
        'data-testid': dataTestId = 'Text',
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];
    const sizeClass = mapSizeToClass[size];
    const colorClass = mapColorToClass[color];

    return (
        <div
            className={classNames(cls.Text, { [cls.bold]: bold }, [
                className,
                cls[size],
                cls[align],
                cls[variant],
                sizeClass,
                colorClass,
            ])}
        >
            {title && (
                <HeaderTag
                    data-testid={dataTestId + '.Header'}
                    className={cls.title}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p data-testid={dataTestId + '.Paragraph'} className={cls.text}>
                    {text}
                </p>
            )}
        </div>
    );
});

export default Text;
