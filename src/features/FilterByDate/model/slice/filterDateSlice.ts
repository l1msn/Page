import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IFilterDateCallsSchema from '../types/IFilterDateCallsSchema';
import { DatesUtils } from '@/shared/lib/dates/DatesUtils';

interface ISpecificDate {
    startSpecificDate: string;
    endSpecificDate: string;
}

const initialState: IFilterDateCallsSchema = {
    isLoading: false,
    error: undefined,
    filterDate: {
        date: {
            start: DatesUtils.getThreeDays(Date.now()).start,
            end: DatesUtils.getThreeDays(Date.now()).end,
        },
        filter: '3 дня',
        query: ['3 дня', 'Неделя', 'Месяц', 'Год', 'Даты'],
    },
};

export const filterDateSlice = createSlice({
    name: 'filterDate',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<string>) => {
            state.filterDate.filter = action.payload;
        },
        setDates: (state, action: PayloadAction<string>) => {
            const nowDate = Date.now();
            switch (action.payload) {
                case '3 дня':
                    {
                        state.filterDate.date.start =
                            nowDate - 2 * DatesUtils.oneDayMilliseconds;
                        state.filterDate.date.end = nowDate;
                    }
                    break;
                case 'Неделя':
                    {
                        const { start, end } = DatesUtils.getWeek(nowDate);
                        state.filterDate.date.start = start;
                        state.filterDate.date.end = end;
                    }
                    break;
                case 'Месяц':
                    {
                        const { start, end } = DatesUtils.getMonth(nowDate);
                        state.filterDate.date.start = start;
                        state.filterDate.date.end = end;
                    }
                    break;
                case 'Год': {
                    const { start, end } = DatesUtils.getYear(nowDate);
                    state.filterDate.date.start = start;
                    state.filterDate.date.end = end;
                }
            }
        },
        setSpecificDates: (state, action: PayloadAction<ISpecificDate>) => {
            state.filterDate.date.start = new Date(
                action.payload.startSpecificDate,
            ).getTime();
            state.filterDate.date.end = new Date(
                action.payload.endSpecificDate,
            ).getTime();
        },
        setBackDates: (state) => {
            switch (state.filterDate.filter) {
                case '3 дня':
                    {
                        state.filterDate.date.end =
                            state.filterDate.date.start -
                            DatesUtils.oneDayMilliseconds;
                        state.filterDate.date.start =
                            state.filterDate.date.start -
                            3 * DatesUtils.oneDayMilliseconds;
                    }
                    break;
                case 'Неделя':
                    {
                        state.filterDate.date.end =
                            state.filterDate.date.start -
                            DatesUtils.oneDayMilliseconds;
                        state.filterDate.date.start =
                            state.filterDate.date.start -
                            7 * DatesUtils.oneDayMilliseconds;
                    }
                    break;
                case 'Месяц':
                    {
                        state.filterDate.date.end =
                            state.filterDate.date.start -
                            DatesUtils.oneDayMilliseconds;
                        state.filterDate.date.start =
                            DatesUtils.getFirstDaysMonth(
                                state.filterDate.date.start -
                                    DatesUtils.oneDayMilliseconds,
                            );
                    }
                    break;
                case 'Год':
                    {
                        const { start, end } = DatesUtils.getYearsByDate(
                            state.filterDate.date.end,
                            -1,
                        );
                        state.filterDate.date.start = start;
                        state.filterDate.date.end = end;
                    }
                    break;
            }
        },
        setNextDates: (state) => {
            switch (state.filterDate.filter) {
                case '3 дня':
                    {
                        state.filterDate.date.start =
                            state.filterDate.date.end +
                            DatesUtils.oneDayMilliseconds;
                        state.filterDate.date.end =
                            state.filterDate.date.end +
                            3 * DatesUtils.oneDayMilliseconds;
                    }
                    break;
                case 'Неделя':
                    {
                        state.filterDate.date.start =
                            state.filterDate.date.end +
                            DatesUtils.oneDayMilliseconds;
                        state.filterDate.date.end =
                            state.filterDate.date.end +
                            7 * DatesUtils.oneDayMilliseconds;
                    }
                    break;
                case 'Месяц':
                    {
                        state.filterDate.date.start =
                            state.filterDate.date.end +
                            DatesUtils.oneDayMilliseconds;
                        state.filterDate.date.end = DatesUtils.getLastDaysMonth(
                            state.filterDate.date.end +
                                DatesUtils.oneDayMilliseconds,
                        );
                    }
                    break;
                case 'Год':
                    {
                        const { start, end } = DatesUtils.getYearsByDate(
                            state.filterDate.date.start,
                            1,
                        );
                        state.filterDate.date.start = start;
                        state.filterDate.date.end = end;
                    }
                    break;
            }
        },
    },
});

export const { actions: filterDateActions } = filterDateSlice;
export const { reducer: filterDateReducer } = filterDateSlice;
