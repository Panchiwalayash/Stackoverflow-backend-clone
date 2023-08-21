const express = require("express")
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')

const { createQuestion, getAll } = require("../controllers/question")

router.post('/create', fetchuser, createQuestion)
router.get('/', fetchuser, getAll)

module.exports = router