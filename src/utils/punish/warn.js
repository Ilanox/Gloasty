const UserSc = require('../../Schema/user.js')
const main = require('../../../index')
const userLoader = require('../user/loader')

/**
 * @name advertising
 * @description Warn user for particular reason
 * @param {userID} user
 * @param {string} reason
 * @param {guildID} guild
 */

module.exports = async function warn(user, reason, guild) {

    var Guild = await main.client.guilds.cache.get(guild)

    var member = await Guild.members.cache.get(user)

    var data = userLoader.getUserData(user, guild)

    if (!data || data == null || data == undefined) {
        userLoader.createUser(user, guild)
        data = userLoader.getDefaultData(user, guild)
    }

    var WarnsMap = data.Warns
    
    if (!WarnsMap.get(reason)) {
        WarnsMap.set(reason, 1)
    } else {
        var reasonNum = parseInt(WarnsMap.get(reason)) + 1 
        WarnsMap.set(reason, reasonNum.toString())
    }

    await UserSc.updateOne(
        { UserID: user},
        { $set: { Warns: WarnsMap } }
    )

    member.user.send(`You were warned on the server "**${Guild.name}**".\nReason: ${reason}`)

}