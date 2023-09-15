import { IStateSchema } from '@/app/providers/StoreProvider';

class CallsSelectors {
    static getCallsData = (state: IStateSchema) => state?.calls?.data;
    static getCallsPage = (state: IStateSchema) => state?.calls?.page || 0;
    static getCallsError = (state: IStateSchema) => state?.calls?.error || '';
    static getCallsIsLoading = (state: IStateSchema) =>
        state?.calls?.isLoading || false;
}

export default CallsSelectors;
