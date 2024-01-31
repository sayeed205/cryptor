import compression from 'compression';
import cors from 'cors';
import express, { type Request } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import next from 'next';

import { env } from '@/config';
import { errorHandler, xss } from '@/middlewares';
import { compress } from '@/utils';

const nextApp = next({ dev: env.nodeEnv !== 'production' });
const nextHandler = nextApp.getRequestHandler();

await nextApp.prepare();

const app = express();

/*<!---------- Helmet is used to secure this app by configuring the http-header ---------> */
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*<!---------- XSS is used to sanitize the request body, query, and params ---------> */
app.use(xss());

/*<!---------- Compression is used to compress the response body ---------> */
app.use(compression({ filter: compress }));

app.use(cors({ origin: env.cors.origin }));

/*<!---------- Morgan is used to log the request ---------> */
app.use(morgan('dev'));

app.get('/api', (_req, res) => {
    console.log('Hello from server!');
    res.json({ message: 'Hello from server!' });
});

app.all('*', (req: Request, res) => {
    const path = req.path.split('/')[1];

    if (path !== 'api') return nextHandler(req, res);

    return res.status(404).json({
        ok: false,
        message: `Can't find '${req.originalUrl}' on this server!`,
    });
});

/*<!---------- Error handler ---------> */
app.use(errorHandler);

export default app;
