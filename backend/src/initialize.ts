import { container } from 'tsyringe';
import * as dotenv from 'dotenv';

import Database, { DATABASE_PARAM_URI } from './common/database';
import Server, { SERVER_PARAM_PORT, SERVER_PARAM_ENABLE_SWAGGER_UI } from './server';
import UsersRepository from './apis/users/users.repository';
import TokensService, {
    AUTH_PARAM_AUDIENCE,
    AUTH_PARAM_EXPIRES_IN,
    AUTH_PARAM_ISSUER,
    AUTH_PARAM_SECRET,
} from './common/tokens.service';

dotenv.config();

const ENVIRONMENT = process.env.NODE_ENV || 'local';

const DATABASE_URI: string = process.env.DATABASE_URI;
const SERVICE_PORT = Number(process.env.SERVICE_PORT || 3000);
const SERVICE_ENABLE_SWAGGER_UI = process.env.SERVICE_ENABLE_SWAGGER?.toLocaleLowerCase() === 'true';

const AUTH_SECRET = process.env.AUTH_JWT_SECRET;
const AUTH_EXPIRES = Number(process.env.AUTH_JWT_EXPIRES_IN);
const AUTH_AUDIENCE = process.env.AUTH_JWT_AUDIENCE;
const AUTH_ISSUER = process.env.AUTH_JWT_ISSUER;

type Result = {
    environment: string;
    database: Database;
    server: Server;
};

export function initializeComponents(): Result {
    container.register(DATABASE_PARAM_URI, { useValue: DATABASE_URI });
    container.register(SERVER_PARAM_PORT, { useValue: SERVICE_PORT });
    container.register(SERVER_PARAM_ENABLE_SWAGGER_UI, {
        useValue: SERVICE_ENABLE_SWAGGER_UI,
    });

    container.register(AUTH_PARAM_SECRET, { useValue: AUTH_SECRET });
    container.register(AUTH_PARAM_EXPIRES_IN, { useValue: AUTH_EXPIRES });
    container.register(AUTH_PARAM_AUDIENCE, { useValue: AUTH_AUDIENCE });
    container.register(AUTH_PARAM_ISSUER, { useValue: AUTH_ISSUER });

    const tokensManager = container.resolve(TokensService);
    const database = container.resolve(Database);
    const server = container.resolve(Server);

    return {
        environment: ENVIRONMENT,
        database,
        server,
    };
}

export async function initializeDatabaseRepositories(): Promise<any> {
    const usersRepository = container.resolve(UsersRepository);
    await usersRepository.initialize();
    return true;
}
