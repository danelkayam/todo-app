import User from './user';

export type LoginFields = {
    email: string;
    password: string;
};

export type RegistrationFields = {
    name: string;
} & LoginFields;


export interface Token {
    token: string;
    expires: number;
}

export interface AuthResponse {
    token: Token;
    profile: User;
}
