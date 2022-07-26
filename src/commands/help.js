const Discord = require("discord.js");

module.exports = {
	name: "help",
	description: "Check the commands and the usage of Gloasty.",
	category: "Utilities",
	options: [],
	run: async (interaction, client) => {
        const CLientMember = await interaction.guild.members.cache.get(client.user.id)
        if (!CLientMember.permissions.has(Discord.PermissionsBitField.Flags.SendMessages)) return interaction.reply("Error x403: The client is missing Permissions! Missing: ``SEND_MESSAGE``")
        const help = new Discord.EmbedBuilder()
        .setColor('RANDOM')
        .setTitle('Gloasty - Info')
        .addFields(
            { 
            name: 'Utilities',
            value: 
                "**/help** - Check the commands and the usage of Gloasty. \n" + 
                "**/game** - Use discord games in your voice channel."
            },
            { 
            name: 'Moderation',
            value: 
                "**/punish** - Punishes the mentioned user with the appropriate punishment for the reason you have specified.\n" + 
                "**/clear** - Clear the messages from the mentioned user.\n" +
                "**/stats** - Check the stats of the mentioned member." 
            },
            {
            name: 'Setup',
            value: 
                "**/settings** - Update the Bot Settings.\n"
            },
        )
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Gloasty - By Ilanøx', client.user.displayAvatarURL());

        interaction.reply({
            ephemeral: true,
            embeds: [help]
        })
	}
}
