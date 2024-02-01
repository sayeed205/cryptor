import { env } from '@server/../config';
import { errorHandler, xss } from '@server/middlewares';
import { compress } from '@server/utils';
import compression from 'compression';
import cors from 'cors';
import express, { type Request } from 'express';
import helmet from 'helmet';
import next from 'next';

const nextApp = next({ dev: env.nodeEnv !== 'production' });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare();

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

app.get('/api', (_req, res) => {
    console.log('Hello from server!');
    res.json({ message: 'Hello from server!' });
});

/*<!---------- Next.js and 404 handler ---------> */
app.all('*', (req: Request, res) => {
    // const path = req.path.split('/')[1];

    // if (path !== 'api') return nextHandler(req, res);

    // return res.status(404).json({
    //     ok: false,
    //     message: `Can't find '${req.originalUrl}' on this server!`,
    // });
    return nextHandler(req, res);
});

/*<!---------- Error handler ---------> */
app.use(errorHandler);

export default app;
