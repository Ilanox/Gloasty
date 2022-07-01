const Discord = require("discord.js");
const UserSc = require('../../Schema/user.js')
const GuildSc = require('../../Schema/settings.js')
const { Permissions, MessageEmbed } = require("discord.js")

const Gloasty = require('../../../gloasty.js')

module.exports = async function (user, guild, rule) {

    console.log(Gloasty.punishTypes)

    

    return {
        reason: reason,
        level: level
    }

}