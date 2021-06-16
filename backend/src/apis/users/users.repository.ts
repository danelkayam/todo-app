import Repository from '../../models/repository';
import { inject, singleton } from 'tsyringe';
import Database from '../../common/database';
import { InsertOneWriteOpResult } from 'mongodb';
import User, { UserFields } from '../../models/user';

import { comparePasswords, hashPassword } from '../../utils/crypto';

const COLLECTION_NAME = 'users';

const removePasswordField = (item: object | null) => {
    if (!!item) {
        delete item["password"]
    }

    return item;
}

@singleton()
export default class UsersRepository extends Repository {

    constructor(@inject(Database) database: Database) {
        super(database, COLLECTION_NAME);
    }

    public initialize(): Promise<any> {
        return this.getCollection()
            .createIndex({ email: 1 }, { unique: true });
    }

    public async getUserById(id: string): Promise<User | null> {
        return this.getCollection()
            .findOne({ _id: this.convertToObjectId(id) })
            .then(removePasswordField)
            .then(this.mapDocToEntity);
    }

    public async getUserByCredentials(email: string, password: string): Promise<User | null> {
        return this.getCollection()
            .findOne({ email })
            .then(async (item: object | null) => {
                if (!!item) {
                    const isPasswordCorrect: boolean = await comparePasswords(password, item["password"]);
                    if (isPasswordCorrect) {
                        return item;
                    }
                }

                return null;
            })
            .then(removePasswordField)
            .then(this.mapDocToEntity);
    }

    public async createUser({ name, email, password }: UserFields): Promise<User> {
        const creationDate = new Date();
        const hashedPassword = await hashPassword(password);

        return this.getCollection()
            .insertOne({
                name,
                email,
                password: hashedPassword,
                createdAt: creationDate,
                updatedAt: creationDate
            })
            .then((result: InsertOneWriteOpResult<any>) => result.ops[0])
            .then(removePasswordField)
            .then(this.mapDocToEntity)
            .catch(error => this.validateDuplicationError(error, `User already exist: ${email}`));
    }

}
