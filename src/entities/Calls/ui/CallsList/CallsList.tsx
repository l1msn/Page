import React, { JSX } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './CallsList.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import SearchIcon from '@/shared/assets/icons/search-small-icon.svg';
import Icon from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import ArrowDown from '@/shared/assets/icons/arrow-down-icon.svg';
import { Dropdown } from '@/shared/ui/Popups';
import itemsCallsListSortType from '@/entities/Filtres/consts/itemsCallsListSortType';
import CallSortType from '@/entities/Filtres/ui/CallSortType/CallSortType';

interface ICallsListProps {
    className?: string;
}

const CallsList: React.FC<ICallsListProps> = ({
    className,
}: ICallsListProps): JSX.Element => {
    return (
        <div className={classNames(cls.callsList, {}, [className])}>
            <VStack>
                <HStack max justify={'between'}>
                    <HStack>
                        <Input
                            placeholder={'Поиск по звонкам'}
                            addonLeft={
                                <Icon width={16} height={16} Svg={SearchIcon} />
                            }
                        />
                    </HStack>
                    <HStack>
                        <CallSortType value={itemsCallsListSortType.ALL} />
                    </HStack>
                </HStack>
            </VStack>
        </div>
    );
};

export default CallsList;
