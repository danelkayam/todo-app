import Entity from './entity';

export default interface Item extends Entity {
    text: string;
    completed: boolean;
    creator: string;
}

export type CreateItemFields = {
    text: string;
    completed?: boolean;
};

// XXX: this type is a quick fix since Partial allows empty objects and TSOA has some issues with more complicated ones
export type UpdateItemFields = CreateItemFields | { text: string } | { completed: boolean };
