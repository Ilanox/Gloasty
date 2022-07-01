const UserSc = require('../../Schema/user.js')
var path = require("path");

/**
 * @name checkIfUserExists
 * @description Check if the user exist in Gloasty Database
 * @param {userID} user
 * @param {guildID} guild
 */

module.exports = async function (user, guild) {

    let bool;

    await UserSc.findOne({ UserID: user, GuildID: guild }, function (err, docs) {

        if (!docs || docs == null || docs == undefined) bool = false;

        bool = true;
    });

    return bool;

}