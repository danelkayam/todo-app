import Entity from './entity';

export default interface Item extends Entity {
    text: string;
    completed: boolean;
}

export type CreateItemFields = {
    text: string;
    completed?: boolean;
};

export type UpdateItemFields = Partial<CreateItemFields>;
