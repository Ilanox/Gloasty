const UserSc = require('../../Schema/user.js')
var path = require("path");

module.exports = async function(user, guild) {

    let data;
    var docs = await UserSc.findOne({ UserID: user, GuildID: guild })

    if (!docs || docs == null || docs == undefined) docs = await UserSc.findOne({ UserID: user, GuildID: guild })
    if (!docs || docs == null || docs == undefined) docs = await UserSc.findOne({ UserID: user, GuildID: guild })
    if (!docs || docs == null || docs == undefined) docs = await UserSc.findOne({ UserID: user, GuildID: guild })
    if (!docs || docs == null || docs == undefined) docs = await UserSc.findOne({ UserID: user, GuildID: guild })
    if (!docs || docs == null || docs == undefined) data = null

    data = docs;

    return data;

}