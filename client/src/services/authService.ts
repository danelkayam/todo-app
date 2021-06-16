import { AuthResponse, LoginFields, RegistrationFields, Token } from '../models/auth';
import User from '../models/user';

import moment from 'moment';
import performRequest from './backendService';

const LOCAL_STORAGE_JWT_TOKEN = 'jwt_token';
const LOCAL_STORAGE_JWT_EXPIRES = 'jwt_expires';

export default class AuthService {
    public async login(fields: LoginFields): Promise<User> {
        return performRequest({ url: 'api/auth/login', method: 'post', data: fields }).then(
            async ({ token, profile }: AuthResponse) => {
                await this.storeToken(token);
                return profile;
            },
        );
    }

    public async register(fields: RegistrationFields): Promise<User> {
        return performRequest({ url: 'api/auth/register', method: 'post', data: fields }).then(
            async ({ token, profile }: AuthResponse) => {
                await this.storeToken(token);
                return profile;
            },
        );
    }

    public async getToken(): Promise<Token | null> {
        const token: string | null = localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN);

        if (!token) {
            return null;
        }

        const expiresVal: string | null = localStorage.getItem(LOCAL_STORAGE_JWT_EXPIRES);
        const expires: number = !!expiresVal ? moment.utc(expiresVal).milliseconds() : 0;

        return {
            token,
            expires,
        };
    }

    public isAuthenticated(): Promise<boolean> {
        return this.getToken().then((token) => !!token);
    }

    public async logout(): Promise<boolean> {
        return this.clearToken();
    }

    private async storeToken(token: Token): Promise<boolean> {
        // XXX: for the sake of the example we store it in localstorage which is not safe!
        localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN, token.token);
        localStorage.setItem(LOCAL_STORAGE_JWT_EXPIRES, moment.utc().add(token.expires, 'seconds').format());
        return true;
    }

    private async clearToken(): Promise<boolean> {
        // XXX: for the sake of the example we store it in localstorage which is not safe!
        localStorage.removeItem(LOCAL_STORAGE_JWT_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_JWT_EXPIRES);
        return true;
    }
}
