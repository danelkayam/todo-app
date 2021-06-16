import morgan from 'morgan';

const logger = {
    debug: (...data: any[]) => console.debug(...data),
    info: (...data: any[]) => console.info(...data),
    warn: (...data: any[]) => console.warn(...data),
    error: (...data: any[]) => console.error(...data),
};

const expressMiddleware = () => {
    return morgan('short', {
        stream: {
            write: (message: string) => {
                logger.debug(message.replace('\n', ''));
            },
        },
    });
};

export { expressMiddleware };
export default logger;
