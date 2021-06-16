import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';

import ItemsPage from './ItemsPage';
import Item from '../../models/item';
import User from '../../models/user';

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Pages/Items/ItemsPage',
    component: ItemsPage,
    parameters: { actions: { argTypesRegex: '^on.*' } },
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof ItemsPage>> = (args) => <ItemsPage {...args} />;

export const ItemsPageStory = Template.bind({});

const items: Item[] = Array.from(Array(5).keys()).map((i) => ({
    id: `item-${i}`,
    text: `item ${i} text`,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
}));

const profile: User = {
    id: 'some-user-id',
    name: 'Danny Elkayam',
    email: 'dan@awesometodolistapp.com',
    createdAt: new Date(),
    updatedAt: new Date(),
};

ItemsPageStory.args = {
    items,
    profile,
    onLogout: async () => {
        console.log('onLogout');
    },
    onCreateItem: async (text) => {
        console.log('onCreateItem', text);
    },
    onCompletedItem: async (id, completed) => {
        console.log('onCompletedItem', id, completed);
    },
    onDeleteItem: async (id) => {
        console.log('onDeleteItem', id);
    },
};
