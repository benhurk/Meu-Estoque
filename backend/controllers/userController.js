import { sql } from '../config/db.js';

export async function getUserData(req, res) {
    try {
        const userId = await req.user.id;

        const userItems = await sql`
            SELECT * FROM items WHERE user_id = ${userId} ORDER BY id ASC;
        `;

        const userLogs = await sql`
            SELECT * FROM logs WHERE user_id = ${userId} ORDER BY id ASC;
        `;

        res.json({ userItems, userLogs });
    } catch (error) {
        console.log('Error while trying to getUserData', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
