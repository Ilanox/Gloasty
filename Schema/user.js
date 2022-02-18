const mongoose = require("mongoose");
let user = new mongoose.Schema({
    GuildID: String,
    UserID: String,
    Warns: {type: Map, of: String},
    Punishes: {type: Map, of: String},
    Xp: Number,
    Level: Number
});
module.exports = mongoose.model("user", user);