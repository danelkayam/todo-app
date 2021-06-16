import AuthService from './authService';
import performRequest from './backendService';
import User from '../models/user';

export default class UsersService {
    constructor(private readonly authService: AuthService) {}

    public async getProfile(): Promise<User> {
        return this.authService.getToken().then((token) => {
            return performRequest({ url: 'api/users/profile', method: 'get', token: token?.token });
        });
    }
}
