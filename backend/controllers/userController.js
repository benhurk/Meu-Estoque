import { sql } from '../config/db.js';

export async function getAllUsers(req, res) {
    try {
        const users = await sql`
            SELECT * FROM users;
        `;

        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log('Error while trying to getAllUsers', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export async function getUser(req, res) {
    const { id } = req.params;

    try {
        const user = await sql`
            SELECT * FROM users WHERE id=${id};
        `;

        res.status(200).json({ success: true, data: user[0] });
    } catch (error) {
        console.log('Error while trying to getUser', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export async function registerUser(req, res) {
    const { username, email, hashed_password } = req.body;

    if (!username || !email || !hashed_password) {
        return res
            .status(400)
            .json({ success: false, message: 'All fields are required.' });
    }

    try {
        const newUser = await sql`
            INSER INTO users (username, email, password_hash)
            VALUES (${username}, ${email}, ${hashed_password}})
            RETURNING *;
        `;

        res.status(201).json({ success: true, data: newUser[0] });
    } catch (error) {
        console.log('Error while trying to registerUser', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export async function updateUser(req, res) {
    const { id } = req.params;
    const { email, hashed_password } = req.body;

    try {
        const updatedUser = await sql`
            UPDATE users SET email=${email}, password_hash=${hashed_password}
            WHERE id=${id}
            RETURNING *;
        `;

        if (updatedUser.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({ success: true, data: updatedUser[0] });
    } catch (error) {
        console.log('Error while trying to updateUser', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        const deletedUser = await sql`
            DELETE FROM users WHERE id=${id}
        `;

        if (deletedUser.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            data: deletedUser[0],
        });
    } catch (error) {
        console.log('Error while trying to deleteUser', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
