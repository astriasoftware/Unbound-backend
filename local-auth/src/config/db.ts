import mongoose from 'mongoose';
import { env } from './env';

export const connectDatabase = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(env.mongodbUri);

        console.log(`✓ MongoDB Connected: ${conn.connection.host}`);

        // Connection event listeners
        mongoose.connection.on('connected', () => {
            console.log('✓ Mongoose connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('✗ Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('✗ Mongoose disconnected from MongoDB');
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('✓ Mongoose connection closed due to application termination');
            process.exit(0);
        });
    } catch (error) {
        console.error('✗ Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
