const Discord = require('discord.js')
const settings = require('../../schema/guilds.js')

/**
 * Event when the bot leaves a server.
 */

module.exports = {
	name: 'guildDelete',
	async execute(guild, client) {

        settings.deleteMany({ GuildID: guild.id })

    }
}