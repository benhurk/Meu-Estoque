import { sql } from '../config/db.js';

export async function getUserLogs(req, res) {
    try {
        const userId = req.user.id;

        const userLogs = await sql`
            SELECT * FROM logs WHERE user_id = ${userId};
        `;

        res.status(200).json({ userLogs });
    } catch (error) {
        console.log('Error while trying to getUserLogs', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export async function deleteLog(req, res) {
    try {
        const userId = req.user.id;
        const targetId = req.params.id;

        await sql`
            DELETE FROM logs WHERE id = ${targetId} AND user_id = ${userId};
        `;

        res.sendStatus(200);
    } catch (error) {
        console.log('Error while trying to deleteLog', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
