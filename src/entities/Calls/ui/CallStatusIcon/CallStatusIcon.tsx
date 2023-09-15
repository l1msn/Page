import React, { JSX } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './CallStatusIcon.module.scss';
import Icon from '@/shared/ui/Icon';
import StatusIcon from '@/shared/assets/icons/call-status-icon.svg';
import Motion from '@/shared/ui/Motion';

interface ICallStatusIconProps {
    className?: string;
    inOut: number;
    status: string;
}

const CallStatusIcon: React.FC<ICallStatusIconProps> = ({
    className,
    status,
    inOut,
}: ICallStatusIconProps): JSX.Element => {
    return (
        <Motion>
            <Icon
                hover={false}
                Svg={StatusIcon}
                className={classNames(
                    cls.callStatusIcon,
                    {
                        [cls.colorCallIn]:
                            status == 'Дозвонился' && Boolean(inOut),
                        [cls.colorCallOut]:
                            status == 'Дозвонился' && !Boolean(inOut),
                        [cls.unsuccess]: status == 'Не дозвонился',
                    },
                    [className],
                )}
            />
        </Motion>
    );
};

export default CallStatusIcon;
