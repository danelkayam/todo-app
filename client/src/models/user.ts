import Entity from './entity';

export default interface User extends Entity {
    name: string;
    email: string;
}
