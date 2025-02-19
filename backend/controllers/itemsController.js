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

        res.status(201).json({
            success: true,
            newItem: newItem[0],
        });
    } catch (error) {
        console.log('Error while trying to addNewItem', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export async function changeItemQuantity(req, res) {
    try {
        const userId = await req.user.id;
        const targetId = await req.params.id;

        const { newValue, time, change, type } = await req.body;

        const updatedItem = await sql`
            UPDATE items SET quantity = ${newValue}
            WHERE id = ${targetId} AND user_id = ${userId}
            RETURNING *;
        `;

        console.log(updatedItem);

        const log = await sql`
            INSERT INTO logs (user_id, item_id, item_name, change, time, type)
            VALUES (${userId}, ${updatedItem[0].id}, ${updatedItem[0].name}, ${change}, ${time}, ${type})
            RETURNING id, item_name, change, time, type;
        `;

        res.status(200).json({
            success: true,
            log: log[0],
        });
    } catch (error) {
        console.log('Error while trying to changeItemQuantity', error);
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

        res.status(200).json({
            success: true,
            editedItem: editedItem[0],
        });
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

        const removedItem = await sql`
            DELETE FROM items WHERE id = ${targetId} AND user_id = ${userId} RETURNING name;
        `;

        res.status(200).json({ removedItem: removedItem[0] });
    } catch (error) {
        console.log('Error while trying to deleteItem', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export async function deleteSelectedItems(req, res) {
    try {
        const userId = await req.user.id;
        const { ids } = await req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: 'Invalid or empty id array' });
        }

        const removedItems = await sql`
            DELETE FROM items WHERE id = ANY(${ids}) AND user_id = ${userId} RETURNING name;
        `;

        res.status(200).json({ removedItems });
    } catch (error) {
        console.log('Error while trying to deleteSelectedItems', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export async function deleteAllItems(req, res) {
    try {
        const userId = await req.user.id;

        await sql`
            DELETE FROM items WHERE user_id = ${userId};
        `;

        res.sendStatus(200);
    } catch (error) {
        console.log('Error while trying to deleteAllItems', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
