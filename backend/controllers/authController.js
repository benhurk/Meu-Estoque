import { sql } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ success: false, message: 'All fields are required.' });
        }

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

        res.status(201).json({
            success: true,
            data: newUser[0],
            message: 'User successfully registered',
        });
    } catch (error) {
        console.log('Error while trying to registerUser', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export async function loginUser(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ success: false, message: 'All fields are required.' });
        }

        const user = await sql`
            SELECT * FROM users WHERE username = ${username};
        `;

        if (user.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
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

        const accessToken = jwt.sign(
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

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            expire: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            data: accessToken,
            message: 'User successfully logged in',
        });
    } catch (error) {
        console.log('Error while trying to loginUser', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export async function refreshToken(req, res) {
    try {
        const token = await req.cookies.refreshToken;
        if (!token) return res.sendStatus(401);

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if (error) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { id: user.id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );

            res.json({ newAccessToken: accessToken });
        });
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
        res.clearCookie('refreshToken', { httpOnly: true });
        res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
