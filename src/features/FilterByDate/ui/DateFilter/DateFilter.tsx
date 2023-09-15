import React, { JSX, useCallback, useEffect, useMemo, useState } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './DateFilter.module.scss';
import { HStack } from '@/shared/ui/Stack';
import Icon from '@/shared/ui/Icon';
import CalendarIcon from '@/shared/assets/icons/calendar-icon.svg';
import ArrowLeftIcon from '@/shared/assets/icons/arrow-left-icon.svg';
import ArrowRightIcon from '@/shared/assets/icons/arrow-right-icon.svg';
import { Dropdown, IDropdownItem, ListBox } from '@/shared/ui/Popups';
import useAppDispatch from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { FilterDateSelectors } from '@/features/FilterByDate';
import { filterDateActions } from '../../model/slice/filterDateSlice';
import { callsActions } from '@/entities/Calls';
import { DatesUtils } from '@/shared/lib/dates/DatesUtils';
import InputMask from 'react-input-mask';
import itemsCallsListSortType from '../../../FilterByCalls/consts/itemsCallsListSortType';
import IListBoxItems from '../../../../shared/ui/Popups/ui/ListBox/consts/IListBoxItems';

type queryDate = '3 дня' | 'Неделя' | 'Месяц' | 'year' | 'Год';

interface IDateFilterProps {
    className?: string;
    query: queryDate;
}

const queryClasses: Record<queryDate, string> = {
    '3 дня': '3 дня',
    Неделя: 'Неделя',
    Месяц: 'Месяц',
    year: 'Год',
    Год: 'Указать даты',
};

const DateFilter: React.FC<IDateFilterProps> = ({
    className,
    query = '3 дня',
}: IDateFilterProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const filterByDate = useSelector(
        FilterDateSelectors.getFilterDateCurrentFilter,
    );
    const filterDate = useSelector(
        FilterDateSelectors.getFilterDateCurrentFilterDate,
    );

    const queryList = useSelector(
        FilterDateSelectors.getFilterDateCurrentFilterQuery,
    );

    const [startDateFilter, setStartDateFilter] = useState<string>('');
    const [endDateFilter, setEndDateFilter] = useState<string>('');

    const handleBackQuery = useCallback(() => {
        if (filterByDate?.filter !== queryList[queryList.length - 1]) {
            dispatch(filterDateActions.setBackDates());
            dispatch(callsActions.resetPage());
        }
    }, [dispatch, filterByDate?.filter]);

    const handleNextQuery = useCallback(() => {
        if (filterByDate?.filter !== queryList[queryList.length - 1]) {
            dispatch(filterDateActions.setNextDates());
            dispatch(callsActions.resetPage());
        }
    }, [dispatch, filterByDate?.filter]);

    useEffect(() => {
        if (filterByDate?.filter === queryList[queryList.length - 1]) {
            setStartDateFilter(DatesUtils.getViewDate(filterDate?.start));
            setEndDateFilter(DatesUtils.getViewDate(filterDate?.end));
        }
        dispatch(callsActions.resetPage());
    }, [filterByDate?.filter]);

    const handleCustomDate = useCallback(() => {
        if (
            DatesUtils.validDateWithDot(startDateFilter) &&
            DatesUtils.validDateWithDot(endDateFilter)
        ) {
            dispatch(
                filterDateActions.setFilter(queryList[queryList.length - 1]),
            );
            dispatch(
                filterDateActions.setSpecificDates({
                    startSpecificDate: startDateFilter,
                    endSpecificDate: endDateFilter,
                }),
            );
        }
    }, [endDateFilter, startDateFilter]);

    const handleSetFilter = useCallback(
        (filter: string) => {
            if (filter !== filterByDate?.filter) {
                dispatch(filterDateActions.setFilter(filter));
            }
            dispatch(filterDateActions.setDates(filter));
        },
        [filterByDate?.filter],
    );

    const itemsDateFilterListBox: IListBoxItems[] = useMemo(
        () => [
            {
                value: '3 дня',
                content: '3 дня',
                onClick: () => handleSetFilter('3 дня'),
            },
            {
                value: 'Неделя',
                content: 'Неделя',
                onClick: () => handleSetFilter('Неделя'),
            },
            {
                value: 'Месяц',
                content: 'Месяц',
                onClick: () => handleSetFilter('Месяц'),
            },
            {
                value: 'Год',
                content: 'Год',
                onClick: () => handleSetFilter('Год'),
            },
            {
                preventCloseWhenSelected: true,
                content: (
                    <div className={cls.customDate}>
                        <p>{'Указать даты'}</p>
                        <HStack className={cls.input}>
                            <InputMask
                                mask="99.99.99"
                                placeholder="__.__.__"
                                className={cls.customDateStart}
                                value={startDateFilter}
                                onChange={(e) => {
                                    setStartDateFilter(e.target.value);
                                }}
                            />
                            <p>-</p>
                            <InputMask
                                mask="99.99.99"
                                placeholder="__.__.__"
                                className={cls.customDateEnd}
                                value={endDateFilter}
                                onChange={(e) => {
                                    setEndDateFilter(e.target.value);
                                }}
                            />
                            <Icon
                                width={18}
                                height={18}
                                className={cls.calendar}
                                Svg={CalendarIcon}
                                clickable
                                onClick={handleCustomDate}
                            />
                        </HStack>
                    </div>
                ),
            },
        ],
        [endDateFilter, handleCustomDate, handleSetFilter, startDateFilter],
    );

    return (
        <HStack
            gap={'8'}
            max
            className={classNames(cls.dateFilter, {}, [className])}
        >
            <Icon
                Svg={ArrowLeftIcon}
                clickable
                onClick={handleBackQuery}
                className={cls.leftArrow}
            />
            <HStack gap={'8'} className={cls.datePicker}>
                <Icon width={18} height={18} Svg={CalendarIcon} />
                <ListBox
                    withArrow={false}
                    className={className}
                    value={filterByDate?.filter}
                    items={itemsDateFilterListBox}
                    defaultValue={'3 дня'}
                    direction={'bottom left'}
                />
            </HStack>
            <Icon
                Svg={ArrowRightIcon}
                clickable
                onClick={handleNextQuery}
                className={cls.rightArrow}
            />
        </HStack>
    );
};

export default DateFilter;
