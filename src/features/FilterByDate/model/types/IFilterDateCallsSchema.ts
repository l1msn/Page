import IFilterDateCalls from './IFilterDateCalls';

interface IFilterDateCallsSchema {
    filterDate: IFilterDateCalls;
    isLoading: boolean;
    error?: string;
}

export default IFilterDateCallsSchema;
