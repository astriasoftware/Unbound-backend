import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface EnvConfig {
    port: number;
    nodeEnv: string;
    mongodbUri: string;
    jwtSecret: string;
    jwtExpire: string | number;
}

const getEnvVariable = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;
    if (!value) {
        throw new Error(`Environment variable ${key} is required but not defined`);
    }
    return value;
};

export const env: EnvConfig = {
    port: parseInt(getEnvVariable('PORT', '5000'), 10),
    nodeEnv: getEnvVariable('NODE_ENV', 'development'),
    mongodbUri: getEnvVariable('MONGODB_URI'),
    jwtSecret: getEnvVariable('JWT_SECRET'),
    jwtExpire: getEnvVariable('JWT_EXPIRE', '7d'),
};

// Validate configuration on startup
export const validateEnv = (): void => {
    const requiredVars = ['MONGODB_URI', 'JWT_SECRET'];
    const missing = requiredVars.filter((varName) => !process.env[varName]);

    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missing.join(', ')}\n` +
            'Please copy .env.example to .env and fill in the required values.'
        );
    }

    console.log('✓ Environment configuration validated');
};
