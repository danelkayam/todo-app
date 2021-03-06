import React, { ComponentProps } from 'react';

import { Story } from '@storybook/react';

import LoginBox from './LoginBox';

//๐ This default export determines where your story goes in the story list
export default {
    title: 'Components/Auth/LoginBox',
    component: LoginBox,
    argTypes: { onLogin: { action: 'clicked' } },
};

//๐ We create a โtemplateโ of how args map to rendering
const Template: Story<ComponentProps<typeof LoginBox>> = (args) => <LoginBox {...args} />;

export const LoginBoxStory = Template.bind({});

LoginBoxStory.args = {
    /*๐ The args you need here will depend on your component */
};
