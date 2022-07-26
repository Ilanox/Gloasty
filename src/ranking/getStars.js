const getUserData = require('../user/getUserData')
const createUser = require('../user/createUser')
const getDefaultData = require('../user/getDefaultData')

module.exports = async function (user, guild) {

    var userData = await getUserData(user, guild);

    if (!userData || userData == null || userData == undefined) {
        await createUser(user, guild)
        userData = getDefaultData(user, guild)
        return;
    }

    return userData.Stars

}