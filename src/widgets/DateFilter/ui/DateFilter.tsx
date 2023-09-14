import React, { JSX, useMemo } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './DateFilter.module.scss';
import { HStack } from '@/shared/ui/Stack';
import Icon from '@/shared/ui/Icon';
import CalendarIcon from '@/shared/assets/icons/calendar-icon.svg';
import ArrowLeftIcon from '@/shared/assets/icons/arrow-left-icon.svg';
import ArrowRightIcon from '@/shared/assets/icons/arrow-right-icon.svg';
import { Dropdown } from '@/shared/ui/Popups';
import itemsDateFilterDropwdown from '@/widgets/DateFilter/consts/itemsDateFilterDropwdown';

type queryDate = 'days' | 'week' | 'month' | 'year' | 'date';

interface IDateFilterProps {
    className?: string;
    query: queryDate;
}

const queryClasses: Record<queryDate, string> = {
    days: '3 дня',
    week: 'Неделя',
    month: 'Месяц',
    year: 'Год',
    date: 'Указать даты',
};

const DateFilter: React.FC<IDateFilterProps> = ({
    className,
    query = 'days',
}: IDateFilterProps): JSX.Element => {
    return (
        <HStack
            gap={'8'}
            max
            className={classNames(cls.dateFilter, {}, [className])}
        >
            <Icon Svg={ArrowLeftIcon} />
            <HStack gap={'8'}>
                <Dropdown
                    className={classNames(cls.dropdown, {}, [className])}
                    direction={'bottom left'}
                    items={itemsDateFilterDropwdown}
                    trigger={
                        <HStack gap={'8'}>
                            <Icon width={18} height={18} Svg={CalendarIcon} />
                            <p>{queryClasses[query]}</p>
                        </HStack>
                    }
                />
            </HStack>
            <Icon Svg={ArrowRightIcon} />
        </HStack>
    );
};

export default DateFilter;
