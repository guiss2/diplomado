import jwt from 'jsonwebtoken';
import config from '../config/env.js';

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token

    if (token === null) return res.status(401);
  //verificamos y decodificamos el token
    jwt.verify(token, config.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user; // Attach user info to request
        next(); // Proceed to the next middleware or route handler
    });
}