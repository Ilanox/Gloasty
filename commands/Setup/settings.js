const Discord = require("discord.js");

module.exports = {
	name: "settings",
	description: "Update the Bot Settings.",
	category: "Setup",
	options: [],
	run: async (interaction, client) => {
        const CLientMember = await interaction.guild.members.cache.get(client.user.id)
        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({ephemeral: true, content: "You don't have permissions to use this command!"})

        // -----------------------------------------------------

        if(!CLientMember.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)) return interaction.reply("Error x403: The client is missing Permissions! Missing: ``SEND_MESSAGE``")
        if(!CLientMember.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS)) return interaction.reply("Error x403: The client is missing Permissions! Missing: ``MANAGE_CHANNELS``")
        if(!CLientMember.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply("Error x403: The client is missing Permissions! Missing: ``MANAGE_GUILD``")
        if(!CLientMember.permissions.has(Discord.Permissions.FLAGS.MANAGE_NICKNAMES)) return interaction.reply("Error x403: The client is missing Permissions! Missing: ``MANAGE_NICKNAMES``")
        if(!CLientMember.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply("Error x403: The client is missing Permissions! Missing: ``MANAGE_MESSAGES``")
        if(!CLientMember.permissions.has(Discord.Permissions.FLAGS.MANAGE_ROLES)) return interaction.reply("Error x403: The client is missing Permissions! Missing: ``MANAGE_ROLES``")

        // -----------------------------------------------------

        const row = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageSelectMenu()
					.setCustomId('settings1')
					.setPlaceholder('Please Select')
					.addOptions([
						{
							label: 'Channels',
							description: 'Change the settings that related to channels.',
							value: 'channels_1',
						},
						{
							label: 'XP System',
							description: 'Change the Rate for the XP System.',
							value: 'xp_system_1',
						},
                        {
							label: 'Role Prefix',
							description: 'Add custom prefix for every role.',
							value: 'role_prefix_1',
						},
					]),
			);

        const help = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Gloasty - Settings')
        .setDescription(
            "Hello, Welcome to the settings menu on Gloasty\n" +
            "You can choose what setting you want to change!\n\n" +
            "**Channels** - Change the settings that related to channels, like Logs and stuff like that.\n\n" +
            "**XP System** - Change the Rate for the XP System, also change add blacklist channels and things like that.\n\n" + 
            "**Role Prefix** - Add custom prefix for every role, Like ``OW | <name>``."
        )
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Gloasty - By Ilanøx', client.user.displayAvatarURL());

        interaction.reply({
            ephemeral: false,
            embeds: [help],
            components: [row]
        })
	}
}