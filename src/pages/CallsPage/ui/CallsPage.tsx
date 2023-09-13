import React, { JSX } from 'react';
import Page from '@/widgets/Page';
import { useTranslation } from 'react-i18next';
import { CallsList } from '@/entities/Calls';
import { HStack, VStack } from '@/shared/ui/Stack';
import Balance from '@/features/Balance';
import DateFilter from '@/widgets/DateFilter';

const CallsPage: React.FC = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Page data-testid={'CallsPage'}>
            <VStack max>
                <HStack max justify={'end'}>
                    <Balance />
                    <DateFilter />
                </HStack>
                <HStack>
                    123
                    <HStack>123</HStack>
                </HStack>
                <CallsList />
            </VStack>
        </Page>
    );
};

export default CallsPage;
