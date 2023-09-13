import React, { JSX } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import { ProgressBarColored } from '@/widgets/ProgressBarColored';
import { HStack } from '@/shared/ui/Stack';
import Motion from '@/shared/ui/Motion';

interface ICallStatisticsBarsProps {
    className?: string;
}

const CallStatisticsBars: React.FC<ICallStatisticsBarsProps> = ({
    className,
}: ICallStatisticsBarsProps): JSX.Element => {
    return (
        <Motion>
            <div className={classNames('', {}, [className])}>
                <HStack gap={'64'} justify={'between'}>
                    <ProgressBarColored
                        label={'Новые звонки '}
                        specialText={`${20} из ${30}`}
                        length={44}
                        color={'green'}
                    />
                    <ProgressBarColored
                        label={'Качество разговоров '}
                        specialText={`${40}%`}
                        length={44}
                        color={'red'}
                    />
                    <ProgressBarColored
                        label={'Конверсия в заказ '}
                        specialText={`${67}%`}
                        length={50}
                        color={'yellow'}
                    />
                </HStack>
            </div>
        </Motion>
    );
};

export default CallStatisticsBars;
