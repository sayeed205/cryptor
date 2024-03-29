import type { SanitizeOptions } from '@server/types';
import { sanitize } from '@server/utils';

export const xss = (options?: SanitizeOptions): ExpressMiddleware => {
    return (req, _res, next) => {
        req.body = sanitize(req.body, options);
        req.query = sanitize(req.query, options) as unknown as typeof req.query;
        req.params = sanitize(
            req.params,
            options,
        ) as unknown as typeof req.params;

        next();
    };
};
