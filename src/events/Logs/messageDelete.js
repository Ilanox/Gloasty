const Discord = require('discord.js')
const settings = require('../../Schema/settings.js')

module.exports = {
	name: 'messageDelete',
	async execute(message, client) {
        const info = await settings.find({ GuildID: message.guild.id });
        if (info == null || info[0] == null || info[0].LogsChannel == "None" || info[0].LogsChannel == null) return
        const messageDelete = new Discord.MessageEmbed()
        .setColor('RED')
        .setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL())
        .setDescription(
            `**Message sent by <@${message.author.id}> deleted in <#${message.channel.id}>!**\n${message.content}`
        )
        .setFooter('Gloasty - By Ilanøx | Message ID: ' + message.id, client.user.displayAvatarURL());

        const channel = message.guild.channels.cache.get(info[0].LogsChannel)

        channel.send({ embeds: [messageDelete] })
    }
}
