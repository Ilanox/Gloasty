const mongoose = require("mongoose");
let guilds = new mongoose.Schema({
    GuildID: String,
    OwnerID: String,
    LogsChannel: String,
    xpRateMin: Number,
    xpRateMax: Number,
    WelcomeChannel: String,
    WelcomeImage: String,
    PunishChannel: String
});
module.exports = mongoose.model("guilds", guilds);