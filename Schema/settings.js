const mongoose = require("mongoose");
let Settings = new mongoose.Schema({
    GuildID: String,
    OwnerID: String,
    LogsChannel: String,
    xpRateMin: Number,
    xpRateMax: Number,
    WelcomeChannel: String,
    WelcomeImage: String
});
module.exports = mongoose.model("settings", Settings);