import React, {
    type ButtonHTMLAttributes,
    type JSX,
    forwardRef,
    ForwardedRef,
} from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import ButtonVariant from '../consts/ButtonVariant';
import ButtonSize from '../consts/ButtonSize';
import { HStack, VStack } from '@/shared/ui/Stack';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    children?: React.ReactNode;
    fullWidth?: boolean;
    addonLeft?: React.ReactNode;
    addonRight?: React.ReactNode;
}

const Button: React.FC<IButtonProps> = forwardRef(
    (
        props: IButtonProps,
        ref: ForwardedRef<HTMLButtonElement>,
    ): JSX.Element => {
        const {
            className,
            disabled,
            children,
            square,
            fullWidth,
            addonLeft,
            addonRight,
            size = 'm',
            variant = 'clear',
            ...otherProps
        } = props;

        return (
            <button
                disabled={disabled}
                className={classNames(
                    cls.Button,
                    {
                        [cls.square]: square,
                        [cls.disabled]: disabled,
                        [cls.fullWidth]: fullWidth,
                    },
                    [className, cls[variant], cls[size]],
                )}
                {...otherProps}
                ref={ref}
            >
                <HStack max justify={'between'}>
                    {addonLeft && (
                        <div className={cls.addonLeft}>{addonLeft}</div>
                    )}
                    <VStack className={cls.text} max align={'center'}>
                        {children}
                    </VStack>
                    {addonRight && (
                        <div className={cls.addonRight}>{addonRight}</div>
                    )}
                </HStack>
            </button>
        );
    },
);

export default Button;
