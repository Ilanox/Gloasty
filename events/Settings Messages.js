const Discord = require('discord.js')
const Mongoose = require('mongoose')
const { setLogChannel, setWelcomeChannel } = require('../functions/settings.js')

module.exports = {
	name: 'messageCreate',
	async execute(message, client) {

        
        const CLientMember = await message.guild.members.cache.get(client.user.id)
        if(!CLientMember.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)) return message.reply("Error x403: The client is missing Permissions! Missing: ``SEND_MESSAGE``")
        if(!CLientMember.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply("Error x403: The client is missing Permissions! Missing: ``MANAGE_CHANNELS``")
        if(!CLientMember.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)) return message.reply("Error x403: The client is missing Permissions! Missing: ``MANAGE_GUILD``")
        if(!CLientMember.permissions.has(Discord.Permissions.FLAGS.MANAGE_NICKNAMES)) return message.reply("Error x403: The client is missing Permissions! Missing: ``MANAGE_NICKNAMES``")
        if(!CLientMember.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("Error x403: The client is missing Permissions! Missing: ``MANAGE_MESSAGES``")
        if(!CLientMember.permissions.has(Discord.Permissions.FLAGS.MANAGE_ROLES)) return message.reply("Error x403: The client is missing Permissions! Missing: ``MANAGE_ROLES``")


        message.channel.messages.fetch({limit: 2})
        .then(messageMappings => {
        let messages = Array.from(messageMappings.values());
        const previousMessage = messages[1];

        if (!previousMessage.embeds[0]) return
        if (!previousMessage.author.id == "770955559855456256") return
        if (message.author.id == "770955559855456256") return

        if (!message.author.bot) {
            if(!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)) return message.reply({ephemeral: true, content: "You don't have permissions to use this!"})
        }

        async function LogChannel() {
            if (previousMessage.embeds[0].title == "Step 2 - Logs Channel") {

                if(previousMessage.author.id == "770955559855456256") {

                    if(previousMessage.embeds[0].description.includes("you have 30 seconds!")) {
        
                        async function Timer() {
                            const Timer = new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('Timed out')
                            .setDescription(
                                "Time passed and you didn't provide the **Logs channel**, Please try again!"
                            )
                            .setFooter('Gloasty - By Ilanøx')
                
                            message.channel.send({
                                content: "<@" + message.embeds[0].footer.text.replace("Gloasty - By Ilanøx | ID: ", "") + ">",
                                embeds: [Timer]
                            })
                        }
                
                        cooldown = setTimeout(Timer, 30000)
            
                    }
                }

                const UserID = previousMessage.embeds[0].footer.text.replace("Gloasty - By Ilanøx | ID: ", "")
                if (!UserID == message.author.id) return
                const step2 = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Step 2 - Logs Channel')
                    .setDescription(
                        "Please mention the channel you want to set as **Logs Channel** | Example: <#" + message.channel.id + ">"
                    )
                    .setFooter('Gloasty - By Ilanøx | ID: ' + message.member.id, client.user.displayAvatarURL());
                if(!message.mentions.channels.first()) return message.reply({ embeds: [step2] })

                clearTimeout(cooldown)
                
                LogChannelID = message.content.replace("<#", "").replace(">", "")

                setLogChannel(message.guild.id, LogChannelID);

                const step3 = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Step 3 - Logs Channel')
                    .setDescription(
                        "You successfully changed your Logs Channel to <#" + LogChannelID + ">!"
                    )
                    .setFooter('Gloasty - By Ilanøx', client.user.displayAvatarURL());
                
                message.reply({ embeds: [step3] })
        }
        }

        async function WelcomeChannel() {
            if (previousMessage.embeds[0].title == "Step 2 - Welcome Channel") {

                if(previousMessage.author.id == "770955559855456256") {

                    if(previousMessage.embeds[0].description.includes("you have 30 seconds!")) {
        
                        async function Timer() {
                            const Timer = new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('Timed out')
                            .setDescription(
                                "Time passed and you didn't provide the **Welcome channel**, Please try again!"
                            )
                            .setFooter('Gloasty - By Ilanøx')
                
                            message.channel.send({
                                content: "<@" + message.embeds[0].footer.text.replace("Gloasty - By Ilanøx | ID: ", "") + ">",
                                embeds: [Timer]
                            })
                        }
                
                        cooldown = setTimeout(Timer, 30000)
            
                    }
                }

                const UserID = previousMessage.embeds[0].footer.text.replace("Gloasty - By Ilanøx | ID: ", "")
                if (!UserID == message.author.id) return
                const step2 = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Step 2 - Welcome Channel')
                    .setDescription(
                        "Please mention the channel you want to set as **Welcome Channel** | Example: <#" + message.channel.id + ">"
                    )
                    .setFooter('Gloasty - By Ilanøx | ID: ' + message.member.id, client.user.displayAvatarURL());
                if(!message.mentions.channels.first()) return message.reply({ embeds: [step2] })

                clearTimeout(cooldown)
                
                WelcomeChannelID = message.content.replace("<#", "").replace(">", "")

                setWelcomeChannel(message.guild.id, WelcomeChannelID);

                const step3 = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Step 3 - Welcome Channel')
                    .setDescription(
                        "You successfully changed your Welcome Channel to <#" + WelcomeChannelID + ">!"
                    )
                    .setFooter('Gloasty - By Ilanøx', client.user.displayAvatarURL());
                
                message.reply({ embeds: [step3] })
        }
        }
        
        LogChannel()
        WelcomeChannel()




        })
    }
}