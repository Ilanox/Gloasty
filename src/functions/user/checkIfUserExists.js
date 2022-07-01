const UserSc = require('../../Schema/user.js')
var path = require("path");

module.exports = async function (user, guild) {

    let bool;

    await UserSc.findOne({ UserID: user, GuildID: guild }, function (err, docs) {

        if (!docs || docs == null || docs == undefined) bool = false;

        bool = true;
    });

    return bool;

}