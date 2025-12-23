import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AuthenticationError } from './errors';

export interface JwtPayload {
    userId: string;
    iat?: number;
    exp?: number;
}

/**
 * Generate a JWT token for a user
 * @param userId - User ID to encode in the token
 * @returns Signed JWT token
 */
export const generateToken = (userId: string): string => {
    return jwt.sign(
        { userId },
        env.jwtSecret,
        { expiresIn: env.jwtExpire } as jwt.SignOptions
    );
};

/**
 * Verify and decode a JWT token
 * @param token - JWT token to verify
 * @returns Decoded token payload
 * @throws AuthenticationError if token is invalid or expired
 */
export const verifyToken = (token: string): JwtPayload => {
    try {
        const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;
        return decoded;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new AuthenticationError('Token has expired');
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new AuthenticationError('Invalid token');
        }
        throw new AuthenticationError('Token verification failed');
    }
};
