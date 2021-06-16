import React from 'react';
import { Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

export type Props = {
    disabled: boolean;
};

const NameField = ({ disabled }: Props) => (
    <Form.Item
        name="name"
        rules={[
            {
                required: true,
                message: 'Please enter your name!',
            },
        ]}
    >
        <Input
            type={'text'}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
            disabled={disabled}
        />
    </Form.Item>
);

export default NameField;
