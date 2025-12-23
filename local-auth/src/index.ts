import express, { Request, Response, NextFunction, Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env, validateEnv } from './config/env';
import { connectDatabase } from './config/db';
import authRoutes from './routes/auth.routes';
import { AppError } from './utils/errors';

// Validate environment variables
validateEnv();

// Create Express application
const app: Application = express();

// Security middleware
app.use(helmet()); // Set security headers
app.use(cors()); // Enable CORS

// Body parser middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request logging in development
if (env.nodeEnv === 'development') {
    app.use((req: Request, _res: Response, next: NextFunction) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });
}

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});

// API Routes
app.use('/api/auth', authRoutes);

// 404 handler - must be after all routes
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.path} not found`,
    });
});

// Global error handler - must be last
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    // Handle operational errors (errors we throw)
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    // Handle Mongoose duplicate key errors
    if (err.name === 'MongoServerError' && (err as any).code === 11000) {
        const field = Object.keys((err as any).keyPattern)[0];
        return res.status(409).json({
            success: false,
            message: `${field} already exists`,
        });
    }

    // Log unexpected errors
    console.error('Unexpected Error:', err);

    // Send generic error response for unexpected errors
    return res.status(500).json({
        success: false,
        message:
            env.nodeEnv === 'development'
                ? err.message
                : 'An unexpected error occurred',
    });
});

// Start server
const startServer = async (): Promise<void> => {
    try {
        // Connect to database
        await connectDatabase();

        // Start listening
        app.listen(env.port, () => {
            console.log(`
╔════════════════════════════════════════════════╗
   Local Auth Service                           
   Server running on port ${env.port}              
   Environment: ${env.nodeEnv}                    
   http://localhost:${env.port}                 
╚════════════════════════════════════════════════╝
      `);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Start the server
startServer();

export default app;
