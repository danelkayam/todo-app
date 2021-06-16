import React, { ComponentProps } from 'react';

import { Story } from '@storybook/react';

import LoginBox from './LoginBox';

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Components/Auth/LoginBox',
    component: LoginBox,
    argTypes: { onLogin: { action: 'clicked' } },
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof LoginBox>> = (args) => <LoginBox {...args} />;

export const LoginBoxStory = Template.bind({});

LoginBoxStory.args = {
    /*👇 The args you need here will depend on your component */
};
