import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

export async function initDatabase() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
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
                quantity INT NOT NULL,
                alert_quantity INT NOT NULL,
                description TEXT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS logs (
                id SERIAL PRIMARY KEY,
                item_id INT NOT NULL,
                user_id INT NOT NULL,
                item_name VARCHAR(100) NOT NULL,
                change VARCHAR(100) NOT NULL,
                time VARCHAR(50) NOT NULL,
                type VARCHAR(30) NOT NULL,
                FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `;
    } catch (error) {
        console.log('Error initializing database.', error);
    }
}
