import { ICalls } from './ICallType';

interface ICallsSchema {
    isLoading: boolean;
    error?: string;
    data: ICalls;
    page: number;
}

export default ICallsSchema;
