import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Access token expired' });
            }

            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
}
