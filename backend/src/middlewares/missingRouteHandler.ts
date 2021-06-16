import { Request, Response, NextFunction } from 'express';
import { MissingRouteException } from '../common/exceptions';

export default function missingRouteHandler(req: Request, res: Response, next: NextFunction) {
    if (!req.route) {
        next(new MissingRouteException('Not Found'));
    } else {
        return next();
    }
}
