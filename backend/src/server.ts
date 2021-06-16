import express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import errorHandler from './middlewares/errorHandler';
import missingRouteHandler from './middlewares/missingRouteHandler';
import * as http from 'http';
import compression from 'compression';
import helmet from 'helmet';
import logger from './common/logger';
import swagger from './middlewares/swagger';
import { RegisterRoutes } from './apis';
import { inject, singleton } from 'tsyringe';

export const SERVER_PARAM_PORT = 'server_port';
export const SERVER_PARAM_ENABLE_SWAGGER_UI = 'server_enable_swagger_ui';

@singleton()
export default class Server {
    private readonly port: any;
    private readonly app: express.Express;
    private readonly httpServer: http.Server;
    private isRunning: boolean = false;

    constructor(
        @inject(SERVER_PARAM_PORT) port: number,
        @inject(SERVER_PARAM_ENABLE_SWAGGER_UI) enableSwaggerUI: boolean,
    ) {
        this.port = port;
        this.app = express();
        this.app.use(compression());
        this.app.use(helmet()); // Securing express
        this.app.use(bodyParser.json()); // parses the client’s request from json into javascript objects
        this.app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
        this.app.enable('trust proxy');

        RegisterRoutes(this.app);

        if (enableSwaggerUI) {
            const swaggerDefinitionPath = path.join(__dirname, 'apis/swagger.yaml');
            this.app.use('/api/docs', swagger(swaggerDefinitionPath));
        }

        this.app.use(missingRouteHandler);
        this.app.use(errorHandler);
        this.httpServer = http.createServer(this.app);
    }

    public start = (): Promise<void> => {
        logger.info(`Starting server...`);

        return new Promise<void>((resolve, reject) => {
            this.httpServer.once('error', (error: NodeJS.ErrnoException) => {
                switch (error.code) {
                    case 'EACCES':
                        reject(new Error(`Permission denied accessing port: ${this.port}`));
                        break;
                    case 'EADDRINUSE':
                        reject(new Error(`Port: ${this.port} already in use!`));
                        break;
                    default:
                        reject(error);
                }
            });

            this.httpServer.once('listening', () => {
                logger.info(`Starting server... DONE`);
                this.isRunning = true;
                resolve();
            });

            this.httpServer.listen(this.port);
        });
    };

    public stop = (): Promise<void> => {
        logger.info(`Stopping server...`);

        if (!this.isRunning) {
            logger.info(`Stopping server... NOT RUNNING`);
            return Promise.resolve();
        }

        return new Promise<void>((resolve, reject) => {
            this.httpServer.close((error?: Error) => {
                this.isRunning = false;

                if (!!error) {
                    reject(error);
                }

                logger.info(`Stopping server... DONE`);
                resolve();
            });
        });
    };

    public getPort = (): any => this.port;
}
