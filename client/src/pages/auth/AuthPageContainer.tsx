import React, { useCallback } from 'react';
import AuthService from '../../services/authService';
import AuthPage from './AuthPage';
import { LoginFields, RegistrationFields } from '../../models/auth';

export type ContainerParams = {
    authService: AuthService;
    onAuthenticated: () => void;
};

const AuthPageContainer = ({ authService, onAuthenticated }: ContainerParams) => {
    const performLogin = useCallback(async (fields: LoginFields) => {
        await authService.login(fields);
        onAuthenticated();
    }, [authService, onAuthenticated]);

    const performRegister = useCallback(async (fields: RegistrationFields) => {
        await authService.register(fields);
        onAuthenticated();
    }, [authService, onAuthenticated]);

    return <AuthPage onLogin={performLogin} onRegister={performRegister} />;
};

export default AuthPageContainer;
