import { Get, OperationId, Request, Route, Security, Tags } from 'tsoa';
import { Controller } from '@tsoa/runtime';
import { DataResponse } from '../../models/response';
import { inject, injectable } from 'tsyringe';
import UsersService from './users.service';
import User from '../../models/user';

@injectable()
@Route('users')
@Tags('users')
@Security('bearerAuth')
export class UsersRouter extends Controller {
    constructor(@inject(UsersService) private readonly usersService: UsersService) {
        super();
    }

    @Get('profile')
    @OperationId('profile')
    public get(@Request() request: any): Promise<DataResponse<User>> {
        const { userId } = request.user;

        return this.usersService.getUser(userId).then((user: User) => ({
            data: user,
            error: null,
        }));
    }
}
