import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IFilterTypeCallsSchema from '../types/IFilterTypeCallsSchema';
import IFilterTypeCalls from '../types/IFilterTypeCalls';

const initialState: IFilterTypeCallsSchema = {
    isLoading: false,
    filterType: {
        name: 'Все типы',
        filter: 'Все типы',
    },
    error: undefined,
};

export const filterCallsSlice = createSlice({
    name: 'filterCalls',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<IFilterTypeCalls>) => {
            state.filterType.filter = action.payload.filter;
        },
        resetFilters: (state) => {
            state.filterType.filter = state.filterType.name;
        },
    },
});

export const { actions: filterCallsActions } = filterCallsSlice;
export const { reducer: filterCallsReducer } = filterCallsSlice;
