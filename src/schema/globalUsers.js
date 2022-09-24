const mongoose = require("mongoose");
let globalUsers = new mongoose.Schema({
    UserID: String,
    Inventory: {type: Map, of: String},
    Quests: {type: Map, of: String},
    Verified: Boolean,
    name: String,
    DailyMessages: Number,
    DailyMinutes: Number,
    WeeklyMessages: Number,
    WeeklyMinutes: Number,
    DailyMessagesUsers: Array,
    DailyMinutesUsers: Array,
    WeeklyMessagesUsers: Array,
    WeeklyMinutesUsers: Array
});
module.exports = mongoose.model("globalUsers", globalUsers);