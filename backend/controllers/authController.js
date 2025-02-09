import { sql } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function loginUser(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'All fields are required.' });
    }

    try {
        const user = await sql`
            SELECT * FROM users WHERE username = ${username};
        `;

        if (user.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user[0].password_hash
        );

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password',
            });
        }

        const acessToken = jwt.sign(
            { id: user[0].id },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '15m',
            }
        );

        const refreshToken = jwt.sign(
            { id: user[0].id },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: '7d',
            }
        );

        await sql`
            INSERT INTO refresh_tokens (user_id, token, expires_at) 
            VALUES (${user[0].id}, ${refreshToken}, ${new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        )});
        `;

        res.json({ acessToken });
    } catch (error) {
        console.log('Error while trying to loginUser', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export async function registerUser(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'All fields are required.' });
    }

    try {
        const existingUsername = await sql`
        SELECT * FROM users WHERE username = ${username};`;

        const existingEmail = await sql`
        SELECT * FROM users WHERE email = ${email};`;

        if (existingUsername.length > 0)
            return res
                .status(401)
                .json({ success: false, message: 'User already exists' });

        if (existingEmail.length > 0)
            return res
                .status(401)
                .json({ success: false, message: 'Email already exists' });

        const hashed_password = await bcrypt.hash(password, 10);

        const newUser = await sql`
            INSERT INTO users (username, email, password_hash)
            VALUES (${username}, ${email}, ${hashed_password}) RETURNING *;
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

export async function refreshToken(req, res) {
    try {
        const { userId } = req.body;

        const tokenRecord = await sql`
            SELECT * FROM refresh_tokens WHERE user_id = ${userId};
        `;

        if (tokenRecord.length === 0) {
            return res
                .status(401)
                .json({ success: false, message: 'No refresh token found' });
        }

        const decodedToken = jwt.verify(
            tokenRecord[0].token,
            process.env.REFRESH_TOKEN_SECRET
        );

        if (new Date(tokenRecord[0].expires_at) < new Date()) {
            return res
                .status(401)
                .json({ success: false, message: 'Refresh token expired' });
        }

        const newAccessToken = jwt.sign(
            { id: decodedToken.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        res.json({ newAccessToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export async function logoutUser(req, res) {
    try {
        const { userId } = req.body;

        await sql`
            DELETE FROM refresh_tokens WHERE user_id = ${userId};
        `;

        res.json('Logged out');
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
