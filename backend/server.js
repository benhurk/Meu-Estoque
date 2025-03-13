import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { aj } from './lib/arcjet.js';
import { initDatabase } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import itemsRoutes from './routes/itemsRoutes.js';
import logsRoutes from './routes/logsRoutes.js';

import authenticateToken from './middlewares/authenticateToken.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || '5000';

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ['http://localhost:5173', 'https://meuestoque.app.br'],
        credentials: true,
    })
);
app.use(helmet());
app.use(morgan('dev'));

app.use(async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.status(429).json({ error: 'Too many requests' });
            } else if (decision.reason.isBot()) {
                res.status(403).json({ error: 'Bot access denied' });
            } else {
                res.status(403).json({ error: 'Forbidden' });
            }
            return;
        }

        if (
            decision.results.some(
                (result) => result.reason.isBot() && result.reason.isSpoofed()
            )
        ) {
            res.status(403).json({ error: 'Bot access denied' });
            return;
        }

        next();
    } catch (error) {
        console.log('Arcjet error', error);
        next(error);
    }
});

app.use('/api/auth', authRoutes);
app.use('/api/items', authenticateToken, itemsRoutes);
app.use('/api/logs', authenticateToken, logsRoutes);

initDatabase().then(() => {
    app.listen(PORT, () => {
        console.log('Server running on port', PORT);
    });
});
