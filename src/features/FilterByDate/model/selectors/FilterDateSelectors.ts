import { IStateSchema } from '@/app/providers/StoreProvider';
import { DatesUtils } from '@/shared/lib/dates/DatesUtils';

const { getThreeDays } = DatesUtils;

class FilterDateSelectors {
    static getFilterDateCurrentFilter = (state: IStateSchema) =>
        state.filterDate?.filterDate;

    static getFilterDateCurrentFilterQuery = (state: IStateSchema) =>
        state.filterDate?.filterDate.query || [];

    static getFilterDateCurrentFilterDate = (state: IStateSchema) =>
        state.filterDate?.filterDate.date || {
            start: getThreeDays(Date.now()).start,
            end: getThreeDays(Date.now()).end,
        };
    static getFilterDateIsLoading = (state: IStateSchema) =>
        state.filterDate?.isLoading || false;
    static getFilterDateError = (state: IStateSchema) =>
        state.filterDate?.error || '';
}

export default FilterDateSelectors;
