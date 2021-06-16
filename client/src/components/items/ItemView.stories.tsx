import React, { ComponentProps } from 'react';

import { Story } from '@storybook/react';

import ItemView from './ItemView';

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Components/Items/ItemView',
    component: ItemView,
    argTypes: {
        onComplete: { action: 'clicked' },
        onDelete: { action: 'clicked' },
    },
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof ItemView>> = (args) => <ItemView {...args} />;

export const ItemViewStory = Template.bind({});

const item = {
    id: 'as09df870asd98fKJKL1',
    text: 'This is a TODO list item',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
};

ItemViewStory.args = {
    /*👇 The args you need here will depend on your component */
    item,
    onComplete: async (id: string, completed) => {},
    onDelete: async (id: string) => {},
};
