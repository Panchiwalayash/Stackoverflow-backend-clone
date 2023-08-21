const Comment = require("../models/comment")
const Question = require("../models/question")

exports.getComment = async (req, res) => {
    try {
        const comments = await Comment.find()
        res.status(200).send({ comments })
    } catch (error) {
        res.status(400).json("Some Error Occured");
    }
}

exports.createComment = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json("content are required");
        }

        const comment = {
            "user": req.user.id,
            "question": req.params.id,
            "content": content
        }

        const Que = await Question.findById(req.params.id)
        if (!Que) {
            res.status(404).send("Question not founded")
        }

        Comment.create(comment)
            .then(async (data) => {
                Que.comments.push(data._id)
            })
        await Que.save()

        res.status(200).send("Commented Successfully")

    } catch (error) {
        res.status(400).json("Some Error Occured");
    }
}