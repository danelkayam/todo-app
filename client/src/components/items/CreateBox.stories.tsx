import React, { ComponentProps } from 'react';

import { Story } from '@storybook/react';

import CreateBox from './CreateBox';

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Components/Items/CreateBox',
    component: CreateBox,
    argTypes: { onCreate: { action: 'clicked' } },
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof CreateBox>> = (args) => <CreateBox {...args} />;

export const CreateBoxStory = Template.bind({});

CreateBoxStory.args = {
    /*👇 The args you need here will depend on your component */
    disabled: false,
    onCreate: async (text) => {
        console.log("onCreate", text)
        return;
    },
};
