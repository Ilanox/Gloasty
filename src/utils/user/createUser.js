const UserSc = require('../../Schema/user.js')
var path = require("path");

module.exports = async function (user, guild) {

    await UserSc.create({
        GuildID: guild,
        UserID: user,
        Stars: 0,
        Level: 1,
        Warns: new Map(),
        Punishes: new Map(),
        TotalStars: 0,
        StoreStars: 0
    });

}