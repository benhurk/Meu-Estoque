import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const { SUPABASE_URL, SUPABASE_KEY } = process.env;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function initDatabase() {
    try {
        const { data: usersTable, error: usersError } = await supabase.rpc(
            'create_users_table'
        );
        if (usersError) throw usersError;

        const { data: itemsTable, error: itemsError } = await supabase.rpc(
            'create_items_table'
        );
        if (itemsError) throw itemsError;

        const { data: logsTable, error: logsError } = await supabase.rpc(
            'create_logs_table'
        );
        if (logsError) throw logsError;

        console.log('Database initialized successfully.');
    } catch (error) {
        console.log('Error initializing database.', error);
    }
}
