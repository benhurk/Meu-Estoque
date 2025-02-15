import { sql } from '../config/db.js';

export async function getAllUserItems(req, res) {
    try {
        const userId = await req.user.id;

        const userItems = await sql`
            SELECT * FROM items WHERE user_id = ${userId} ORDER BY id ASC;
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

        const newItem = await sql`
            INSERT INTO items (user_id, name, quantity_type, unit_of_measurement, quantity, alert_quantity, description) 
            VALUES (${userId}, ${name}, ${quantityType}, ${unitOfMeasurement}, ${quantity}, ${alertQuantity}, ${description}) 
            RETURNING id, name, quantity_type, unit_of_measurement, quantity, alert_quantity, description;
        `;

        res.status(201).json({ success: true, newItem: newItem[0] });
    } catch (error) {
        console.log('Error while trying to addNewItem', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export async function editItem(req, res) {
    try {
        const userId = await req.user.id;
        const targetId = await req.params.id;

        const {
            name,
            quantityType,
            unitOfMeasurement,
            quantity,
            alertQuantity,
            description,
        } = await req.body;

        const editedItem = await sql`
            UPDATE items SET name = ${name}, quantity_type = ${quantityType}, unit_of_measurement = ${unitOfMeasurement},
                            quantity = ${quantity}, alert_quantity = ${alertQuantity}, description = ${description} 
            WHERE id = ${targetId} AND user_id = ${userId}
            RETURNING *;
        `;

        res.status(200).json({ success: true, editedItem: editedItem[0] });
    } catch (error) {
        console.log('Error while trying to editItem', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export async function deleteItem(req, res) {
    try {
        const userId = await req.user.id;
        const targetId = await req.params.id;

        await sql`
            DELETE FROM items WHERE id = ${targetId} AND user_id = ${userId};
        `;

        res.sendStatus(200);
    } catch (error) {
        console.log('Error while trying to deleteItem', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
