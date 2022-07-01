const Discord = require("discord.js");
const Gloasty = require("../../../gloasty.js")
const UserSc = require('../../Schema/user.js')
const punishUser = require('../../utils/punishUser.js')
const GuildSc = require('../../Schema/settings.js')
const { Permissions, MessageEmbed } = require("discord.js")

module.exports = {
	name: "punish",
	description: "Command to punish a user according to the rules",
	category: "Punishes",
	options: [
        {
            name: "rule",
            description: "What do you want to punish the user for?",
            type: "STRING",
            choices: [
                {
                    name: "Spam",
                    value: "spam"
                },
                {
                    name: "Voice Abouse",
                    value: "voice"
                },
                {
                    name: "Insult",
                    value: "insult"
                },
                {
                    name: "Advertising",
                    value: "advertising"
                },
                {
                    name: "Raid",
                    value: "raid"
                },
                {
                    name: "Staff disrespect",
                    value: "disrespect"
                },
                {
                    name: "NSFW",
                    value: "nsfw"
                },
                {
                    name: "Bug Abuse",
                    value: "bug"
                }
            ],
            required: true
        },
        {
            name: "user",
            description: "Who is the user you want to punish?",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "Why do you want to punish this user?",
            type: "STRING",
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

        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({ephemeral: true, content: "**You don't have enought permissions to use this command!**"})
        if (User.user.bot) return interaction.reply({ephemeral: true, content: "**You can't punish this user, ``Reason: The user is bot.``**"})
        if (member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({ephemeral: true, content: "**You can't punish this user, ``Reason: The user is an moderator or an admin.``**"})
        if (member.roles.highest.position > interaction.guild.members.cache.get(client.user.id).roles.highest.position) return interaction.reply({ephemeral: true, content: "**You can't punish this user, ``Reason: The user has higher role than me.``**"})
        if (member.roles.highest.position > interaction.member.roles.highest.position) return interaction.reply({ephemeral: true, content: "**You can't punish this user, ``Reason: The user has higher role than you.``**"})

        const guildData = await GuildSc.findOne({GuildID: interaction.guild.id})

        var PunishChannelID = guildData.PunishChannel
        var Guild = await client.guilds.cache.get(guild)
        var PunishChannel = Guild.channels.cache.get(PunishChannelID)

        const punishInfo = await punishUser(user, guild, rule)

        interaction.reply({
            content: `> המשתמש <@${interaction.user.id}> העניש את <@${user}> על ${punishInfo.reason}, מהסיבה "**${reason}**", המשתמש הוענש על ${punishInfo.reason} בדרגה **${punishInfo.level}**`
        })

        const punishEmbed = new MessageEmbed()
        .setColor('DARK_RED')
        .setTitle('Punish By ' + interaction.user.tag)
        .setDescription(`__Punished:__ **<@${user}>**\n__Reason:__ **${reason}**\n__Rule:__ **${rule.charAt(0).toUpperCase() + rule.slice(1)}**\n__Punish level:__ **${punishInfo.level}**`)
        .setFooter('Gloasty - By Edvin Studios', client.user.displayAvatarURL());

        if (PunishChannel) {
            PunishChannel.send({embeds: [punishEmbed]})
        }
	}
}
