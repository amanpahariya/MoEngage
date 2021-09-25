// jshint esversion: 8
const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.MONGO_URI,
    {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true},
    (err) => {
        if (!err) console.log("DBconnected");
        else console.log(err);
    }
);

module.exports = connection;