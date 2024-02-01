/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from 'express';
import 'express-session';

import { User } from '../../models';

declare global {
    namespace Express {
        export interface Request {
            user?: User;
            locale?: string;
        }
    }

    export type ExpressMiddleware = <ParamsDictionary, any, any>(
        req: Request,
        res: Response,
        next: NextFunction,
    ) => Promise<void | NextFunction> | void | NextFunction;

    export type ExpressController = <ParamsDictionary, any, any>(
        req: Request,
        res: Response,
    ) =>
        | Promise<void | Response<any, Record<string, any>>>
        | void
        | Response<any, Record<string, any>>;
}
