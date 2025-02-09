import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import listItemRoutes from './routes/listItemRoutes.js';
import { sql } from './config/db.js';
import { aj } from './lib/arcjet.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || '4000';

app.use(express.json());
app.use(cors());
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

app.use('/api/users', userRoutes);
app.use('/api/items', listItemRoutes);

async function initDatabase() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL
            );
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS items (
                id SERIAL PRIMARY KEY,
                user_id INT NOT NULL,
                name VARCHAR(100) NOT NULL,
                quantity_type VARCHAR(50) NOT NULL,
                unit_of_measurement VARCHAR(50),
                options TEXT,
                quantity INT NOT NULL,
                alert_quantity INT NOT NULL,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `;
    } catch (error) {
        console.log('Error initializing database.', error);
    }
}

initDatabase().then(() => {
    app.listen(PORT, () => {
        console.log('Hello backend', PORT);
    });
});
