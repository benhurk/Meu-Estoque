import { sql } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function registerUser(req, res) {
    try {
        const { username, password } = await req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Preencha os campos obrigatórios.',
            });
        }

        const existingUsername = await sql`
        SELECT * FROM users WHERE username = ${username};`;

        if (existingUsername.length > 0)
            return res
                .status(401)
                .json({ success: false, message: 'Usuário já existe.' });

        const hashed_password = await bcrypt.hash(password, 10);

        await sql`
            INSERT INTO users (username, password_hash)
            VALUES (${username}, ${hashed_password});
        `;

        res.status(201).json({
            success: true,
            message: 'Registrado com sucesso.',
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
        const { username, password } = await req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Informe o usuário e a senha.',
            });
        }

        const user = await sql`
            SELECT * FROM users WHERE username = ${username};
        `;

        if (user.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Nome de usuário incorreto.',
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user[0].password_hash
        );

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Senha incorreta.',
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
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'lax', // Required for cross-site cookies
            secure: false, // Required if sameSite is 'none'
        });

        res.status(200).json({
            success: true,
            data: accessToken,
            message: 'LogIn feito com sucesso.',
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
        if (!token) return res.sendStatus(403);

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if (error) return res.sendStatus(403);

            const newAccessToken = jwt.sign(
                { id: user.id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );

            res.json({ accessToken: newAccessToken });
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
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
