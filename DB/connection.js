const mongoose = require("mongoose");

db().then(() => {
    console.log("DBConnected")
}).catch(err => console.log(err))

async function db() {
    await mongoose.connect(process.env.MONGO_URI);
}