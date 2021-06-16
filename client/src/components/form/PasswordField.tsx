import React from 'react';

import { Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

export type Props = {
    disabled: boolean;
};

const PasswordField = ({ disabled }: Props) => (
    <Form.Item
        name="password"
        rules={[
            {
                required: true,
                message: 'Please input your Password!',
            },
        ]}
    >
        <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            disabled={disabled}
        />
    </Form.Item>
);

export default PasswordField;
