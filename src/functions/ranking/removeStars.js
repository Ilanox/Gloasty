const UserSc = require('../../Schema/user.js')
var path = require("path");

module.exports = async function (user, guild, stars) {

    await UserSc.findOne({ UserID: user, GuildID: guild }, async function (err, docs) {
        
        var Stars = docs.Stars;

        Stars = Stars - stars;

        TotalStars = docs.TotalStars;

        TotalStars = TotalStars - stars;

        StoreStars = docs.StoreStars;

        StoreStars = StoreStars - stars;

        if (Stars < 0) Stars = 0;

        if (TotalStars < 0) TotalStars = 0;

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