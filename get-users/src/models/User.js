const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            trim: true,
            minlength: [3, 'Username must be at least 3 characters long'],
            maxlength: [30, 'Username cannot exceed 30 characters'],
            match: [
                /^[a-zA-Z0-9_]+$/,
                'Username can only contain letters, numbers, and underscores',
            ],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email address',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters long'],
            select: false, 
        },
    },
    {
        timestamps: true,
    }
);

// Create indexes for better query performance
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });


// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
