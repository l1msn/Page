import React, { JSX } from 'react';
import Page from '@/widgets/Page';
import { useTranslation } from 'react-i18next';
import { CallsList, callsReducer } from '@/entities/Calls';
import { HStack, VStack } from '@/shared/ui/Stack';
import Balance from '@/features/Balance';
import { DateFilter, filterDateReducer } from '@/features/FilterByDate';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { filterCallsReducer } from '@/features/FilterByCalls';

const reducers: ReducersList = {
    calls: callsReducer,
    filterDate: filterDateReducer,
    filterCalls: filterCallsReducer,
};

const CallsPage: React.FC = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterAmount>
            <Page data-testid={'CallsPage'}>
                <VStack max>
                    <HStack max justify={'end'}>
                        <HStack gap={'48'}>
                            <Balance />
                            <DateFilter query={'3 дня'} />
                        </HStack>
                    </HStack>
                    <CallsList />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default CallsPage;
