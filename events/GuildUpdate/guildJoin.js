const Discord = require('discord.js')
const settings = require('../../Schema/settings.js')

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
            WelcomeImage: "Default"
        })

    }
}