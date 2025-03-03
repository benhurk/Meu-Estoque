import { supabase } from '../config/db.js';
import keysToSnakeCase from '../utils/camelToSnake.js';
import returnColumns from '../utils/returnColumns.js';

export async function getAllUserItems(req, res) {
    try {
        const userId = req.user.id;

        const { data: userItems, error } = await supabase
            .from('items')
            .select(returnColumns.items.join(', '))
            .eq('user_id', userId)
            .order('id', { ascending: true });

        if (error) throw error;

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
        const userId = req.user.id;
        const {
            name,
            quantityType,
            unitOfMeasurement,
            quantity,
            alertQuantity,
            description,
        } = req.body;

        const { data: newItem, error } = await supabase
            .from('items')
            .insert([
                {
                    user_id: userId,
                    name,
                    quantity_type: quantityType,
                    unit_of_measurement: unitOfMeasurement,
                    quantity,
                    alert_quantity: alertQuantity,
                    description,
                },
            ])
            .select(returnColumns.items.join(', '));

        if (error) throw error;

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

export async function uploadItems(req, res) {
    const userId = req.user.id;
    const { items, logs } = req.body;

    if (!items || !Array.isArray(items) || !logs || !Array.isArray(logs)) {
        return res
            .status(400)
            .json({ success: false, message: 'Invalid body data' });
    }

    const snakeCaseItems = items.map((item) => {
        return { user_id: userId, ...keysToSnakeCase(item) };
    });
    const snakeCaseLogs = logs.map((log) => keysToSnakeCase(log));

    try {
        const { data: uploadedItems, itemsError } = await supabase
            .from('items')
            .insert(snakeCaseItems)
            .select(returnColumns.items.join(', '));

        if (itemsError) throw itemsError;

        const completeLogs = snakeCaseLogs.map((log) => {
            return {
                ...log,
                item_id: uploadedItems.filter(
                    (item) => item.name === log.item_name
                )[0].id,
                user_id: userId,
            };
        });

        const { data: uploadedLogs, logsError } = await supabase
            .from('logs')
            .insert(completeLogs)
            .select(returnColumns.logs.join(', '));

        if (logsError) throw logsError;

        res.status(201).json({ uploadedItems, uploadedLogs });
    } catch (error) {
        console.log('Error while trying to uploadItems', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
        });
    }
}

export async function changeItemQuantity(req, res) {
    try {
        const userId = req.user.id;
        const targetId = req.params.id;

        const { newValue, time, month, year, change, type } = req.body;

        const { data: updatedItem, updateError } = await supabase
            .from('items')
            .update({ quantity: newValue })
            .eq('id', targetId)
            .eq('user_id', userId)
            .select();

        if (updateError) throw updateError;

        const { data: log, logError } = await supabase
            .from('logs')
            .insert([
                {
                    user_id: userId,
                    item_id: updatedItem[0].id,
                    item_name: updatedItem[0].name,
                    change,
                    month,
                    year,
                    time,
                    type,
                },
            ])
            .select(returnColumns.logs.join(', '));

        if (logError) throw logError;

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
        const userId = req.user.id;
        const targetId = req.params.id;

        const {
            name,
            quantityType,
            unitOfMeasurement,
            quantity,
            alertQuantity,
            description,
        } = req.body;

        const { data: editedItem, error } = await supabase
            .from('items')
            .update({
                name,
                quantity_type: quantityType,
                unit_of_measurement: unitOfMeasurement,
                quantity,
                alert_quantity: alertQuantity,
                description,
            })
            .eq('id', targetId)
            .eq('user_id', userId)
            .select(returnColumns.items.join(', '));

        if (error) throw error;

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
        const userId = req.user.id;
        const id = req.params.id;

        const { error } = await supabase
            .from('items')
            .delete()
            .eq('id', id)
            .eq('user_id', userId);

        if (error) throw error;

        res.status(200);
    } catch (error) {
        console.log('Error while trying to deleteItem', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export async function deleteAllItems(req, res) {
    try {
        const userId = req.user.id;

        const { error } = await supabase
            .from('items')
            .delete()
            .eq('user_id', userId);

        if (error) throw error;

        res.sendStatus(200);
    } catch (error) {
        console.log('Error while trying to deleteAllItems', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
