import { sql } from '../config/db.js';

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
