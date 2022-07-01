const Discord = require("discord.js");
const Gloasty = require("../../../../gloasty.js")
const UserSc = require('../../../Schema/user.js')
const GuildSc = require('../../../Schema/settings.js')
const { Permissions, MessageEmbed } = require("discord.js")

const getUserData = require('../../user/getUserData')
const createUser = require('../../user/createUser')
const getDefaultData = require('../../user/getDefaultData')
const Punisher = require('../loader')

/**
 * @name nsfw
 * @description Punish a user for sending an NSFW
 * @param {userID} user
 * @param {guildID} guild
 */

module.exports = async function nsfw(user, guild) {

    var data = await getUserData(user, guild)

    if (!data || data == null || data == undefined) {
        await createUser(user, guild)
        data = getDefaultData(user, guild)
    }

    var PunishMap = data.Punishes

    var PunishNum = parseInt(PunishMap.get("nsfw"))

    if (!PunishNum) PunishNum = 0


    if (PunishNum == 0) {
        PunishMap.set("nsfw", "1")
        Punisher.warn(user, "nsfw", guild)
    } else if (PunishNum == 1) {
        PunishMap.set("nsfw", "2")
        Punisher.timeout(user, 60 * 60 * 1000, "nsfw", guild)
    } else if (PunishNum == 2) {
        PunishMap.set("nsfw", "3")
        Punisher.timeout(user, 1 * 24 * 60 * 60 * 1000, "nsfw", guild)
    } else if (PunishNum == 3) {
        PunishMap.set("nsfw", "4")
        Punisher.timeout(user, 7 * 24 * 60 * 60 * 1000, "nsfw", guild)
    } else if (PunishNum == 4) {
        PunishMap.set("nsfw", "5")
        Punisher.timeout(user, 14 * 24 * 60 * 60 * 1000, "nsfw", guild)
    } else if (PunishNum >= 5) {
        PunishMap.set("nsfw", "6")
        Punisher.ban(user, "infinity", "nsfw", guild)
    }

    await UserSc.updateOne(
        { UserID: user, GuildID: guild},
        { $set: { Punishes: PunishMap } }
    )

    return {
        rule: "nsfw",
        level: PunishNum + 1
    }
}