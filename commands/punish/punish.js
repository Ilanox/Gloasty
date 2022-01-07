const Discord = require("discord.js");
const { Timeout, Ban, Warn, Kick } = require('../../Functions/punish.js')
const UserSc = require('../../Schema/user.js')
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
        const Rule = interaction.options.get('rule').value;
        if (!reasonObject || reasonObject == null) {
            var reason = "אין סיבה"
        } else {
            var reason = reasonObject.value
        }
        const user = User.user.id
        const guild = interaction.guild.id

        const member = await interaction.guild.members.cache.get(user)

        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({ephemeral: true, content: "**You don't have enought permissions to use this command!**"})
        if (User.user.bot) return interaction.reply({ephemeral: true, content: "**You can't punish this user, ``Reason: The user is bot.``**"})
        if (member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({ephemeral: true, content: "**You can't punish this user, ``Reason: The user is an moderator or an admin.``**"})
        if (member.roles.highest.position > interaction.guild.members.cache.get(client.user.id).roles.highest.position) return interaction.reply({ephemeral: true, content: "**You can't punish this user, ``Reason: The user has higher role than me.``**"})
        if (member.roles.highest.position > interaction.member.roles.highest.position) return interaction.reply({ephemeral: true, content: "**You can't punish this user, ``Reason: The user has higher role than you.``**"})

        await GuildSc.findOne({GuildID: interaction.guild.id}, async function (err, docs) {
            var PunishChannelID = docs.PunishChannel
            var Guild = await client.guilds.cache.get(guild)
            var PunishChannel = Guild.channels.cache.get(PunishChannelID)

        async function Spam() {

            await UserSc.findOne({UserID: user, GuildID: guild}, async function (err, docs) {

                if (!docs || docs == null || docs == undefined) {
                    await UserSc.create({GuildID: guild, UserID: user, XP: 0, Level: 1, Warns: new Map(), Punishes: new Map()})
                }
                await UserSc.findOne({UserID: user, GuildID: guild}, async function (err, data) {

                    var PunishMap = data.Punishes
                
                    var PunishNum = parseInt(PunishMap.get("spam"))

                    if (!PunishNum) PunishNum = 0

                    const punishEmbed = new MessageEmbed()
                        .setColor('DARK_RED')
                        .setTitle('Punish By ' + interaction.user.username + "#" + interaction.user.discriminator)
                        .setDescription(`__Punished:__ **<@${user}>**\n__Reason:__ **${reason}**\n__Rule:__ **Spam**\n__Punish level:__ **${PunishNum + 1}**`)
                        .setFooter('Gloasty - By Ilanøx', client.user.displayAvatarURL());

                    if (PunishNum == 0) {
                        PunishMap.set("spam", "1")
                        Warn(user, "spam", guild)
                        Timeout(user, 2 * 60 * 1000, "spam", guild)
                    } else if (PunishNum == 1) {
                        PunishMap.set("spam", "2")
                        Timeout(user, 60 * 60 * 1000, "spam", guild)
                    } else if (PunishNum == 2) {
                        PunishMap.set("spam", "3")
                        Timeout(user, 7 * 24 * 60 * 60 * 1000, "spam", guild)
                    } else if (PunishNum == 3) {
                        PunishMap.set("spam", "4")
                        Ban(user, 31 * 24 * 60 * 60 * 1000, "spam", guild)
                    } else if (PunishNum == 4) {
                        PunishMap.set("spam", "5")
                        Ban(user, "infinity", "spam", guild)
                    }

                    await UserSc.updateOne(
                        { UserID: user, GuildID: guild},
                        { $set: { Punishes: PunishMap } }
                    )

                    if (PunishChannel) {
                        PunishChannel.send({embeds: [punishEmbed]})
                    } else {
                        interaction.channel.send({content: "Please create PunishLogs channel and set it in our web dashboard: https://gloasty.xyz", embeds: [punishEmbed]})
                    }
                    

                    interaction.reply({
                        content: `> המשתמש <@${interaction.user.id}> העניש את <@${user}> על ספאם, מהסיבה "**${reason}**", המשתמש הוענש בספאם דרגה **${PunishNum + 1}**`
                    })
                })
            })
        }

        async function Voice() {

            await UserSc.findOne({UserID: user, GuildID: guild}, async function (err, docs) {

                if (!docs || docs == null || docs == undefined) {
                    await UserSc.create({GuildID: guild, UserID: user, XP: 0, Level: 1, Warns: new Map(), Punishes: new Map()})
                }
                await UserSc.findOne({UserID: user, GuildID: guild}, async function (err, data) {

                    var PunishMap = data.Punishes
                
                    var PunishNum = parseInt(PunishMap.get("voice"))

                    if (!PunishNum) PunishNum = 0

                    const punishEmbed = new MessageEmbed()
                        .setColor('DARK_RED')
                        .setTitle('Punish By ' + interaction.user.username + "#" + interaction.user.discriminator)
                        .setDescription(`__Punished:__ **<@${user}>**\n__Reason:__ **${reason}**\n__Rule:__ **Voice Abuse**\n__Punish level:__ **${PunishNum + 1}**`)
                        .setFooter('Gloasty - By Ilanøx', client.user.displayAvatarURL());

                    if (PunishNum == 0) {
                        PunishMap.set("voice", "1")
                        Warn(user, "voice", guild)
                        Timeout(user, 10 * 60 * 1000, "voice", guild)
                    } else if (PunishNum == 1) {
                        PunishMap.set("voice", "2")
                        Timeout(user, 2 * 60 * 60 * 1000, "voice", guild)
                    } else if (PunishNum == 2) {
                        PunishMap.set("voice", "3")
                        Timeout(user, 14 * 24 * 60 * 60 * 1000, "voice", guild)
                    } else if (PunishNum == 3) {
                        PunishMap.set("voice", "4")
                        Ban(user, 31 * 24 * 60 * 60 * 1000, "voice", guild)
                    } else if (PunishNum == 4) {
                        PunishMap.set("voice", "5")
                        Ban(user, "infinity", "voice", guild)
                    }

                    await UserSc.updateOne(
                        { UserID: user, GuildID: guild},
                        { $set: { Punishes: PunishMap } }
                    )

                    if (PunishChannel) {
                        PunishChannel.send({embeds: [punishEmbed]})
                    } else {
                        interaction.channel.send({content: "Please create PunishLogs channel and set it in our web dashboard: https://gloasty.xyz", embeds: [punishEmbed]})
                    }
                    

                    interaction.reply({
                        content: `> המשתמש <@${interaction.user.id}> העניש את <@${user}> על שימוש לרעה בוויס, מהסיבה "**${reason}**", המשתמש הוענש בשימוש לרעה בוויס דרגה **${PunishNum + 1}**`
                    })
                })
            })
        }

        async function Insult() {

            await UserSc.findOne({UserID: user, GuildID: guild}, async function (err, docs) {

                if (!docs || docs == null || docs == undefined) {
                    await UserSc.create({GuildID: guild, UserID: user, XP: 0, Level: 1, Warns: new Map(), Punishes: new Map()})
                }
                await UserSc.findOne({UserID: user, GuildID: guild}, async function (err, data) {

                    var PunishMap = data.Punishes
                
                    var PunishNum = parseInt(PunishMap.get("insult"))

                    if (!PunishNum) PunishNum = 0

                    const punishEmbed = new MessageEmbed()
                        .setColor('DARK_RED')
                        .setTitle('Punish By ' + interaction.user.username + "#" + interaction.user.discriminator)
                        .setDescription(`__Punished:__ **<@${user}>**\n__Reason:__ **${reason}**\n__Rule:__ **Insult**\n__Punish level:__ **${PunishNum + 1}**`)
                        .setFooter('Gloasty - By Ilanøx', client.user.displayAvatarURL());

                    if (PunishNum == 0) {
                        PunishMap.set("insult", "1")
                        Warn(user, "insult", guild)
                    } else if (PunishNum == 1) {
                        PunishMap.set("insult", "2")
                        Timeout(user, 60 * 60 * 1000, "insult", guild)
                    } else if (PunishNum == 2) {
                        PunishMap.set("insult", "3")
                        Timeout(user, 1 * 24 * 60 * 60 * 1000, "insult", guild)
                    } else if (PunishNum == 3) {
                        PunishMap.set("insult", "4")
                        Timeout(user, 7 * 24 * 60 * 60 * 1000, "insult", guild)
                    } else if (PunishNum == 4) {
                        PunishMap.set("insult", "5")
                        Timeout(user, 14 * 24 * 60 * 60 * 1000, "insult", guild)
                    } else if (PunishNum == 5) {
                        PunishMap.set("insult", "6")
                        Ban(user, "infinity", "insult", guild)
                    }

                    await UserSc.updateOne(
                        { UserID: user, GuildID: guild},
                        { $set: { Punishes: PunishMap } }
                    )

                    if (PunishChannel) {
                        PunishChannel.send({embeds: [punishEmbed]})
                    } else {
                        interaction.channel.send({content: "Please create PunishLogs channel and set it in our web dashboard: https://gloasty.xyz", embeds: [punishEmbed]})
                    }
                    

                    interaction.reply({
                        content: `> המשתמש <@${interaction.user.id}> העניש את <@${user}> על פגיעה בחבר שרת, מהסיבה "**${reason}**", המשתמש הוענש בפגיעה בחבר שרת בדרגה **${PunishNum + 1}**`
                    })
                })
            })
        }

        async function Advertising() {

            await UserSc.findOne({UserID: user, GuildID: guild}, async function (err, docs) {

                if (!docs || docs == null || docs == undefined) {
                    await UserSc.create({GuildID: guild, UserID: user, XP: 0, Level: 1, Warns: new Map(), Punishes: new Map()})
                }
                await UserSc.findOne({UserID: user, GuildID: guild}, async function (err, data) {

                    var PunishMap = data.Punishes
                
                    var PunishNum = parseInt(PunishMap.get("advertising"))

                    if (!PunishNum) PunishNum = 0

                    const punishEmbed = new MessageEmbed()
                        .setColor('DARK_RED')
                        .setTitle('Punish By ' + interaction.user.username + "#" + interaction.user.discriminator)
                        .setDescription(`__Punished:__ **<@${user}>**\n__Reason:__ **${reason}**\n__Rule:__ **Advertising**\n__Punish level:__ **${PunishNum + 1}**`)
                        .setFooter('Gloasty - By Ilanøx', client.user.displayAvatarURL());

                    if (PunishNum == 0) {
                        PunishMap.set("advertising", "1")
                        Warn(user, "advertising", guild)
                        Timeout(user, 24 * 60 * 60 * 1000, "advertising", guild)
                    } else if (PunishNum == 1) {
                        PunishMap.set("advertising", "2")
                        Timeout(user, 7 * 24 * 60 * 60 * 1000, "advertising", guild)
                    } else if (PunishNum == 2) {
                        PunishMap.set("advertising", "3")
                        Ban(user, 7 * 24 * 60 * 60 * 1000, "advertising", guild)
                    } else if (PunishNum == 3) {
                        PunishMap.set("advertising", "4")
                        Ban(user, 31 * 24 * 60 * 60 * 1000, "advertising", guild)
                    } else if (PunishNum == 4) {
                        PunishMap.set("advertising", "5")
                        Ban(user, "infinity", "advertising", guild)
                    } 

                    await UserSc.updateOne(
                        { UserID: user, GuildID: guild},
                        { $set: { Punishes: PunishMap } }
                    )

                    if (PunishChannel) {
                        PunishChannel.send({embeds: [punishEmbed]})
                    } else {
                        interaction.channel.send({content: "Please create PunishLogs channel and set it in our web dashboard: https://gloasty.xyz", embeds: [punishEmbed]})
                    }
                    

                    interaction.reply({
                        content: `> המשתמש <@${interaction.user.id}> העניש את <@${user}> על פרסום, מהסיבה "**${reason}**", המשתמש הוענש על פרסום בדרגה **${PunishNum + 1}**`
                    })
                })
            })
        }

        async function Raid() {

            await UserSc.findOne({UserID: user, GuildID: guild}, async function (err, docs) {

                if (!docs || docs == null || docs == undefined) {
                    await UserSc.create({GuildID: guild, UserID: user, XP: 0, Level: 1, Warns: new Map(), Punishes: new Map()})
                }
                await UserSc.findOne({UserID: user, GuildID: guild}, async function (err, data) {

                    var PunishMap = data.Punishes
                
                    var PunishNum = parseInt(PunishMap.get("raid"))

                    if (!PunishNum) PunishNum = 0

                    const punishEmbed = new MessageEmbed()
                        .setColor('DARK_RED')
                        .setTitle('Punish By ' + interaction.user.username + "#" + interaction.user.discriminator)
                        .setDescription(`__Punished:__ **<@${user}>**\n__Reason:__ **${reason}**\n__Rule:__ **Raid**\n__Punish level:__ **${PunishNum + 1}**`)
                        .setFooter('Gloasty - By Ilanøx', client.user.displayAvatarURL());

                    if (PunishNum == 0) {
                        PunishMap.set("raid", "1")
                        Ban(user, "infinity", "raid", guild)
                    }

                    await UserSc.updateOne(
                        { UserID: user, GuildID: guild},
                        { $set: { Punishes: PunishMap } }
                    )

                    if (PunishChannel) {
                        PunishChannel.send({embeds: [punishEmbed]})
                    } else {
                        interaction.channel.send({content: "Please create PunishLogs channel and set it in our web dashboard: https://gloasty.xyz", embeds: [punishEmbed]})
                    }
                    

                    interaction.reply({
                        content: `> המשתמש <@${interaction.user.id}> העניש את <@${user}> על רייד, מהסיבה "**${reason}**", המשתמש הוענש על רייד בדרגה **${PunishNum + 1}**`
                    })
                })
            })
        }

        async function Disrespect() {

            await UserSc.findOne({UserID: user, GuildID: guild}, async function (err, docs) {

                if (!docs || docs == null || docs == undefined) {
                    await UserSc.create({GuildID: guild, UserID: user, XP: 0, Level: 1, Warns: new Map(), Punishes: new Map()})
                }
                await UserSc.findOne({UserID: user, GuildID: guild}, async function (err, data) {

                    var PunishMap = data.Punishes
                
                    var PunishNum = parseInt(PunishMap.get("disrespect"))

                    if (!PunishNum) PunishNum = 0

                    const punishEmbed = new MessageEmbed()
                        .setColor('DARK_RED')
                        .setTitle('Punish By ' + interaction.user.username + "#" + interaction.user.discriminator)
                        .setDescription(`__Punished:__ **<@${user}>**\n__Reason:__ **${reason}**\n__Rule:__ **Staff Disrespect**\n__Punish level:__ **${PunishNum + 1}**`)
                        .setFooter('Gloasty - By Ilanøx', client.user.displayAvatarURL());

                    if (PunishNum == 0) {
                        PunishMap.set("disrespect", "1")
                        Warn(user, "disrespect", guild)
                        Timeout(user, 24 * 60 * 60 * 1000, "disrespect", guild)
                    } else if (PunishNum == 1) {
                        PunishMap.set("disrespect", "2")
                        Timeout(user, 7 * 24 * 60 * 60 * 1000, "disrespect", guild)
                    } else if (PunishNum == 2) {
                        PunishMap.set("disrespect", "3")
                        Ban(user, 7 * 24 * 60 * 60 * 1000, "disrespect", guild)
                    } else if (PunishNum == 3) {
                        PunishMap.set("disrespect", "4")
                        Ban(user, 31 * 24 * 60 * 60 * 1000, "disrespect", guild)
                    } else if (PunishNum == 4) {
                        PunishMap.set("disrespect", "5")
                        Ban(user, "infinity", "disrespect", guild)
                    } 

                    await UserSc.updateOne(
                        { UserID: user, GuildID: guild},
                        { $set: { Punishes: PunishMap } }
                    )

                    if (PunishChannel) {
                        PunishChannel.send({embeds: [punishEmbed]})
                    } else {
                        interaction.channel.send({content: "Please create PunishLogs channel and set it in our web dashboard: https://gloasty.xyz", embeds: [punishEmbed]})
                    }
                    

                    interaction.reply({
                        content: `> המשתמש <@${interaction.user.id}> העניש את <@${user}> על פגיעה בחבר צוות, מהסיבה "**${reason}**", המשתמש הוענש על פגיעה בחבר צוות בדרגה **${PunishNum + 1}**`
                    })
                })
            })
        }

        async function NSFW() {

            await UserSc.findOne({UserID: user, GuildID: guild}, async function (err, docs) {

                if (!docs || docs == null || docs == undefined) {
                    await UserSc.create({GuildID: guild, UserID: user, XP: 0, Level: 1, Warns: new Map(), Punishes: new Map()})
                }
                await UserSc.findOne({UserID: user, GuildID: guild}, async function (err, data) {

                    var PunishMap = data.Punishes
                
                    var PunishNum = parseInt(PunishMap.get("nsfw"))

                    if (!PunishNum) PunishNum = 0

                    const punishEmbed = new MessageEmbed()
                        .setColor('DARK_RED')
                        .setTitle('Punish By ' + interaction.user.username + "#" + interaction.user.discriminator)
                        .setDescription(`__Punished:__ **<@${user}>**\n__Reason:__ **${reason}**\n__Rule:__ **NSFW**\n__Punish level:__ **${PunishNum + 1}**`)
                        .setFooter('Gloasty - By Ilanøx', client.user.displayAvatarURL());

                    if (PunishNum == 0) {
                        PunishMap.set("nsfw", "1")
                        Warn(user, "nsfw", guild)
                    } else if (PunishNum == 1) {
                        PunishMap.set("nsfw", "2")
                        Timeout(user, 60 * 60 * 1000, "nsfw", guild)
                    } else if (PunishNum == 2) {
                        PunishMap.set("nsfw", "3")
                        Timeout(user, 1 * 24 * 60 * 60 * 1000, "nsfw", guild)
                    } else if (PunishNum == 3) {
                        PunishMap.set("nsfw", "4")
                        Timeout(user, 7 * 24 * 60 * 60 * 1000, "nsfw", guild)
                    } else if (PunishNum == 4) {
                        PunishMap.set("nsfw", "5")
                        Timeout(user, 14 * 24 * 60 * 60 * 1000, "nsfw", guild)
                    } else if (PunishNum == 5) {
                        PunishMap.set("nsfw", "6")
                        Ban(user, "infinity", "nsfw", guild)
                    }

                    await UserSc.updateOne(
                        { UserID: user, GuildID: guild},
                        { $set: { Punishes: PunishMap } }
                    )

                    if (PunishChannel) {
                        PunishChannel.send({embeds: [punishEmbed]})
                    } else {
                        interaction.channel.send({content: "Please create PunishLogs channel and set it in our web dashboard: https://gloasty.xyz", embeds: [punishEmbed]})
                    }
                    

                    interaction.reply({
                        content: `> המשתמש <@${interaction.user.id}> העניש את <@${user}> על פרסום פורנוגרפיה, מהסיבה "**${reason}**", המשתמש הוענש על פרסום פורנוגרפיה בדרגה **${PunishNum + 1}**`
                    })
                })
            })
        }

        async function BugAbuse() {

            await UserSc.findOne({UserID: user, GuildID: guild}, async function (err, docs) {

                if (!docs || docs == null || docs == undefined) {
                    await UserSc.create({GuildID: guild, UserID: user, XP: 0, Level: 1, Warns: new Map(), Punishes: new Map()})
                }
                await UserSc.findOne({UserID: user, GuildID: guild}, async function (err, data) {

                    var PunishMap = data.Punishes
                
                    var PunishNum = parseInt(PunishMap.get("bug"))

                    if (!PunishNum) PunishNum = 0

                    const punishEmbed = new MessageEmbed()
                        .setColor('DARK_RED')
                        .setTitle('Punish By ' + interaction.user.username + "#" + interaction.user.discriminator)
                        .setDescription(`__Punished:__ **<@${user}>**\n__Reason:__ **${reason}**\n__Rule:__ **Bug Abuse**\n__Punish level:__ **${PunishNum + 1}**`)
                        .setFooter('Gloasty - By Ilanøx', client.user.displayAvatarURL());

                    if (PunishNum == 0) {
                        PunishMap.set("bug", "1")
                        Warn(user, "bug", guild)
                        Timeout(user, 24 * 60 * 60 * 1000, "bug", guild)
                    } else if (PunishNum == 1) {
                        PunishMap.set("bug", "2")
                        Timeout(user, 7 * 24 * 60 * 60 * 1000, "bug", guild)
                    } else if (PunishNum == 2) {
                        PunishMap.set("bug", "3")
                        Ban(user, 7 * 24 * 60 * 60 * 1000, "bug", guild)
                    } else if (PunishNum == 3) {
                        PunishMap.set("bug", "4")
                        Ban(user, 31 * 24 * 60 * 60 * 1000, "bug", guild)
                    } else if (PunishNum == 4) {
                        PunishMap.set("bug", "5")
                        Ban(user, "infinity", "bug", guild)
                    } 

                    await UserSc.updateOne(
                        { UserID: user, GuildID: guild},
                        { $set: { Punishes: PunishMap } }
                    )

                    if (PunishChannel) {
                        PunishChannel.send({embeds: [punishEmbed]})
                    } else {
                        interaction.channel.send({content: "Please create PunishLogs channel and set it in our web dashboard: https://gloasty.xyz", embeds: [punishEmbed]})
                    }
                    

                    interaction.reply({
                        content: `> המשתמש <@${interaction.user.id}> העניש את <@${user}> על ניצול באגים, מהסיבה "**${reason}**", המשתמש הוענש על ניצול באגים בדרגה **${PunishNum + 1}**`
                    })
                })
            })
        }

        if (Rule == "spam") {
            Spam()
        } else if (Rule == "voice") {
            Voice()
        } else if (Rule == "insult") {
            Insult()
        } else if (Rule == "advertising") {
            Advertising()
        } else if (Rule == "raid") {
            Raid()
        } else if (Rule == "disrespect") {
            Disrespect()
        } else if (Rule == "nsfw") {
            NSFW()
        } else if (Rule == "bug") {
            BugAbuse()
        }

    })
        
	}
}
