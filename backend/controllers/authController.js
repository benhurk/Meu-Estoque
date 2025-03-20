import { supabase } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function registerUser(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Preencha os campos obrigatórios.',
            });
        }

        const { data: existingUser, existingUserError } = await supabase
            .from('users')
            .select('*')
            .eq('username', username);

        if (existingUserError) throw existingUserError;

        if (existingUser.length > 0)
            return res.status(401).json({
                success: false,
                message: 'Nome de usuário já registrado.',
            });

        const hashed_password = await bcrypt.hash(password, 10);

        const { data: newUser, insertError } = await supabase
            .from('users')
            .insert([{ username, password_hash: hashed_password }]);

        if (insertError) throw insertError;

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
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Informe o usuário e a senha.',
            });
        }

        const { data: user, userError } = await supabase
            .from('users')
            .select('*')
            .eq('username', username);

        if (userError) throw userError;

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
            sameSite: 'None',
            secure: true,
        });

        res.status(200).json({
            success: true,
            accessToken,
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
        const token = req.cookies.refreshToken;
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
