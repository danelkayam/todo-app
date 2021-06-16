import React from 'react';
import Item from '../../models/item';
import CreateBox from './CreateBox';
import ItemView from './ItemView';

export type ItemsPaneProps = {
    items: Item[];
    onCreateItem: (text: string) => Promise<void>;
    onCompletedItem: (id: string, completed: boolean) => Promise<void>;
    onDeleteItem: (id: string) => Promise<void>;
    disable: boolean;
};

const ItemsPane = ({ items, onCreateItem, onCompletedItem, onDeleteItem, disable }: ItemsPaneProps) => {
    return (
        <div>
            <CreateBox onCreate={onCreateItem} disabled={disable} />

            {items.map((item) => (
                <ItemView
                    key={`item-view-${item.id}`}
                    item={item}
                    onComplete={onCompletedItem}
                    onDelete={onDeleteItem}
                    disabled={disable}
                />
            ))}
        </div>
    );
};

export default ItemsPane;
