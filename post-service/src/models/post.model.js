const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        postTitle: {
            type: String,
            required: [true, 'Post title is required'],
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters']
        },
        postDesc: {
            type: String,
            required: [true, 'Post description is required'],
        },
        image: {
            type: String, // URL to the image (e.g., Cloudinary or S3)
            default: ""
        },
        // Reference to the User who created the post
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        interactions: {
            // Array of User IDs who liked the post
            likes: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                }
            ],
            // Array of comment objects
            comments: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User',
                        required: true
                    },
                    text: {
                        type: String,
                        required: true
                    },
                    createdAt: {
                        type: Date,
                        default: Date.now
                    }
                }
            ]
        }
    },
    {
        timestamps: true,
    }
);

// Virtual for Like Count (optional, saves you from sending the whole array)
postSchema.virtual('likeCount').get(function () {
    return this.interactions.likes.length;
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;