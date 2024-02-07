import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

const app: Express = express();
const mongoURL =
    process.env.MONGODB_URL || 'mongodb://localhost:27017/merntodo';

declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
}

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-eval'"],
        },
    })
);

mongoose
    .connect(mongoURL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(() => {
        console.log('Error connecting to MongoDB');
    });

app.get('/health', (_req: Request, res: Response) => {
    return res.status(200);
});

export default app;
