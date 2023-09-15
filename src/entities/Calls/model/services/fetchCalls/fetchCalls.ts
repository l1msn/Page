import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from '@/app/providers/StoreProvider';
import { ICalls } from '../../types/ICallType';
import { DatesUtils } from '@/shared/lib/dates/DatesUtils';
import IDatesPages from '../../types/IDatesPages';
import axios from 'axios';

const fetchCalls = createAsyncThunk<
    ICalls,
    IDatesPages,
    { rejectValue: string }
>('calls/fetchCalls', async (data: IDatesPages, thunkAPI) => {
    try {
        if (!data) return thunkAPI.rejectWithValue('No data for fetch');

        const startTime = DatesUtils.getFetchDate(data.date.start);
        const endTime = DatesUtils.getFetchDate(data.date.end);
        const limit = (data.page * 50).toString();

        const response = await axios<ICalls>({
            method: 'post',
            url: `https://api.skilla.ru/mango/getList`,
            headers: {
                Authorization: 'Bearer testtoken',
            },
            params: {
                date_start: startTime,
                date_end: endTime,
                offset: limit,
            },
        });

        if (!response.data) {
            return thunkAPI.rejectWithValue('No data!');
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue('Cant get calls');
    }
});

export default fetchCalls;
