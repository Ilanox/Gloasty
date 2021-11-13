const Discord = require('discord.js')
const settings = require('../Schema/settings.js')

module.exports = {
	name: 'guildDelete',
	async execute(guild, client) {

        settings.deleteMany({ GuildID: guild.id })

    }
}