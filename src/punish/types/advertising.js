const userSc = require('../../schema/user.js')
const getUserData = require('../../user/getUserData')
const createUser = require('../../user/createUser')
const getDefaultData = require('../../user/getDefaultData')
const Punisher = require('../loader')

/**
 * @name advertising
 * @description Punish a user for advertising
 * @param {userID} user
 * @param {guildID} guild
 */

module.exports = async function advertising(user, guild) {

    var data = await getUserData(user, guild)

    if (!data || data == null || data == undefined) {
        await createUser(user, guild)
        data = getDefaultData(user, guild)
    }

    var PunishMap = data.Punishes

    var PunishNum = parseInt(PunishMap.get("advertising"))

    if (!PunishNum) PunishNum = 0

    if (PunishNum == 0) {
        PunishMap.set("advertising", "1")
        Punisher.warn(user, "advertising", guild)
        Punisher.timeout(user, 24 * 60 * 60 * 1000, "advertising", guild)
    } else if (PunishNum == 1) {
        PunishMap.set("advertising", "2")
        Punisher.timeout(user, 7 * 24 * 60 * 60 * 1000, "advertising", guild)
    } else if (PunishNum == 2) {
        PunishMap.set("advertising", "3")
        Punisher.ban(user, 7 * 24 * 60 * 60 * 1000, "advertising", guild)
    } else if (PunishNum == 3) {
        PunishMap.set("advertising", "4")
        Punisher.ban(user, 31 * 24 * 60 * 60 * 1000, "advertising", guild)
    } else if (PunishNum >= 4) {
        PunishMap.set("advertising", "5")
        Punisher.ban(user, "infinity", "advertising", guild)
    } 

    await userSc.updateOne(
        { UserID: user, GuildID: guild},
        { $set: { Punishes: PunishMap } }
    )

    return {
        rule: "advertising",
        level: PunishNum + 1
    }
}