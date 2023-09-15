import React from 'react';

interface IListBoxItems {
    value?: string;
    content: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    preventCloseWhenSelected?: boolean;
}

export default IListBoxItems;
