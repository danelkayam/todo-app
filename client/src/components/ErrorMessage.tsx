import React from 'react';
import { Alert } from 'antd';
import './ErrorMessage.css';

export type ErrorMessageProps = {
    message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => (
    <Alert className={'ErrorMessage'} message={message} type="error" />
);

export default ErrorMessage;
