import React, { JSX, useCallback, useEffect, useMemo, useState } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './CallsList.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import SearchIcon from '@/shared/assets/icons/search-small-icon.svg';
import Icon from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import {
    CallSortType,
    filterCallsActions,
    FilterCallsSelectors,
    itemsCallsListSortType,
} from '@/features/FilterByCalls';
import CallLine from '@/entities/Calls/ui/CallLine/CallLine';
import useAppDispatch from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { CallsSelectors, fetchCalls, IDatesPages } from '@/entities/Calls';
import { useSelector } from 'react-redux';
import { FilterDateSelectors } from '@/features/FilterByDate';
import { ICall, IFilterCalls } from '@/entities/Calls/model/types/ICallType';
import CallStatusIcon from '@/entities/Calls/ui/CallStatusIcon/CallStatusIcon';
import { DatesUtils } from '@/shared/lib/dates/DatesUtils';
import AppImage from '@/shared/ui/AppImage';
import Loader from '@/shared/ui/Loader';
import { Text } from '@/shared/ui/Text';
import CallDateLine from '@/entities/Calls/ui/CallDateLine/CallDateLine';
import AudioPlayer from '@/features/AudioPlayer';

interface ICallsListProps {
    className?: string;
}

const CallsList: React.FC<ICallsListProps> = ({
    className,
}: ICallsListProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const [sortedCalls, setSortedCalls] = useState<ICall[]>([]);
    const [hoveredCallId, setHoveredCallId] = useState<number | null>();
    const [activeId, setActiveId] = useState<number | null>(null);

    const isLoading = useSelector(CallsSelectors.getCallsIsLoading);
    const error = useSelector(CallsSelectors.getCallsError);

    const date = useSelector(
        FilterDateSelectors.getFilterDateCurrentFilterDate,
    );
    const page = useSelector(CallsSelectors.getCallsPage);
    const calls = useSelector(CallsSelectors.getCallsData);

    const filterType = useSelector(
        FilterCallsSelectors.getFilterCallsCurrentFilter,
    );

    const checkHoveredById = useCallback(
        (id: number) => hoveredCallId === id,
        [hoveredCallId],
    );

    const onChangeTypeCalls = useCallback(
        (value: itemsCallsListSortType) => {
            dispatch(
                filterCallsActions.setFilter({
                    filter: value,
                    name: value,
                }),
            );
        },
        [dispatch],
    );

    useEffect(() => {
        const defaultData: IDatesPages = {
            date: date,
            page: page,
        };
        dispatch(fetchCalls(defaultData));

        if (sortedCalls.length) setSortedCalls([]);
    }, [date]);
    console.log(calls);

    useEffect(() => {
        if (calls?.results.length) {
            switch (filterType?.filter) {
                case 'Входящие звонки':
                    setSortedCalls(
                        calls.results.filter(
                            (call: ICall) => call.in_out === 1,
                        ),
                    );
                    break;
                case 'Исходящие звонки':
                    setSortedCalls(
                        calls.results.filter(
                            (call: ICall) => call.in_out === 0,
                        ),
                    );
                    break;
                default:
                    setSortedCalls(calls.results);
            }
        }
    }, [calls, filterType?.filter]);

    console.log('calls', calls);
    console.log('sortedCalls:', sortedCalls);

    const callsContent = useMemo(
        () =>
            DatesUtils.getFormatByCalls(sortedCalls).map(
                (call: IFilterCalls) => (
                    <ul key={call.date.toString()}>
                        {call.date !== DatesUtils.getFetchDate(Date.now()) && (
                            <CallDateLine
                                date={call.date}
                                count={call.calls.length}
                            />
                        )}
                        {call.calls.map((sortedCall: ICall) => (
                            <CallLine
                                onMouseLeave={() => setHoveredCallId(null)}
                                onMouseEnter={() =>
                                    setHoveredCallId(sortedCall.id)
                                }
                                key={sortedCall.id}
                                type={
                                    <CallStatusIcon
                                        status={sortedCall.status}
                                        inOut={sortedCall.in_out}
                                    />
                                }
                                time={DatesUtils.getTimeByDate(sortedCall.date)}
                                employer={
                                    <AppImage
                                        width={36}
                                        height={36}
                                        src={sortedCall.person_avatar}
                                    />
                                }
                                call={sortedCall.from_number}
                                source={''}
                                mark={''}
                                length={DatesUtils.getMinutesFromSeconds(
                                    sortedCall.time,
                                ).toString()}
                                audio={
                                    sortedCall.time ? (
                                        <AudioPlayer
                                            call={sortedCall}
                                            hovered={checkHoveredById(
                                                sortedCall.id,
                                            )}
                                            id={activeId}
                                            setId={(id) => setActiveId(id)}
                                        />
                                    ) : (
                                        ''
                                    )
                                }
                            />
                        ))}
                    </ul>
                ),
            ),
        [sortedCalls],
    );

    return (
        <VStack max className={classNames(cls.callsList, {}, [className])}>
            <HStack max justify={'between'}>
                <HStack>
                    <Input
                        placeholder={'Поиск по звонкам'}
                        addonLeft={
                            <Icon width={16} height={16} Svg={SearchIcon} />
                        }
                    />
                </HStack>
                <CallSortType
                    onChange={onChangeTypeCalls}
                    value={filterType?.filter as itemsCallsListSortType}
                />
            </HStack>
            <VStack max align={'center'}>
                <CallLine
                    type={'Тип'}
                    time={'Время'}
                    employer={'Сотрудник'}
                    call={'Звонок'}
                    source={'Источник'}
                    mark={'Оценка'}
                    length={'Длительность'}
                    header
                />
                {!calls?.results.length && !isLoading && (
                    <Text title={'Звонки не найдены!'} />
                )}
                {error && <Text title={error} />}
                {isLoading ? <Loader /> : callsContent}
            </VStack>
        </VStack>
    );
};

export default CallsList;
