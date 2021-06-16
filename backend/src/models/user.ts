import Entity from './entity';

export default interface User extends Entity {
    name: string;
    email: string;
}

export interface LoginFields {
    email: string;
    password: string;
}

export interface RegistrationFields extends LoginFields {
    name: string;
}

export interface UserFields extends RegistrationFields {}
