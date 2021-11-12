const Discord = require('discord.js')

AfterGloasty = Boolean
GloastyType = String
UserID = String
Guild = String
GloastyMessageGuildManager = []
GuildMessage = String

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

        if(!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)) return message.reply({ephemeral: true, content: "You don't have permissions to use this!"})

        if (message.author.id == "770955559855456256") {
            const embed = message.embeds[0]
            if (!embed) return
            console.log(embed)
            if (embed.title == "Step 2 - Logs Channel") {
                Guild = message.guild.id
                AfterGloasty = true
                GloastyType = "Logs"
                UserID = embed.footer.text.replace("Gloasty - By Ilanøx | ID: ", "")
                GuildMessage =  `Guild: ${Guild}, AfterGLoasty: ${AfterGloasty}, GloastyType: ${GloastyType}, UserID: ${UserID}`
                GloastyMessageGuildManager.push(GuildMessage)
                console.log(GloastyMessageGuildManager)
            }
            return
        }

        if (!AfterGloasty) return
        if (!GloastyType) return
        if (!UserID) return

        

        if (GloastyType == "Logs") {
            
        }

    }
}