import * as express from 'express';
import { AuthenticationException, AuthorizationException } from '../common/exceptions';
import { container } from 'tsyringe';
import TokensService from '../common/tokens.service';

let tokensManager: TokensService | null = null;

const verifyBearerToken = async (request: express.Request, scopes?: string[]): Promise<any> => {
    const token = getTokenFromHeader(request);

    if (!token) {
        throw new AuthenticationException('No token provided!');
    }

    if (tokensManager === null) {
        tokensManager = container.resolve(TokensService);
    }

    let decoded: any = null;

    try {
        decoded = await tokensManager.verifyToken(token);
    } catch (error) {
        throw new AuthenticationException('Unauthorized!');
    }

    if (!scopes) {
        // Is there scopes
        // Check if JWT contains all required scopes
        for (let scope of scopes) {
            if (!decoded.scope.includes(scope)) {
                throw new AuthorizationException('Action is not authorized!');
            }
        }
    }

    return decoded;
}

const getTokenFromHeader = (request: express.Request): string | null => {
    const authHeader: string | null = request.headers['authorization'] || null;

    if (!!authHeader) {
        const tokenMatch = /^(Bearer )?(.+)$/.exec(authHeader);
        return tokenMatch ? tokenMatch[2] : null;
    }

    return null;
}


// XXX: TSOA required the exported function
export async function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[],
): Promise<any> {
    if (securityName === 'bearerAuth') {
        return verifyBearerToken(request, scopes);
    }

    throw new AuthenticationException('Authentication type is not supported!');
}
