const mongoose = require("mongoose");
let user = new mongoose.Schema({
    GuildID: String,
    UserID: String,
    Warns: {type: Map, of: String},
    Punishes: {type: Map, of: String},
    Stars: Number,
    Level: Number,
    TotalStars: Number,
    StoreStars: Number,
    Messages: Number,
    Minutes: Number
});
module.exports = mongoose.model("user", user);