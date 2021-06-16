import { inject, singleton } from 'tsyringe';
import User, { LoginFields, RegistrationFields } from '../../models/user';
import { AuthenticationException, ItemNotFoundException } from '../../common/exceptions';
import TokensService from '../../common/tokens.service';
import UsersService from '../users/users.service';
import AuthResponse from '../../models/token';

@singleton()
export default class AuthService {
    constructor(
        @inject(UsersService) private readonly usersService: UsersService,
        @inject(TokensService) private readonly tokensManager: TokensService,
    ) {}

    public async register(fields: RegistrationFields): Promise<AuthResponse> {
        const user: User = await this.usersService.createUser(fields);
        const token: string = await this.tokensManager.signToken({ userId: user.id });

        return {
            token: {
                token,
                expires: this.tokensManager.getExpiresIn(),
            },
            profile: user,
        };
    }

    public async login(fields: LoginFields): Promise<AuthResponse> {
        try {
            const user: User = await this.usersService.getUserByCredentials(fields.email, fields.password);
            const token: string = await this.tokensManager.signToken({ userId: user.id });

            return {
                token: {
                    token,
                    expires: this.tokensManager.getExpiresIn(),
                },
                profile: user,
            };
        } catch (error: any) {
            if (error instanceof ItemNotFoundException) {
                throw new AuthenticationException('Unauthorized!');
            }

            throw error;
        }
    }
}
