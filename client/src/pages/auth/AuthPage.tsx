import React, { useCallback, useState } from 'react';
import { LoginFields, RegistrationFields } from '../../models/auth';
import RegisterBox from '../../components/auth/RegisterBox';
import LoginBox from '../../components/auth/LoginBox';
import ErrorMessage from '../../components/ErrorMessage';
import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import 'antd/dist/antd.css';
import './AuthPage.css';


export type AuthPageParams = {
    onLogin: (fields: LoginFields) => Promise<void>;
    onRegister: (fields: RegistrationFields) => Promise<void>;
};

const AuthPage = ({ onLogin, onRegister }: AuthPageParams) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showRegistration, setShowRegistration] = useState<boolean>(false);

    const performAction = useCallback(
        (actionFn: (...args: any[]) => Promise<void>, ...args: any[]) => {
            setIsLoading(true);
            setErrorMessage(null);

            return actionFn(...args).catch(async (error) => {
                setIsLoading(false);
                setErrorMessage(error.message);
            });
        },
        [],
    );

    return (
        <div className={'AuthPage'}>
            <Title className={"AuthPage__title"} level={2}>Todo List App</Title>
            {!!showRegistration ? (
                <RegistrationPane
                    onRegister={performAction.bind(null, onRegister)}
                    onSwitch={() => setShowRegistration(false)}
                    isLoading={isLoading}
                />
            ) : (
                <LoginPane
                    onLogin={performAction.bind(null, onLogin)}
                    onSwitch={() => setShowRegistration(true)}
                    isLoading={isLoading}
                />
            )}
            {!!errorMessage && <ErrorMessage message={errorMessage} />}
        </div>
    );
};

const LoginPane = ({
    onLogin,
    onSwitch,
    isLoading,
}: {
    onLogin: () => any;
    onSwitch: () => any;
    isLoading: boolean;
}) => (
    <div className={'AuthPage__auth-pane'}>
        <LoginBox onLogin={onLogin} isLoading={isLoading} />
        <SwitchButton onClick={onSwitch} disabled={isLoading}>
            Register
        </SwitchButton>
    </div>
);

const RegistrationPane = ({
    onRegister,
    onSwitch,
    isLoading,
}: {
    onRegister: () => any;
    onSwitch: () => any;
    isLoading: boolean;
}) => (
    <div className={'AuthPage__auth-pane'}>
        <RegisterBox onRegister={onRegister} isLoading={isLoading} />
        <SwitchButton onClick={onSwitch} disabled={isLoading}>
            Switch to Log in
        </SwitchButton>
    </div>
);

const SwitchButton = ({
    disabled,
    onClick,
    children,
}: {
    disabled: boolean;
    onClick: () => any;
    children?: React.ReactNode;
}) => (
    <Button className={'AuthPage__switch-mode-button'} type="default" disabled={disabled} onClick={onClick}>
        {children}
    </Button>
);

export default AuthPage;
