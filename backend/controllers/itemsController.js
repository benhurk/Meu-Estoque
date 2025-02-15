import { sql } from '../config/db.js';

export async function getAllUserItems(req, res) {
    try {
        const userId = await req.user.id;

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

export async function addNewItem(req, res) {
    try {
        const userId = await req.user.id;
        const {
            name,
            quantityType,
            unitOfMeasurement,
            quantity,
            alertQuantity,
            description,
        } = await req.body;

        await sql`
            INSERT INTO items (user_id, name, quantity_type, unit_of_measurement, quantity, alert_quantity, description) 
            VALUES (${userId}, ${name}, ${quantityType}, ${unitOfMeasurement}, ${quantity}, ${alertQuantity}, ${description});
        `;

        res.sendStatus(201);
    } catch (error) {
        console.log('Error while trying to addNewItem', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
