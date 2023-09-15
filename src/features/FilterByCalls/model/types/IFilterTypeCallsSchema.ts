import IFilterTypeCalls from './IFilterTypeCalls';

interface IFilterTypeCallsSchema {
    isLoading: boolean;
    error?: string;
    filterType: IFilterTypeCalls;
}

export default IFilterTypeCallsSchema;
