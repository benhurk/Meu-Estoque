import { sql } from '../config/db.js';

export async function getAllUserItems(req, res) {
    try {
        const userId = req.user.id;

        const userItems = await sql`
            SELECT * FROM items WHERE user_id = ${userId};
        `;

        res.json({ userItems });
    } catch (error) {
        console.log('Error while trying to getAllUserItems', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export async function addNewItem(req, res) {}
