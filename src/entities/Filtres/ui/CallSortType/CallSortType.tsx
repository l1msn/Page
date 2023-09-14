import React, { JSX, memo, useCallback } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './CallSortType.module.scss';
import { ListBox } from '@/shared/ui/Popups';
import itemsCallsListSortType from '@/entities/Filtres/consts/itemsCallsListSortType';

interface ICallSortTypeProps {
    className?: string;
    value?: itemsCallsListSortType;
    onChange?: (value: itemsCallsListSortType) => void;
}

const options = [
    { value: itemsCallsListSortType.ALL, content: itemsCallsListSortType.ALL },
    { value: itemsCallsListSortType.IN, content: itemsCallsListSortType.IN },
    { value: itemsCallsListSortType.OUT, content: itemsCallsListSortType.OUT },
];

const CallSortType: React.FC<ICallSortTypeProps> = memo(
    ({ className, value, onChange }: ICallSortTypeProps): JSX.Element => {
        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as itemsCallsListSortType);
            },
            [onChange],
        );

        return (
            <div className={classNames(cls.callSortType, {}, [className])}>
                <ListBox
                    className={className}
                    value={value}
                    items={options}
                    onChange={onChangeHandler}
                    defaultValue={itemsCallsListSortType.ALL as string}
                    direction={'bottom left'}
                />
            </div>
        );
    },
);

export default CallSortType;
