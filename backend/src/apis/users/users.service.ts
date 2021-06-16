import { InvalidArgumentsException, ItemNotFoundException } from '../../common/exceptions';
import { inject, singleton } from 'tsyringe';
import UsersRepository from './users.repository';
import User, { UserFields } from '../../models/user';
import PasswordValidator from 'password-validator';
import emailValidator from 'email-validator';

const passwordValidator = new PasswordValidator()
    .is().min(8)
    .is().max(64)
    .has().uppercase()
    .has().lowercase()
    .has().digits(1)
    .has().not().spaces();

const nameValidator = new PasswordValidator()
    .is().min(2)
    .is().max(64)
    .has().not().symbols();

const validateCredentials = (email: string, password: string) => {
    if (!emailValidator.validate(email)) {
        throw new InvalidArgumentsException('email is not valid!');
    }

    if (!passwordValidator.validate(password)) {
        throw new InvalidArgumentsException(
            'password is not valid! must contain: ' +
            'minimum 8 chars, ' +
            'maximum 64 chars, ' +
            'at least one uppercase letter, ' +
            'at least one lowercase letter, ' +
            'at least 2 digits, ' +
            'no spaces',
        );
    }
};

const validateName = (name: string) => {
    if (!nameValidator.validate(name)) {
        throw new InvalidArgumentsException(
            'name is not valid! must contain: ' + 'minimum 2 chars, ' + 'maximum 64 chars, ' + 'no symbols',
        );
    }
};


@singleton()
export default class UsersService {
    constructor(@inject(UsersRepository) private readonly usersRepository: UsersRepository) {}

    public async getUser(id: string): Promise<User> {
        const user = await this.usersRepository.getUserById(id);

        if (user === null) {
            throw new ItemNotFoundException(`No user found: ${id}`);
        }

        return user;
    }

    public async getUserByCredentials(email: string, password: string): Promise<User> {
        validateCredentials(email, password);

        const user = await this.usersRepository.getUserByCredentials(email, password);

        if (user === null) {
            throw new ItemNotFoundException('User not found for email and password!');
        }

        return user;
    }

    public async createUser(fields: UserFields): Promise<User> {
        validateName(fields.name);
        validateCredentials(fields.email, fields.password);

        return this.usersRepository.createUser(fields);
    }
}
