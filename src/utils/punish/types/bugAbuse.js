const Discord = require("discord.js");
const Gloasty = require("../../../../gloasty.js")
const UserSc = require('../../../Schema/user.js')
const GuildSc = require('../../../Schema/settings.js')
const { Permissions, MessageEmbed } = require("discord.js")

const getUserData = require('../../user/getUserData')
const createUser = require('../../user/createUser')
const getDefaultData = require('../../user/getDefaultData')
const Punisher = require('../loader')

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

    await UserSc.updateOne(
        { UserID: user, GuildID: guild},
        { $set: { Punishes: PunishMap } }
    )

    return {
        rule: "bug",
        level: PunishNum + 1
    }
}