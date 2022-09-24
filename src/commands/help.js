const Discord = require("discord.js");

/**
 * help command, I'm lazy to write a Wiki so.. yeah
 */

module.exports = {
	name: "help",
	description: "Check the commands and the usage of Gloasty.",
	category: "Utilities",
	options: [],
	run: async (interaction, client) => {
        const CLientMember = await interaction.guild.members.cache.get(client.user.id)
        if (!CLientMember.permissions.has(Discord.PermissionsBitField.Flags.SendMessages)) return interaction.reply("Error x403: The client is missing Permissions! Missing: ``SEND_MESSAGE``")
        const help = new Discord.EmbedBuilder()
        .setColor('#5865F2')
        .setTitle('Gloasty - Info')
        .setDescription('We will be back soon.') 
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({ text: 'Gloasty - By Edvin Studios', iconURL: client.user.displayAvatarURL() });

        interaction.reply({
            ephemeral: true,
            embeds: [help]
        })
	}
}
