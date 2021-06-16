import Item, { CreateItemFields, UpdateItemFields } from '../../models/item';
import Repository from '../../models/repository';
import { inject, singleton } from 'tsyringe';
import Database from '../../common/database';
import { InsertOneWriteOpResult } from 'mongodb';

const COLLECTION_NAME = 'items';

@singleton()
export default class ItemsRepository extends Repository {
    constructor(@inject(Database) database: Database) {
        super(database, COLLECTION_NAME);
    }

    public async getItem(id: string, userId: string): Promise<Item | null> {
        return this.getCollection()
            .findOne({
                _id: this.convertToObjectId(id),
                creator: this.convertToObjectId(userId),
            })
            .then(this.mapDocToEntity);
    }

    public async getAllByUser(userId: string): Promise<Item[]> {
        return this.getCollection()
            .find({ creator: this.convertToObjectId(userId) })
            .toArray()
            .then((docs) => this.mapDocsToEntities(docs));
    }

    public async createItem(userId: string, { completed, ...rest }: CreateItemFields): Promise<Item> {
        const creationDate = new Date();

        return this.getCollection()
            .insertOne({
                ...rest,
                completed: completed || false,
                creator: this.convertToObjectId(userId),
                createdAt: creationDate,
                updatedAt: creationDate,
            })
            .then((result: InsertOneWriteOpResult<any>) => result.ops[0])
            .then(this.mapDocToEntity);
    }

    public async updateItem(id: string, userId: string, fields: UpdateItemFields): Promise<Item | null> {
        return this.getCollection()
            .findOneAndUpdate(
                {
                    _id: this.convertToObjectId(id),
                    creator: this.convertToObjectId(userId),
                },
                {
                    $set: {
                        ...fields,
                        updatedAt: new Date(),
                    },
                },
                { upsert: false, returnDocument: 'after' },
            )
            .then(({ value }) => this.mapDocToEntity(value));
    }

    public async removeItem(id: string, userId: string): Promise<boolean> {
        return this.getCollection()
            .findOneAndDelete({
                _id: this.convertToObjectId(id),
                creator: this.convertToObjectId(userId),
            })
            .then(() => true);
    }
}
