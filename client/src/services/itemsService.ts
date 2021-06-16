import Item, { CreateItemFields, UpdateItemFields } from '../models/item';
import AuthService from './authService';
import performRequest from './backendService';

export default class ItemsService {
    constructor(private readonly authService: AuthService) {}

    public async getAll(): Promise<Item[]> {
        return this.authService.getToken().then((token) => {
            return performRequest({ url: 'api/items', method: 'get', token: token?.token });
        });
    }

    public async get(id: string): Promise<Item | null> {
        return this.authService.getToken().then((token) => {
            return performRequest({ url: `api/items/${id}`, method: 'get', token: token?.token });
        });
    }

    public async create(fields: CreateItemFields): Promise<Item> {
        return this.authService.getToken().then((token) => {
            return performRequest({ url: `api/items/`, method: 'post', data: fields, token: token?.token });
        });
    }

    public async update(id: string, fields: UpdateItemFields): Promise<Item> {
        return this.authService.getToken().then((token) => {
            return performRequest({ url: `api/items/${id}`, method: 'put', data: fields, token: token?.token });
        });
    }

    public async delete(id: string): Promise<boolean> {
        return this.authService.getToken().then((token) => {
            return performRequest({ url: `api/items/${id}`, method: 'delete', token: token?.token });
        });
    }
}
