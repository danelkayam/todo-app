import React from 'react';

import { Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

export type Props = {
    disabled: boolean;
};

const EmailField = ({ disabled }: Props) => (
    <Form.Item
        name="email"
        rules={[
            {
                required: true,
                type: 'email',
                message: 'Please enter your email!',
            },
        ]}
    >
        <Input
            type={'email'}
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
            disabled={disabled}
        />
    </Form.Item>
);

export default EmailField;
