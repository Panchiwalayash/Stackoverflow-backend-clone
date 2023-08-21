const express = require("express")
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')

const { getComment, createComment } = require('../controllers/comment')

router.get('/', fetchuser, getComment)
router.get('/create/:id', fetchuser, createComment)

module.exports = router