const Question = require("../models/question")

exports.getAll = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(409).json("Some Error Occured");
    }
};

exports.createQuestion = async (req, res) => {
    try {

        const data = req.body
        const question = new Question(data)
        console.log("first")
        question.user = req.user.id
        await question.save()
        res.status(200).json('Question Created')

    } catch (error) {
        res.status(409).json("Some Error Occured");
    }
}

