const Discord = require("discord.js");
const Gloasty = require("../../../../gloasty.js")
const UserSc = require('../../../Schema/user.js')
const GuildSc = require('../../../Schema/settings.js')
const { Permissions, MessageEmbed } = require("discord.js")

const getUserData = require('../../user/getUserData')
const createUser = require('../../user/createUser')
const getDefaultData = require('../../user/getDefaultData')
const Punisher = require('../loader')

module.exports = async function disrespect(user, guild) {

    var data = await getUserData(user, guild)

    if (!data || data == null || data == undefined) {
        await createUser(user, guild)
        data = getDefaultData(user, guild)
    }

    var PunishMap = data.Punishes

    var PunishNum = parseInt(PunishMap.get("disrespect"))

    if (!PunishNum) PunishNum = 0

    if (PunishNum == 0) {
        PunishMap.set("disrespect", "1")
        Punisher.warn(user, "disrespect", guild)
        Punisher.timeout(user, 24 * 60 * 60 * 1000, "disrespect", guild)
    } else if (PunishNum == 1) {
        PunishMap.set("disrespect", "2")
        Punisher.timeout(user, 7 * 24 * 60 * 60 * 1000, "disrespect", guild)
    } else if (PunishNum == 2) {
        PunishMap.set("disrespect", "3")
        Punisher.ban(user, 7 * 24 * 60 * 60 * 1000, "disrespect", guild)
    } else if (PunishNum == 3) {
        PunishMap.set("disrespect", "4")
        Punisher.ban(user, 31 * 24 * 60 * 60 * 1000, "disrespect", guild)
    } else if (PunishNum >= 4) {
        PunishMap.set("disrespect", "5")
        Punisher.ban(user, "infinity", "disrespect", guild)
    } 

    await UserSc.updateOne(
        { UserID: user, GuildID: guild},
        { $set: { Punishes: PunishMap } }
    )

    return {
        rule: "disrespect",
        level: PunishNum + 1
    }
}