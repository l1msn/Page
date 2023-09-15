import React, { Fragment, JSX, memo } from 'react';
import { Listbox as HListBox, Transition } from '@headlessui/react';
import cls from './ListBox.module.scss';
import popupCls from '../../../styles/popup.module.scss';
import classNames from '@/shared/lib/classNames/classNames';
import IListBoxItems from '../consts/IListBoxItems';
import { DropDownDirection } from '@/shared/types/ui';
import mapDirectionClass from '../../../styles/consts';
import { HStack } from '../../../../Stack';
import ArrowDownIcon from '@/shared/assets/icons/arrow-down-icon.svg';
import Icon from '@/shared/ui/Icon';

interface IListBoxProps {
    className?: string;
    items?: IListBoxItems[];
    value?: string;
    defaultValue?: string;
    onChange?: <T extends string>(value: T) => void;
    readonly?: boolean;
    direction?: DropDownDirection;
    withArrow?: boolean;
    label?: string;
}

const ListBox: React.FC<IListBoxProps> = memo(
    (props: IListBoxProps): JSX.Element => {
        const {
            className,
            items,
            value,
            defaultValue,
            onChange,
            readonly,
            label,
            withArrow = true,
            direction = 'bottom left',
        } = props;

        return (
            <HStack className={cls.listBox} gap={'4'}>
                {label && (
                    <span
                        className={classNames(
                            cls.label,
                            { [cls.readonly]: readonly },
                            [className],
                        )}
                    >
                        {label}
                    </span>
                )}
                <HListBox
                    as={'div'}
                    className={classNames(cls.ListBox, {}, [
                        className,
                        popupCls.popup,
                    ])}
                    value={value}
                    onChange={onChange}
                    disabled={readonly}
                >
                    <HListBox.Button className={cls.trigger}>
                        <HStack>
                            <p>{value ?? defaultValue}</p>
                            {withArrow && (
                                <Icon
                                    height={24}
                                    width={24}
                                    Svg={ArrowDownIcon}
                                    className={cls.arrowBtn}
                                />
                            )}
                        </HStack>
                    </HListBox.Button>
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <HListBox.Options
                            className={classNames(cls.options, {}, [
                                mapDirectionClass[direction],
                            ])}
                        >
                            {items?.map((item) => (
                                <HListBox.Option
                                    key={item.value}
                                    value={item.value}
                                    disabled={item.disabled}
                                    as={Fragment}
                                >
                                    {({ active, selected }) => (
                                        <li
                                            className={classNames(
                                                cls.item,
                                                {
                                                    [cls.selected]: selected,
                                                    [popupCls.active]: active,
                                                    [popupCls.disabled]:
                                                        item.disabled,
                                                },
                                                [],
                                            )}
                                            onClick={(e) => {
                                                if (item.onClick)
                                                    item.onClick();

                                                if (
                                                    item.preventCloseWhenSelected
                                                ) {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }
                                            }}
                                        >
                                            {item.content}
                                        </li>
                                    )}
                                </HListBox.Option>
                            ))}
                        </HListBox.Options>
                    </Transition>
                </HListBox>
            </HStack>
        );
    },
);

export default ListBox;
