import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AuthenticationError } from '../utils/errors';

// Extend Express Request interface to include userId
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

/**
 * Middleware to authenticate JWT token
 * Extracts token from Authorization header and verifies it
 * Adds userId to request object for use in subsequent middleware/routes
 */
export const authenticate = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AuthenticationError('No token provided. Please authenticate.');
        }

        // Extract token (format: "Bearer <token>")
        const token = authHeader.substring(7);

        if (!token) {
            throw new AuthenticationError('Invalid token format');
        }

        // Verify token and extract payload
        const decoded = verifyToken(token);

        // Attach user ID to request object
        req.userId = decoded.userId;

        next();
    } catch (error) {
        next(error);
    }
};
