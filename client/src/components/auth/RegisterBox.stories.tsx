import React, { ComponentProps } from 'react';

import { Story } from '@storybook/react';

import RegisterBox from './RegisterBox';

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Components/Auth/RegisterBox',
    component: RegisterBox,
    argTypes: { onRegister: { action: 'clicked' } },
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof RegisterBox>> = (args) => <RegisterBox {...args} />;

export const RegisterBoxStory = Template.bind({});

RegisterBoxStory.args = {
    /*👇 The args you need here will depend on your component */
};
