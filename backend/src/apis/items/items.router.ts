import { Body, Delete, Get, OperationId, Post, Put, Request, Route, Security, SuccessResponse, Tags } from 'tsoa';
import { Controller } from '@tsoa/runtime';
import ItemsService from './items.service';
import { DataResponse } from '../../models/response';
import Item, { CreateItemFields, UpdateItemFields } from '../../models/item';
import { inject, injectable } from 'tsyringe';

@injectable()
@Route('items')
@Tags('items')
@Security('bearerAuth')
export class ItemsRouter extends Controller {
    constructor(@inject(ItemsService) private readonly itemsService: ItemsService) {
        super();
    }

    @Get('{id}')
    @OperationId('getItem')
    public get(id: string, @Request() request: any): Promise<DataResponse<Item>> {
        const { userId } = request.user;

        return this.itemsService.getItem(id, userId).then((item: Item) => ({
            data: item,
            error: null,
        }));
    }

    @Get()
    public getAll(@Request() request: any) {
        const { userId } = request.user;

        return this.itemsService.getAllItemsByUser(userId).then((items: Item[]) => ({
            data: items,
            error: null,
        }));
    }

    @Post()
    @OperationId('createItem')
    public create(@Body() fields: CreateItemFields, @Request() request: any): Promise<DataResponse<Item>> {
        const { userId } = request.user;

        return this.itemsService.createItem(userId, fields).then((item: Item) => ({
            data: item,
            error: null,
        }));
    }

    @Put('{id}')
    @OperationId('updateItem')
    public update(id: string, @Body() fields: UpdateItemFields, @Request() request: any): Promise<DataResponse<Item>> {
        const { userId } = request.user;

        return this.itemsService.updateItem(id, userId, fields).then((item: Item) => ({
            data: item,
            error: null,
        }));
    }

    @Delete('{id}')
    @SuccessResponse(204, 'Deleted')
    @OperationId('deleteItem')
    public async delete(id: string, @Request() request: any): Promise<any> {
        const { userId } = request.user;

        await this.itemsService.removeItem(id, userId);
        return;
    }
}
