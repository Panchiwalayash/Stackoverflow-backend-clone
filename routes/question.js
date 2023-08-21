const express = require("express")
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')

const { createQuestion, getAll, updateQuestion, deleteQuestion, VoteQuestion } = require("../controllers/question")

router.post('/create', fetchuser, createQuestion)
router.get('/', fetchuser, getAll)
router.put('/update/:id', fetchuser, updateQuestion)
router.delete('/delete/:id', fetchuser, deleteQuestion)
router.patch('/vote/:id', fetchuser, VoteQuestion)

module.exports = router