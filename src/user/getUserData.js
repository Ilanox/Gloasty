const userSc = require('../schema/user.js')

module.exports = async function(user, guild) {

    let data;
    var docs = await userSc.findOne({ UserID: user, GuildID: guild })

    if (!docs || docs == null || docs == undefined) docs = await userSc.findOne({ UserID: user, GuildID: guild })
    if (!docs || docs == null || docs == undefined) docs = await userSc.findOne({ UserID: user, GuildID: guild })
    if (!docs || docs == null || docs == undefined) docs = await userSc.findOne({ UserID: user, GuildID: guild })
    if (!docs || docs == null || docs == undefined) docs = await userSc.findOne({ UserID: user, GuildID: guild })
    if (!docs || docs == null || docs == undefined) data = null

    data = docs;

    return data;

}