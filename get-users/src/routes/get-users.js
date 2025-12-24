const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all users from database
router.get("/api/users", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching users",
            error: error.message
        });
    }
});

router.get("/api/users/:limit", async (req, res) => {
    try {
        const limit = parseInt(req.params.limit, 10);

        if (isNaN(limit) || limit <= 0) {
            return res.status(400).json({
                success: false,
                message: "Limit must be a positive number"
            });
        }

        const users = await User.find()
            .select("-password")
            .limit(limit);

        if (users.length < limit) {
            return res.status(404).json({
                success: false,
                message: `Only ${users.length} users found, but ${limit} requested`
            });
        }

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching users",
            error: error.message
        });
    }
});


// Get user by username

router.get("/api/users/username/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User with username '${req.params.username}' not found`
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching user by username",
            error: error.message
        });
    }
});

// Get user by email
router.get("/api/users/email/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User with email '${req.params.email}' not found`
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching user by email",
            error: error.message
        });
    }
});

module.exports = router;
