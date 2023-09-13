import React, { JSX, Suspense } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import AppRouter from '@/app/providers/Router';
import { MainLayout } from '@/shared/layouts';
import Sidebar from '@/widgets/Sidebar';
import Navbar from '@/widgets/Navbar';
import useTheme from '@/shared/lib/hooks/useTheme/useTheme';

interface IAppProps {
    className?: string;
}

const App: React.FC<IAppProps> = ({ className }: IAppProps): JSX.Element => {
    const { theme } = useTheme();
    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense>
                <MainLayout
                    header={<Navbar />}
                    content={<AppRouter />}
                    sidebar={<Sidebar />}
                />
            </Suspense>
        </div>
    );
};

export default App;
