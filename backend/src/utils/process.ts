import logger from '../common/logger';

export function initializeTerminationListeners(beforeExitFn: () => Promise<any>) {
    process.once('SIGTERM', function onSigterm() {
        logger.info('\nGot SIGTERM. Graceful shutdown start', new Date().toUTCString());
        beforeExitFn().then(() => process.exit(0));
    });
    process.once('SIGINT', function onSigint() {
        logger.info('\nGot SIGINT, <Ctrl>+C, shutdown', new Date().toUTCString());
        beforeExitFn().then(() => process.exit(0));
    });
}

export function initializeProcessEvents() {
    process.on('uncaughtException', (error) => {
        logger.error(`There was an uncaught error ${new Date().toUTCString()}`, error);
    });
    process.on('unhandledRejection', (error) => {
        logger.error(`There was an unhandledRejection error ${new Date().toUTCString()}`, error);
    });
}
