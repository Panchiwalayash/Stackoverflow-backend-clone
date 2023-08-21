const Question = require("../models/question")

exports.getAll = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(400).json("Some Error Occured");
    }
};

exports.createQuestion = async (req, res) => {
    try {

        const data = req.body
        const question = new Question(data)
        question.user = req.user.id
        await question.save()
        res.status(200).json('Question Created')

    } catch (error) {
        res.status(400).json("Some Error Occured");
    }
}


exports.updateQuestion = async (req, res) => {
    try {

        const { title, desc } = req.body;
        // create a new question object
        const newQuestion = {};
        if (title) {
            newQuestion.title = title;
        }
        if (desc) {
            newQuestion.desc = desc;
        }

        let question = await Question.findById(req.params.id)
        if (!question) {
            return res.status(404).send("Question not found");
        }

        // allow deletion if the user owns the note
        if (question.user.toString() !== req.user.id) {
            return res.status(401).send("not allowed");
        }

        question = await Question.findByIdAndUpdate(req.params.id,
            { $set: newQuestion },
            { new: true }
        )

        res.status(200).send({ question });

    } catch (error) {
        res.status(400).json("Some Error Occured");
    }
}

exports.deleteQuestion = async (req, res) => {

    try {

        let question = await Question.findById(req.params.id)
        if (!question) {
            return res.status(404).send("Question not found");
        }

        // allow deletion if the user owns the note
        if (question.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed to delete");
        }

        question = await Question.findByIdAndDelete(req.params.id);
        res.status(200).json("question deleted");
    } catch (error) {
        res.status(400).json("Some Error Occured");
    }
}

exports.VoteQuestion = async (req, res) => {

    try {

        let question = await Question.findById(req.params.id)
        if (!question) {
            return res.status(404).send("Question not found");
        }

        // checking that user had already voted these question
        const incVote = question.upVote.findIndex((id) => id === String(req.user.id));
        const decVote = question.downVote.findIndex((id) => id === String(req.user.id));

        if (req.body.value === "upVote") {
            if (decVote !== -1) {
                question.downVote = question.downVote.filter(
                    (id) => id !== String(userId)
                );
            }

            if (incVote === -1) {
                question.upVote.push(req.user.id);
            } else {
                question.upVote = question.upVote.filter((id) => id !== String(req.user.id));
            }

        } else if (req.body.value === "downVote") {
            if (incVote !== -1) {
                question.upVote = question.upVote.filter((id) => id !== String(req.user.id));
            }
            if (decVote === -1) {
                question.downVote.push(req.user.id);
            } else {
                question.downVote = question.downVote.filter((id) => id !== String(req.user.id));
            }
        }
        await Question.findByIdAndUpdate(req.params.id, question);
        res.status(200).json({ message: "Voted successfully" });
    } catch (error) {
        res.status(400).json("Some Error Occured");
    }
}


