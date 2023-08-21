const mongoose = require("mongoose"); ``

const mongoURI = "mongodb+srv://yashpanchiwala8780:yash123@cluster0.nbqkbhk.mongodb.net/";
const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then((conn) => {
            console.log(`mongoose connected `);
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = connectToMongo;
