import React, { useCallback, useEffect, useState } from 'react';
import AuthService from '../../services/authService';
import ItemsService from '../../services/itemsService';
import UsersService from '../../services/usersService';
import Item from '../../models/item';
import ItemsPage from './ItemsPage';
import User from '../../models/user';

export type ContainerParams = {
    authService: AuthService;
    itemsService: ItemsService;
    usersService: UsersService;
    onLogout: () => void;
};

const ItemsPageContainer = ({ authService, itemsService, usersService, onLogout }: ContainerParams) => {
    const [items, setItems] = useState<Item[]>([]);
    const [profile, setProfile] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const getAll = useCallback(() => {
        return itemsService.getAll().then((newItems: Item[]) => setItems(newItems));
    }, [itemsService]);

    const getProfile = useCallback(() => {
        return usersService.getProfile().then((profile) => setProfile(profile));
    }, [usersService]);

    const performCreate = useCallback(
        (text: string): Promise<void> => {
            return itemsService.create({ text }).then((item: Item) => setItems([...items, item]));
        },
        [itemsService, items],
    );

    const performItemCompleted = useCallback(
        (id: string, completed: boolean): Promise<void> => {
            return itemsService.update(id, { completed }).then((updated: Item) => {
                const index = items.findIndex((item) => item.id === updated.id);
                if (index > -1) {
                    items[index] = updated;
                } else {
                    items.push(updated);
                }
                setItems(items);
            });
        },
        [itemsService, items],
    );

    const performDelete = useCallback(
        (id: string): Promise<void> => {
            return itemsService.delete(id).then(() => {
                const index = items.findIndex((item) => item.id === id);
                if (index > -1) {
                    items.splice(index, 1);
                    setItems(items);
                }
            });
        },
        [itemsService, items],
    );

    const performLogout = useCallback(() => {
        return authService.logout().then(() => {
            onLogout();
        });
    }, [authService, onLogout]);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([getAll(), getProfile()]).finally(() => {
            setIsLoading(false);
        });
    }, [getAll, getProfile]);

    return isLoading ? (
        <div>Loading...</div>
    ) : (
        <ItemsPage
            items={items}
            profile={profile!}
            onLogout={performLogout}
            onCreateItem={performCreate}
            onCompletedItem={performItemCompleted}
            onDeleteItem={performDelete}
        />
    );
};

export default ItemsPageContainer;
