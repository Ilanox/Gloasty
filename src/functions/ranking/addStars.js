const UserSc = require('../../Schema/user.js')
var path = require("path");

module.exports = async function (user, guild, Number) {

    await UserSc.findOne({ UserID: user, GuildID: guild }, async function (err, docs) {
        
        var Stars = docs.Stars;

        Stars = Stars + Number;

        TotalStars = docs.TotalStars;

        TotalStars = TotalStars + Number;

        StoreStars = docs.StoreStars;

        StoreStars = StoreStars + Number;

        await UserSc.updateOne(
            { UserID: user},
            { $set: { Stars: Stars } }
        )

        await UserSc.updateOne(
            { UserID: user},
            { $set: { TotalStars: TotalStars } }
        )

        await UserSc.updateOne(
            { UserID: user},
            { $set: { StoreStars: StoreStars } }
        )

    });

}