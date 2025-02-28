import { supabase } from '../config/db.js';
import returnColumns from '../utils/returnColumns.js';

export async function getUserLogs(req, res) {
    try {
        const userId = req.user.id;
        const { month } = req.query;

        if (!month || typeof month != 'string') {
            res.status(400).json({
                success: false,
                message: 'Invalid or missing month value',
            });
        }

        const { data: userLogs, error } = await supabase
            .from('logs')
            .select(returnColumns.logs.join(', '))
            .eq('month', month)
            .eq('user_id', userId);

        if (error) {
            throw error;
        }

        console.log(userLogs);

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

        const { error } = await supabase
            .from('logs')
            .delete()
            .eq('id', targetId)
            .eq('user_id', userId);

        if (error) {
            throw error;
        }

        res.sendStatus(200);
    } catch (error) {
        console.log('Error while trying to deleteLog', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
