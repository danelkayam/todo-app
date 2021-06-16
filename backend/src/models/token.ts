import User from './user';

export interface Token {
    token: string;
    expires: number;
}

export default interface AuthResponse {
    token: Token;
    profile: User;
}
