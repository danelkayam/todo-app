import Item, { CreateItemFields, UpdateItemFields } from '../../models/item';
import ItemsRepository from './items.repository';
import { ItemNotFoundException } from '../../common/exceptions';
import { inject, singleton } from 'tsyringe';

@singleton()
export default class ItemsService {
    constructor(@inject(ItemsRepository) private readonly itemsRepository: ItemsRepository) {}

    public async getItem(id: string, userId: string): Promise<Item> {
        const item = await this.itemsRepository.getItem(id, userId);

        if (item === null) {
            throw new ItemNotFoundException(`No item found: ${id}`);
        }

        return item;
    }

    public async getAllItemsByUser(userId: string): Promise<Item[]> {
        return this.itemsRepository.getAllByUser(userId);
    }

    public async createItem(userId: string, fields: CreateItemFields): Promise<Item> {
        return this.itemsRepository.createItem(userId, fields);
    }

    public async updateItem(id: string, userId: string, fields: UpdateItemFields): Promise<Item> {
        const item = await this.itemsRepository.updateItem(id, userId, fields);

        if (item === null) {
            throw new ItemNotFoundException(`No item found: ${id}`);
        }

        return item;
    }

    public async removeItem(id: string, userId: string): Promise<boolean> {
        return this.itemsRepository.removeItem(id, userId);
    }
}
