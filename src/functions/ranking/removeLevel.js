const UserSc = require('../../Schema/user.js')
var path = require("path");

module.exports = async function (user, guild) {

    await UserSc.findOne({ UserID: user, GuildID: guild }, async function (err, docs) {
        
        var Level = docs.Level;
        Level = Level - 1;
        if(Level < 1) Level = 1;
        await UserSc.updateOne({ UserID: user }, { $set: { Level: Level } });

    });

}