import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { generateToken } from '../utils/jwt';
import {
    ConflictError,
    AuthenticationError,
    NotFoundError,
} from '../utils/errors';

/**
 * Register a new user
 * POST /api/auth/register
 */
export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists with this username
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            throw new ConflictError('Username is already taken');
        }

        // Check if user already exists with this email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            throw new ConflictError('Email is already registered');
        }

        // Create new user (password will be hashed automatically by pre-save hook)
        const user = await User.create({
            username,
            email,
            password,
        });

        // Generate JWT token
        const token = generateToken(user._id.toString());

        // Return user data (exclude password) and token
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { username, password } = req.body;

        // Find user by username or email (select password for comparison)
        // Username field can contain either username or email
        const user = await User.findOne({
            $or: [{ username }, { email: username }],
        }).select('+password');

        if (!user) {
            throw new AuthenticationError('Invalid username or password');
        }

        // Compare password
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            throw new AuthenticationError('Invalid username or password');
        }

        // Generate JWT token
        const token = generateToken(user._id.toString());

        // Return user data (exclude password) and token
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get current authenticated user
 * GET /api/auth/me
 */
export const getCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // userId is attached to request by authenticate middleware
        const user = await User.findById(req.userId);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};
