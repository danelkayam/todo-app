import { inject, singleton } from 'tsyringe';
import jwt, { VerifyErrors } from 'jsonwebtoken';

export const AUTH_PARAM_SECRET = 'AUTH_SECRET';
export const AUTH_PARAM_EXPIRES_IN = 'AUTH_EXPIRES_IN';
export const AUTH_PARAM_AUDIENCE = 'AUTH_AUDIENCE';
export const AUTH_PARAM_ISSUER = 'AUTH_ISSUER';

@singleton()
export default class TokensService {
    private readonly options;

    constructor(
        @inject(AUTH_PARAM_SECRET) private readonly secret: string,
        @inject(AUTH_PARAM_EXPIRES_IN) private readonly expiresIn: number,
        @inject(AUTH_PARAM_AUDIENCE) private readonly audience: string,
        @inject(AUTH_PARAM_ISSUER) private readonly issuer: string,
    ) {
        this.options = {
            expiresIn,
            audience,
            issuer,
        };
    }

    public signToken(data: object): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(data, this.secret, this.options, (error: Error, encoded: string) => {
                if (!!error) {
                    reject(error);
                } else {
                    resolve(encoded);
                }
            });
        });
    }

    public verifyToken(token: string): Promise<object> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secret, this.options, (error: VerifyErrors, decoded: object) => {
                if (!!error) {
                    reject(error);
                } else {
                    resolve(decoded);
                }
            });
        });
    }

    public getExpiresIn(): number {
        return this.expiresIn;
    }
}
