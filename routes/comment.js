const express = require("express")
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')

const { getComment, createComment } = require('../controllers/comment')

router.get('/', fetchuser, getComment)
router.post('/create/:id', fetchuser, createComment)

module.exports = router