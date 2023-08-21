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
        const { question, content } = req.body;

        if (!user || !question || !content) {
            return res.status(400).json("user id, question id, content are required");
        }

        const comment = {
            "user": req.user.id,
            "question": question,
            "content": content
        }

        const Que = await Question.findById(question)
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