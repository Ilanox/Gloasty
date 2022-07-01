const Discord = require("discord.js");
const Gloasty = require("../../../gloasty.js")
const UserSc = require('../../Schema/user.js')
const GuildSc = require('../../Schema/settings.js')
const { Permissions, MessageEmbed } = require("discord.js")

const getUserData = require('../user/getUserData')
const createUser = require('../user/createUser')
const getDefaultData = require('../user/getDefaultData')
const Punisher = require('../punish/loader')

module.exports = async function insult(user, guild) {

    
    var data = await getUserData(user, guild)

    if (!data || data == null || data == undefined) {
        await createUser(user, guild)
        data = await getDefaultData(user, guild)
    }

    var PunishMap = data.Punishes

    var PunishNum = parseInt(PunishMap.get("insult"))

    if (!PunishNum) PunishNum = 0

    if (PunishNum == 0) {
        PunishMap.set("insult", "1")
        Punisher.warn(user, "insult", guild)
    } else if (PunishNum == 1) {
        PunishMap.set("insult", "2")
        Punisher.timeout(user, 60 * 60 * 1000, "insult", guild)
    } else if (PunishNum == 2) {
        PunishMap.set("insult", "3")
        Punisher.timeout(user, 1 * 24 * 60 * 60 * 1000, "insult", guild)
    } else if (PunishNum == 3) {
        PunishMap.set("insult", "4")
        Punisher.timeout(user, 7 * 24 * 60 * 60 * 1000, "insult", guild)
    } else if (PunishNum == 4) {
        PunishMap.set("insult", "5")
        Punisher.timeout(user, 14 * 24 * 60 * 60 * 1000, "insult", guild)
    } else if (PunishNum >= 5) {
        PunishMap.set("insult", "6")
        Punisher.ban(user, "infinity", "insult", guild)
    }

    await UserSc.updateOne(
        { UserID: user, GuildID: guild},
        { $set: { Punishes: PunishMap } }
    )

    return {
        rule: "insult",
        level: PunishNum + 1
    }
}