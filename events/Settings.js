const Discord = require('discord.js')

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
        if (!interaction.isSelectMenu()) return
        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({ephemeral: true, content: "You don't have permissions to use this!"})
        if (interaction.customId === "settings1") {
            console.log(interaction.values[0])
        }
    }
}