import React, { JSX } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './MainLayout.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { AvatarDropdown } from '@/features/AvatarDropdown';

interface IMainLayoutProps {
    className?: string;
    header: React.ReactElement;
    content: React.ReactElement;
    sidebar: React.ReactElement;
}

const MainLayout: React.FC<IMainLayoutProps> = (
    props: IMainLayoutProps,
): JSX.Element => {
    const { sidebar, content, className, header } = props;
    return (
        <div className={classNames(cls.mainLayout, {}, [className])}>
            <HStack max className={cls.layout}>
                <div className={cls.sidebar}>{sidebar}</div>
                <VStack max className={cls.page}>
                    <div className={cls.header}>{header}</div>
                    <div className={cls.content}>{content}</div>
                </VStack>
            </HStack>
        </div>
    );
};

export default MainLayout;
