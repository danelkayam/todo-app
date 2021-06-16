import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import AuthPageContainer from './pages/auth/AuthPageContainer';
import AuthService from './services/authService';
import ItemsPageContainer from './pages/items/ItemsPageContainer';
import ItemsService from './services/itemsService';
import UsersService from './services/usersService';

const authService = new AuthService();
const itemsService = new ItemsService(authService);
const usersService = new UsersService(authService);

const App = () => {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    const onAuthenticated = useCallback(() => {
        setAuthenticated(true);
    }, []);

    const onUnauthenticated = useCallback( () => {
        setAuthenticated(false);
    }, []);

    useEffect(() => {
        authService.isAuthenticated().then((authenticated) => setAuthenticated(authenticated));
    }, []);

    return (
        <div className="App">
            {authenticated !== null && !!authenticated && (
                <ItemsPageContainer
                    authService={authService}
                    itemsService={itemsService}
                    usersService={usersService}
                    onLogout={onUnauthenticated}
                />
            )}
            {authenticated !== null && !authenticated && (
                <AuthPageContainer authService={authService} onAuthenticated={onAuthenticated} />
            )}
        </div>
    );
};

export default App;
