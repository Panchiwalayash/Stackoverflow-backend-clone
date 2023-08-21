const express = require('express')
const connectToMongo = require('./db')

connectToMongo()

const app = express()
const port = 5000;

app.use(express.json())

const authRoutes = require("./routes/auth")
const questionRoutes = require("./routes/question")
const commentRoutes = require("./routes/comment")

app.use("/api/auth", authRoutes)
app.use("/api/question", questionRoutes)
app.use("/api/comment", commentRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})