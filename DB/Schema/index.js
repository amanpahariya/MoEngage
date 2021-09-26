const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    "firstname": {type: String, required: true},
    "lastname": {type: String, required: true},
    "email": {type: String, required: true, unique: true},
    "password": {type: String, required: true, minlength: 8}
});

const ReviewSchema = new mongoose.Schema({
    "anime_id": {type: Number, required: true, unique: true},
    ratings: [{
        "user_id": {type: String, required: true},
        "rating": {type: Number, required: true}
    }]
})


const User = mongoose.model("User", UserSchema);
const Rating = mongoose.model("Rating", ReviewSchema);

module.exports = {User, Rating};