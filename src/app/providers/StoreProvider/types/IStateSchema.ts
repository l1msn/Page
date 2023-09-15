import { ICallsSchema } from '@/entities/Calls';
import { IFilterTypeCallsSchema } from '@/features/FilterByCalls';
import { IFilterDateCallsSchema } from '@/features/FilterByDate';

interface IStateSchema {
    calls?: ICallsSchema;
    filterCalls?: IFilterTypeCallsSchema;
    filterDate?: IFilterDateCallsSchema;
}

export default IStateSchema;
