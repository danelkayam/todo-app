import React, { ComponentProps } from 'react';

import { Story } from '@storybook/react';

import ItemsPane from './ItemsPane';
import Item from '../../models/item';

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Components/Items/ItemsPane',
    component: ItemsPane,
    argTypes: {
        onCreateItem: { action: 'clicked' },
        onCompletedItem: { action: 'clicked' },
        onDeleteItem: { action: 'clicked' },
    },
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof ItemsPane>> = (args) => <ItemsPane {...args} />;

export const ItemsPaneStory = Template.bind({});

const items: Item[] = Array.from(Array(5).keys()).map((i) => ({
    id: `item-${i}`,
    text: `item ${i} text`,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
}));

ItemsPaneStory.args = {
    /*👇 The args you need here will depend on your component */
    items,
    onCreateItem: async (text: string) => {},
    onCompletedItem: async (id: string, completed: boolean) => {},
    onDeleteItem: async (id: string) => {},
};
