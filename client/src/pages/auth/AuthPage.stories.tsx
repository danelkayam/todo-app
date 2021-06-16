import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';

import AuthPage from './AuthPage';

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Pages/Auth/AuthPage',
    component: AuthPage,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof AuthPage>> = (args) => <AuthPage {...args} />;

export const AuthPageStory = Template.bind({});

AuthPageStory.args = {
    onLogin: async (fields) => {},
    onRegister: async (fields) => {},
};
