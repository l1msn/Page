import React, { JSX } from 'react';
import Page from '@/widgets/Page';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/Text';

const MainPage: React.FC = (): JSX.Element => {
    const { t } = useTranslation();

    return <Page data-testid={'MainPage'}></Page>;
};

export default MainPage;
