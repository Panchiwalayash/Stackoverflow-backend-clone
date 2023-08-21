const express = require('express')
const connectToMongo = require('./db')

connectToMongo()

const app = express()
const port = 5000;

app.use(express.json())

const authRoutes = require("./routes/auth")

app.use("/api/auth", authRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})