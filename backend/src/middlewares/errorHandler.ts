import { Request, Response, NextFunction } from 'express';
import { AppException } from '../common/exceptions';
import logger from '../common/logger';

export default function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if (!!error) {
        if (error instanceof AppException) {
            return res.status(error.code).json({ data: null, error: { message: error.message } });
        }

        // checks if the error is a validation error from tsoa / express.
        if (error['status'] === 400) {
            return res.status(400).json({ data: null, error: { message: 'Bad Request!' } });
        }

        const message = `remote ip: ${req.connection.remoteAddress} UserAgent: ${req.headers['user-agent']} - at method ${req.method}-> ${req.protocol}://${req.hostname}${req.path} - ${error.stack}`;

        logger.error(message);

        return res.sendStatus(500);
    } else {
        return next();
    }
}
