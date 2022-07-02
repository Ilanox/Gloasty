const Discord = require('discord.js')
const settings = require('../../schema/guilds.js')

module.exports = {
	name: 'guildDelete',
	async execute(guild, client) {

        settings.deleteMany({ GuildID: guild.id })

    }
}