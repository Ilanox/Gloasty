const userSc = require('../schema/user.js')
var path = require("path");

module.exports = async function (user, guild) {

    let data;
    await userSc.findOne({ UserID: user, GuildID: guild }, function (err, docs) {
        if (!docs || docs == null || docs == undefined) data = 0;

        var Stars = docs.Stars;
        data = Stars;

    });
    return data;

}