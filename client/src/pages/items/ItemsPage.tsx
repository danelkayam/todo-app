import React, { useCallback, useState } from 'react';
import ItemsPane from '../../components/items/ItemsPane';
import Item from '../../models/item';
import User from '../../models/user';
import ErrorMessage from '../../components/ErrorMessage';
import Title from 'antd/es/typography/Title';
import { Avatar, Dropdown, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './ItemsPage.css';

export type ItemsPageParams = {
    items: Item[];
    profile: User;
    onLogout: () => Promise<void>;
    onCreateItem: (text: string) => Promise<void>;
    onCompletedItem: (id: string, completed: boolean) => Promise<void>;
    onDeleteItem: (id: string) => Promise<void>;
};

const ItemsPage = ({ items, profile, onLogout, onCreateItem, onCompletedItem, onDeleteItem }: ItemsPageParams) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const performAction = (actionFn: (...args: any[]) => Promise<void>, ...args: any[]) => {
        setIsLoading(true);
        setErrorMessage(null);

        return actionFn(...args)
            .catch((error) => setErrorMessage(error.message))
            .finally(() => setIsLoading(false));
    };

    const onSelect = useCallback(
        (e: any) => {
            switch (e.key) {
                case 'key-logout':
                    return onLogout();
            }
        },
        [onLogout],
    );

    return (
        <div className={'ItemsPage'}>
            <div className={'ItemsPage__bar-title'}>
                <Title level={2}>Todo List App</Title>
            </div>

            <Dropdown overlay={menuOverlay({ onSelect })}>
                <Avatar className={'ItemsPage__bar-avatar'} size={36} alt={profile?.name}>
                    {profile?.name[0].toUpperCase()}
                </Avatar>
            </Dropdown>
            {!!errorMessage && <ErrorMessage message={errorMessage} />}
            <div className={"AuthPage__items-pane"}>
            <ItemsPane
                items={items}
                onCreateItem={performAction.bind(null, onCreateItem)}
                onCompletedItem={performAction.bind(null, onCompletedItem)}
                onDeleteItem={performAction.bind(null, onDeleteItem)}
                disable={isLoading}
            />
            </div>
        </div>
    );
};

const menuOverlay = ({ onSelect }: { onSelect: (e: any) => void }) => (
    <Menu onClick={onSelect}>
        <Menu.Item key="key-logout" icon={<LogoutOutlined />}>
            Log out
        </Menu.Item>
    </Menu>
);

export default ItemsPage;
