import { inject, singleton } from 'tsyringe';
import { MongoClient, MongoClientOptions } from 'mongodb';
import logger from './logger';

const CONNECTION_OPTIONS: MongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

export const DATABASE_PARAM_URI = 'database_uri';

@singleton()
export default class Database {
    private client: MongoClient;

    constructor(@inject(DATABASE_PARAM_URI) private readonly uri: string) {}

    public async connect(): Promise<boolean> {
        try {
            logger.info('Connecting to database...');

            this.client = await MongoClient.connect(this.uri, CONNECTION_OPTIONS);

            const databaseName = this.client.db().databaseName;
            this.client.once('close', () => {
                logger.warn(`Database connection \"${databaseName}\" has been closed`);
            });
            logger.info(`Connecting to database \"${databaseName}\"... DONE`);

            return true;
        } catch (err) {
            logger.error(`Error while trying connecting to database, error: ${err.message}`);
            throw err;
        }
    }

    public async disconnect(): Promise<boolean> {
        try {
            const databaseName = this.client.db().databaseName;

            logger.info(`Disconnecting from database \"${databaseName}\"...`);

            await this.client.close();

            logger.info(`Disconnecting from database \"${databaseName}\"... DONE`);
            return true;
        } catch (error) {
            logger.warn(`Error while close connection got error: ${error}`);
            return false;
        }
    }

    public isConnected(): boolean {
        return this.client?.isConnected() || false;
    }

    public getConnection(): MongoClient {
        return this.client;
    }
}
