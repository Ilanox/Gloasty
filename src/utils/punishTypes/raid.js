const Discord = require("discord.js");
const Gloasty = require("../../../gloasty.js")
const UserSc = require('../../Schema/user.js')
const GuildSc = require('../../Schema/settings.js')
const { Permissions, MessageEmbed } = require("discord.js")

const getUserData = require('../user/getUserData')
const createUser = require('../user/createUser')
const getDefaultData = require('../user/getDefaultData')
const Punisher = require('../punish/loader')

module.exports = async function raid(user, guild) {

    var data = await getUserData(user, guild)

    if (!data || data == null || data == undefined) {
        await createUser(user, guild)
        data = getDefaultData(user, guild)
    }

    var PunishMap = data.Punishes

    var PunishNum = parseInt(PunishMap.get("raid"))

    if (!PunishNum) PunishNum = 0

    if (PunishNum >= 0) {
        PunishMap.set("raid", "1")
        Punisher.ban(user, "infinity", "raid", guild)
    }

    await UserSc.updateOne(
        { UserID: user, GuildID: guild},
        { $set: { Punishes: PunishMap } }
    )

    return {
        rule: "raid",
        level: PunishNum + 1
    }
}