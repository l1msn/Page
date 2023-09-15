import { IStateSchema } from '@/app/providers/StoreProvider';

class FilterCallsSelectors {
    static getFilterCallsCurrentFilter = (state: IStateSchema) =>
        state.filterCalls?.filterType;
    static getFilterCallsIsLoading = (state: IStateSchema) =>
        state.filterCalls?.isLoading || false;
    static getFilterCallsError = (state: IStateSchema) =>
        state.filterCalls?.error || '';
}

export default FilterCallsSelectors;
