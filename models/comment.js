
const mongoose = require("mongoose")


const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    content: {
        type: String,
        required: true
    }
});


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;