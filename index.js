const express = require('express')
const connectToMongo = require('./db')

connectToMongo()

const app = express()
const port = 5000;

app.use(express.json())

const authRoutes = require("./routes/auth")
const questionRoutes = require("./routes/question")

app.use("/api/auth", authRoutes)
app.use("/api/question", questionRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})