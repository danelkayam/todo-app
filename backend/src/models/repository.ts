import { Collection, MongoError, ObjectId, ObjectID } from 'mongodb';
import Database from '../common/database';
import { ItemAlreadyExistException } from '../common/exceptions';

export default class Repository {
    constructor(private readonly database: Database, private readonly collectionName) {}

    protected getCollection(): Collection<any> {
        return this.database.getConnection().db().collection(this.collectionName);
    }

    protected mapDocToEntity = (doc: any | null): any => {
        if (!!doc) {
            const { _id, ...rest } = doc;
            return {
                id: _id,
                ...rest,
            };
        }

        return null;
    };

    protected mapDocsToEntities = (docs) => docs.map(({ _id, ...rest }) => ({ id: _id, ...rest }));

    protected convertToObjectId(id: string): ObjectId {
        try {
            return ObjectID.createFromHexString(id);
        } catch (error) {
            return null;
        }
    }

    protected validateDuplicationError(error: MongoError, errorMessage: string) {
        if (error.name === 'MongoError' && error.code === 11000) {
            throw new ItemAlreadyExistException(errorMessage);
        }

        throw error;
    }
}
