import 'reflect-metadata';

import { initializeProcessEvents, initializeTerminationListeners } from './utils/process';
import logger from './common/logger';
import { initializeComponents, initializeDatabaseRepositories } from './initialize';
import Server from './server';
import Database from './common/database';

async function main() {
    logger.info(`Initialize server...`);

    const { environment, database, server } = initializeComponents();

    initializeTerminationListeners(releaseResource.bind(null, server, database));
    initializeProcessEvents();

    logger.info(`Initialize server... DONE`);

    try {
        await database.connect();
        await initializeDatabaseRepositories();
        await server.start();
    } catch (error) {
        logger.error(`Failed starting server`, error);
        process.exit(1);
    }

    logger.info(`Server on ${environment} is up and running on port:${server.getPort()}`);
}

function releaseResource(server: Server, database: Database): Promise<any> {
    return server.stop().finally(() => (database.isConnected() ? database.disconnect() : false));
}

main();
