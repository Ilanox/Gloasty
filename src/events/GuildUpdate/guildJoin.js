const Discord = require('discord.js')
const settings = require('../../schema/guilds.js')
const Gloasty = require('../../gloasty.js')
const {mongoPath,token,pkey,botID,testGuild,RadioToken} = require('../../../config.json');

/**
 * Event when the bot joins a server.
 */

module.exports = {
	name: 'guildCreate',
	async execute(guild, client) {

        settings.create({
            GuildID: guild.id,
            OwnerID: guild.ownerId,
            LogsChannel: "None",
            xpRateMin: "5",
            xpRateMax: "25",
            WelcomeChannel: "None",
            WelcomeImage: "Default",
            PunishChannel: "None"
        })

        Gloasty.cache.createGuildToCache(guild.id)

    }
}