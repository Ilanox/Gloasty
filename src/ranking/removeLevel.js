const userSc = require('../schema/user.js')
var path = require("path");

module.exports = async function (user, guild) {

    await userSc.findOne({ UserID: user, GuildID: guild }, async function (err, docs) {
        
        var Level = docs.Level;
        Level = Level - 1;
        if(Level < 1) Level = 1;
        await userSc.updateOne({ UserID: user }, { $set: { Level: Level } });

    });

}