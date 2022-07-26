const userSc = require('../../schema/user.js')
const getUserData = require('../../user/getUserData')
const createUser = require('../../user/createUser')
const getDefaultData = require('../../user/getDefaultData')
const Punisher = require('../loader')

/**
 * @name bugAbuse
 * @description Punish a user for abusing a bug
 * @param {userID} user
 * @param {guildID} guild
 */

module.exports = async function bugAbuse(user, guild) {

    var data = await getUserData(user, guild)

    if (!data || data == null || data == undefined) {
        await createUser(user, guild)
        data = getDefaultData(user, guild)
    }

    var PunishMap = data.Punishes

    var PunishNum = parseInt(PunishMap.get("bug"))

    if (!PunishNum) PunishNum = 0

    if (PunishNum == 0) {
        PunishMap.set("bug", "1")
        Punisher.warn(user, "bug", guild)
        Punisher.timeout(user, 24 * 60 * 60 * 1000, "bug", guild)
    } else if (PunishNum == 1) {
        PunishMap.set("bug", "2")
        Punisher.timeout(user, 7 * 24 * 60 * 60 * 1000, "bug", guild)
    } else if (PunishNum == 2) {
        PunishMap.set("bug", "3")
        Punisher.ban(user, 7 * 24 * 60 * 60 * 1000, "bug", guild)
    } else if (PunishNum == 3) {
        PunishMap.set("bug", "4")
        Punisher.ban(user, 31 * 24 * 60 * 60 * 1000, "bug", guild)
    } else if (PunishNum == 4) {
        PunishMap.set("bug", "5")
        Punisher.ban(user, "infinity", "bug", guild)
    } 

    await userSc.updateOne(
        { UserID: user, GuildID: guild},
        { $set: { Punishes: PunishMap } }
    )

    return {
        rule: "bug",
        level: PunishNum + 1
    }
}