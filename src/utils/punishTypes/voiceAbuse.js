const Discord = require("discord.js");
const Gloasty = require("../../../gloasty.js")
const UserSc = require('../../Schema/user.js')
const GuildSc = require('../../Schema/settings.js')
const { Permissions, MessageEmbed } = require("discord.js")

const getUserData = require('../user/getUserData')
const createUser = require('../user/createUser')
const getDefaultData = require('../user/getDefaultData')
const Punisher = require('../punish/loader')

module.exports = async function voiceAbuse(user, guild) {

    var data = await getUserData(user, guild)

    if (!data || data == null || data == undefined) {
        await createUser(user, guild)
        data = getDefaultData(user, guild)
    }

    var PunishMap = data.Punishes

    var PunishNum = parseInt(PunishMap.get("voice"))

    if (!PunishNum) PunishNum = 0

    if (PunishNum == 0) {
        PunishMap.set("voice", "1")
        Punisher.warn(user, "voice", guild)
        Punisher.timeout(user, 10 * 60 * 1000, "voice", guild)
    } else if (PunishNum == 1) {
        PunishMap.set("voice", "2")
        Punisher.timeout(user, 2 * 60 * 60 * 1000, "voice", guild)
    } else if (PunishNum == 2) {
        PunishMap.set("voice", "3")
        Punisher.timeout(user, 14 * 24 * 60 * 60 * 1000, "voice", guild)
    } else if (PunishNum == 3) {
        PunishMap.set("voice", "4")
        Punisher.ban(user, 31 * 24 * 60 * 60 * 1000, "voice", guild)
    } else if (PunishNum >= 4) {
        PunishMap.set("voice", "5")
        Punisher.ban(user, "infinity", "voice", guild)
    }

    await UserSc.updateOne({
        UserID: user,
        GuildID: guild
    }, {
        $set: {
            Punishes: PunishMap
        }
    })

    return {
        rule: "voice",
        level: PunishNum + 1
    }
}