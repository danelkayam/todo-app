import React from 'react';
import { LoginFields } from '../../models/auth';
import { Form } from 'antd';
import 'antd/dist/antd.css';
import './LoginBox.css';
import EmailField from '../form/EmailField';
import PasswordField from '../form/PasswordField';
import SubmitButton from '../form/SubmitButton';

export type LoginBoxProps = {
    onLogin: (fields: LoginFields) => void;
    isLoading: boolean;
};

const LoginBox = ({ onLogin, isLoading }: LoginBoxProps) => {
    const submit = ({ email, password }: any) => {
        onLogin({ email: email.trim(), password: password.trim() });
    };

    return (
        <Form name="normal_login" className="LoginBox__form" onFinish={submit}>
            <EmailField disabled={isLoading} />
            <PasswordField disabled={isLoading} />
            <SubmitButton showLoading={isLoading}>Log in</SubmitButton>
        </Form>
    );
};

export default LoginBox;
