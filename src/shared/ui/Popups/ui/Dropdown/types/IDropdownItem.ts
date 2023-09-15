import React from 'react';

interface IDropdownItem {
    disabled?: boolean;
    content?: React.ReactNode;
    onClick?: () => void;
    href?: string;
    preventCloseWhenSelected?: boolean;
}

export default IDropdownItem;
