import { Body, OperationId, Post, Route, Tags } from 'tsoa';
import { Controller } from '@tsoa/runtime';
import { DataResponse } from '../../models/response';
import { inject, injectable } from 'tsyringe';
import AuthService from './auth.service';
import { LoginFields, RegistrationFields } from '../../models/user';
import Token from '../../models/token';

@injectable()
@Route('auth')
@Tags('auth')
export class AuthRouter extends Controller {
    constructor(@inject(AuthService) private readonly authService: AuthService) {
        super();
    }

    @Post('register')
    @OperationId('register')
    public signUp(@Body() fields: RegistrationFields): Promise<DataResponse<Token>> {
        return this.authService.register(fields).then((token: Token) => ({
            data: token,
            error: null,
        }));
    }

    @Post('login')
    @OperationId('login')
    public login(@Body() fields: LoginFields): Promise<DataResponse<Token>> {
        return this.authService.login(fields).then((token: Token) => ({
            data: token,
            error: null,
        }));
    }
}
