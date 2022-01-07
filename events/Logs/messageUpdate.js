const Discord = require('discord.js')
const settings = require('../../Schema/settings.js')

module.exports = {
	name: 'messageUpdate',
	async execute(OldMessage, message, client) {
        const info = await settings.find({ GuildID: message.guild.id });
        if (info[0].LogsChannel == "None") return
        NewM = message.content
        OldM = OldMessage.content
        if (message.content.length > 500) NewM = message.content.substring(0,500) + "..."
        if (OldMessage.content.length > 500) OldM = OldMessage.content.substring(0,500) + "..."
        const messageUpdate = new Discord.MessageEmbed()
        .setColor('BLURPLE')
        .setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL())
        .setDescription(
            `**Message edited in <#${message.channel.id}>** [Jump To Message!](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`
        )
        .addField("Before:", `${OldM}`)
        .addField(`After:`, `${NewM}`)
        .setFooter('Gloasty - By Ilanøx | Message ID: ' + message.id, client.user.displayAvatarURL());

        const channel = message.guild.channels.cache.get(info[0].LogsChannel)

        channel.send({ embeds: [messageUpdate] })
    }
}
