const Discord = require("discord.js");
const Gloasty = require("../gloasty.js")
const userSc = require('../schema/user.js')
const punishUser = require('../../Gloasty-Utils/punish/punishUser.js')
const GuildSc = require('../schema/guilds.js')
const { PermissionsBitField, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")

/**
 * punish command, punish someone for a certain rule that is written here, The punishments reset every week!
 */

module.exports = {
	name: "punish",
	description: "Command to punish a user according to the rules",
	category: "Punishes",
	options: [
        {
            name: "rule",
            description: "What do you want to punish the user for?",
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "Spam", // Punishes a user for spamming the chat channels on the server.
                    value: "spam"
                },
                {
                    name: "Voice Abuse", // Punishes a user for problems in the voice channels, for example strange noises or earape.
                    value: "voice"
                },
                {
                    name: "Insult", // Punishes a user for harming a server member, for example swearing.
                    value: "insult"
                },
                {
                    name: "Advertising", // Punishes the user for advertising in the chat channels or/and in the voice channels on the server.
                    value: "advertising"
                },
                {
                    name: "Raid", // Punishes users for multiple flooding of the chat channels and bans immediately and permanently.
                    value: "raid"
                },
                {
                    name: "Staff disrespect", // Punishes for disrespecting staff members.
                    value: "disrespect"
                },
                {
                    name: "NSFW", // Punishes a user for sending inappropriate content to Discord servers, for example pornography.
                    value: "nsfw"
                },
                {
                    name: "Bug Abuse", // Punishes a user for exploiting bugs on the Discord server and/or bots on the server.
                    value: "bug"
                }
            ],
            required: true
        },
        {
            name: "user",
            description: "Who is the user you want to punish?",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "reason",
            description: "Why do you want to punish this user?",
            type: ApplicationCommandOptionType.String,
            required: false
        },
    ],
	run: async (interaction, client) => {
        const User = interaction.options.get('user');
        const reasonObject = interaction.options.get('reason');
        const rule = interaction.options.get('rule').value;
        if (!reasonObject || reasonObject == null) {
            var reason = "אין סיבה"
        } else {
            reason = reasonObject.value
        }
        const user = User.user.id
        const guild = interaction.guild.id

        const member = await interaction.guild.members.cache.get(user)

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({ephemeral: true, content: "**You don't have enough permissions to use this command!**"})
        if (User.user.bot) return interaction.reply({ephemeral: true, content: "**You can't punish this user, ``Reason: The user is bot.``**"})
        if (member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({ephemeral: true, content: "**You can't punish this user, ``Reason: The user is an moderator or an admin.``**"})
        if (member.roles.highest.position > interaction.guild.members.cache.get(client.user.id).roles.highest.position) return interaction.reply({ephemeral: true, content: "**You can't punish this user, ``Reason: The user has higher role than me.``**"})
        if (member.roles.highest.position > interaction.member.roles.highest.position) return interaction.reply({ephemeral: true, content: "**You can't punish this user, ``Reason: The user has higher role than you.``**"})

        const guildData = await GuildSc.findOne({GuildID: interaction.guild.id})

        var PunishChannelID = guildData.PunishChannel
        var Guild = await client.guilds.cache.get(guild)
        var PunishChannel = Guild.channels.cache.get(PunishChannelID)

        const punishInfo = await punishUser(user, Guild, rule)

        interaction.reply({
            content: `> המשתמש <@${interaction.user.id}> העניש את <@${user}> על ${punishInfo.reason}, מהסיבה "**${reason}**", המשתמש הוענש על ${punishInfo.reason} בדרגה **${punishInfo.level}**`
        })

        const punishEmbed = new Discord.EmbedBuilder()
        .setColor('DARK_RED')
        .setTitle('Punish By ' + interaction.user.tag)
        .setDescription(`__Punished:__ **<@${user}>**\n__Reason:__ **${reason}**\n__Rule:__ **${rule.charAt(0).toUpperCase() + rule.slice(1)}**\n__Punish level:__ **${punishInfo.level}**`)
        .setFooter({ text: 'Gloasty - By Edvin Studios', iconURL: client.user.displayAvatarURL()});

        if (PunishChannel) {
            PunishChannel.send({embeds: [punishEmbed]})
        }
	}
}
