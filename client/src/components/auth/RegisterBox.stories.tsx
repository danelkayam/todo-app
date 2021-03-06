import React, { ComponentProps } from 'react';

import { Story } from '@storybook/react';

import RegisterBox from './RegisterBox';

//๐ This default export determines where your story goes in the story list
export default {
    title: 'Components/Auth/RegisterBox',
    component: RegisterBox,
    argTypes: { onRegister: { action: 'clicked' } },
};

//๐ We create a โtemplateโ of how args map to rendering
const Template: Story<ComponentProps<typeof RegisterBox>> = (args) => <RegisterBox {...args} />;

export const RegisterBoxStory = Template.bind({});

RegisterBoxStory.args = {
    /*๐ The args you need here will depend on your component */
};
