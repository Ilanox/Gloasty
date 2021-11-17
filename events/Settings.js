const Discord = require('discord.js')

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {

        const CLientMember = await interaction.guild.members.cache.get(client.user.id)
        if(!CLientMember.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)) return interaction.reply("Error x403: The client is missing Permissions! Missing: ``SEND_MESSAGE``")
        if(!CLientMember.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS)) return interaction.reply("Error x403: The client is missing Permissions! Missing: ``MANAGE_CHANNELS``")
        if(!CLientMember.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply("Error x403: The client is missing Permissions! Missing: ``MANAGE_GUILD``")
        if(!CLientMember.permissions.has(Discord.Permissions.FLAGS.MANAGE_NICKNAMES)) return interaction.reply("Error x403: The client is missing Permissions! Missing: ``MANAGE_NICKNAMES``")
        if(!CLientMember.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply("Error x403: The client is missing Permissions! Missing: ``MANAGE_MESSAGES``")
        if(!CLientMember.permissions.has(Discord.Permissions.FLAGS.MANAGE_ROLES)) return interaction.reply("Error x403: The client is missing Permissions! Missing: ``MANAGE_ROLES``")

        if (!interaction.isSelectMenu()) return
        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({ephemeral: true, content: "You don't have permissions to use this!"})
        if (interaction.customId === "settings1") {
            if (interaction.values[0] == "channels_1") {
                
            const row = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageSelectMenu()
					.setCustomId('channels_1')
					.setPlaceholder('Please Select')
					.addOptions([
						{
							label: 'Logs',
							description: 'Change the settings for the logs channel.',
							value: 'logs',
						},
						{
							label: 'Welcome',
							description: 'Change the settings for the welcome channel.',
							value: 'welcome',
						},
					]),
			);

        const step1 = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Step 1 - Channels')
        .setDescription(
            "You can choose what channel type you want to change!\n\n" +
            "**Logs** - Change the settings for the logs channel.\n\n" +
            "**Welcome** - Change the settings for the welcome channel."
        )
        .setFooter('Gloasty - By Ilanøx', client.user.displayAvatarURL());

        interaction.update({
            ephemeral: false,
            embeds: [step1],
            components: [row]
        })

            }
        } else if (interaction.customId === "channels_1") {
            if (interaction.values[0] == "logs") {
                const step2 = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Step 2 - Logs Channel')
                .setDescription(
                    "So you chose to change the logs channel!\n\n" +
                    "**__Please mention your new logs channel, you have 30 seconds!__**"
                )
                .setFooter('Gloasty - By Ilanøx | ID: ' + interaction.member.id, client.user.displayAvatarURL());
        
                interaction.reply({
                    ephemeral: false,
                    embeds: [step2],
                })
            } else if (interaction.values[0] == "welcome") {
                const step2 = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Step 2 - Welcome Channel')
                .setDescription(
                    "So you chose to change the welcome channel!\n\n" +
                    "**__Please mention your new welcome channel, you have 30 seconds!__**"
                )
                .setFooter('Gloasty - By Ilanøx | ID: ' + interaction.member.id, client.user.displayAvatarURL());
        
                interaction.reply({
                    ephemeral: false,
                    embeds: [step2],
                })
            }
        }
    }
}