import express, { Request, Response } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';

import { authRoutes } from './routes/auth';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(authRoutes);

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
