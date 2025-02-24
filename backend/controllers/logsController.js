import { supabase } from '../config/db.js';

export async function getUserLogs(req, res) {
    try {
        const userId = req.user.id;

        const { data: userLogs, error } = await supabase
            .from('logs')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            throw error;
        }

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
