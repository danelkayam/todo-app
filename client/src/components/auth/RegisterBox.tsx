import React from 'react';
import { RegistrationFields } from '../../models/auth';
import { Form } from 'antd';
import 'antd/dist/antd.css';
import './RegisterBox.css';
import EmailField from '../form/EmailField';
import PasswordField from '../form/PasswordField';
import SubmitButton from '../form/SubmitButton';
import NameField from '../form/NameField';

export type RegisterBoxProps = {
    onRegister: (fields: RegistrationFields) => void;
    isLoading: boolean;
};

const RegisterBox = ({ onRegister, isLoading }: RegisterBoxProps) => {
    const submit = ({ name, email, password }: any) => {
        onRegister({ name: name.trim(), email: email.trim(), password: password.trim() });
    };

    return (
        <Form name="normal_login" className="RegisterBox__form" onFinish={submit}>
            <NameField disabled={isLoading} />
            <EmailField disabled={isLoading} />
            <PasswordField disabled={isLoading} />
            <SubmitButton showLoading={isLoading}>Register</SubmitButton>
        </Form>
    );
};

export default RegisterBox;
