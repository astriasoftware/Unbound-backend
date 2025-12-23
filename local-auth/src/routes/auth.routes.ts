import { Router } from 'express';
import {
    register,
    login,
    getCurrentUser,
} from '../controllers/auth.controller';
import {
    registerValidation,
    loginValidation,
    handleValidationErrors,
} from '../middleware/validation';
import { authenticate } from '../middleware/auth';

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
    '/register',
    registerValidation,
    handleValidationErrors,
    register
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post(
    '/login',
    loginValidation,
    handleValidationErrors,
    login
);

/**
 * @route   GET /api/auth/me
 * @desc    Get current authenticated user
 * @access  Private (requires authentication)
 */
router.get('/me', authenticate, getCurrentUser);

export default router;
