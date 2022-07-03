const userSc = require('../schema/user.js')
const getUserData = require('../user/getUserData')
const createUser = require('../user/createUser')
const getDefaultData = require('../user/getDefaultData')
var path = require("path");

module.exports = async function (user, guild, numberOfStars) {

    var userData = await getUserData(user, guild);

    if (!userData || userData == null || userData == undefined) {
        await createUser(user, guild)
        userData = getDefaultData(user, guild)
        return;
    }
        
    var Stars = userData.Stars;

    Stars = Stars - numberOfStars;

    var TotalStars = userData.TotalStars;

    TotalStars = TotalStars - numberOfStars;

    var StoreStars = userData.StoreStars;

    StoreStars = StoreStars - numberOfStars;

    if (Stars < 0) Stars = 0;

    if (TotalStars < 0) TotalStars = 0;

    if (StoreStars < 0) StoreStars = 0;

    await userSc.updateOne(
        { UserID: user},
        { $set: { Stars: Stars } }
    )

    await userSc.updateOne(
        { UserID: user},
        { $set: { TotalStars: TotalStars } }
    )

    await userSc.updateOne(
        { UserID: user},
        { $set: { StoreStars: StoreStars } }
    )

}