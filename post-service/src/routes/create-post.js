const express = require("express");
const Post = require("../models/post.model");
const router = express.Router();

router.post("/api/createpost", async (req, res) => {
    try {
        const { postTitle, postDesc, image, author, interactions } = req.body;

        // Basic validation
        if (!postTitle || !postDesc) {
            return res.status(400).json({
                error: "Missing required fields: postTitle or postDesc"
            });
        }

        if (!author) {
            return res.status(400).json({
                error: "Author is required"
            });
        }

        // Create new post document
        const newPost = await Post.create({
            postTitle,
            postDesc,
            image: image || "",
            author,
            interactions: interactions || { likes: [], comments: [] }
        });

        return res.status(201).json({
            message: "Post created successfully",
            post: newPost
        });

    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
});

module.exports = router;
