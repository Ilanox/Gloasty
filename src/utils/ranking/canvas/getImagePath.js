const UserSc = require('../../../Schema/user.js')
const getLevel = require('../getLevel')
var path = require("path");

module.exports = async function (user, guild) {

    let data;
    let starsNumber;
    await UserSc.findOne({ UserID: user, GuildID: guild }, function (err, docs) {

        if (!docs || docs == null || docs == undefined) {
            createUser(user, guild);
            data = { GuildID: guild, UserID: user, Stars: 0, Level: 1, Warns: new Map(), Punishes: new Map(), TotalStars: 0 };
        }

        else data = docs;
        
    });

    var level = await getLevel(user, guild);

    if(level % 5 == 0) starsNumber = 12;
    else starsNumber = 6;

    return path.resolve("./src/Images/RankCard" + starsNumber + "/Rank-" + data.Stars + ".png");

}