import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ICallsSchema from '../types/ICallsSchema';
import fetchCalls from '../services/fetchCalls/fetchCalls';
import { ICalls } from '@/entities/Calls/model/types/ICallType';

const initialState: ICallsSchema = {
    isLoading: false,
    data: {
        total_rows: '',
        results: [],
    },
    error: undefined,
    page: 0,
};

export const callsSlice = createSlice({
    name: 'calls',
    initialState,
    reducers: {
        addPage: (state) => {
            state.page = state.page + 1;
        },
        resetPage: (state) => {
            state.page = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCalls.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                fetchCalls.fulfilled,
                (state, action: PayloadAction<ICalls>) => {
                    state.isLoading = false;

                    if (state.page > 0) {
                        state.data.results = [
                            ...state.data.results,
                            ...action.payload.results,
                        ];
                    } else {
                        state.data = action.payload;
                    }
                    state.page += 1;
                    console.log(state.data.results);
                },
            )
            .addCase(fetchCalls.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: callsActions } = callsSlice;
export const { reducer: callsReducer } = callsSlice;
