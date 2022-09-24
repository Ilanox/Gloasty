const Discord = require("discord.js");
const Gloasty = require('../gloasty')
const userSc = require('../schema/user')

/**
 * botinfo command, get information about the bot using this command, note, only Ilanox has access to this.
 */

module.exports = {
	name: "bot-info",
	description: "Check some bot info about Gloasty.",
	category: "Utilities",
	options: [],
	run: async (interaction, client) => {

        if(interaction.user.id != "302904462123466752") return;

        var allUsers = 0
        var allGuilds = 0
        var allMinutes = 0
        var allMessages = 0
        var allValuableMessages = 0
        var allValuableMinutes = 0

        var users = await userSc.find({})

        await users.forEach(async user => {
            allMinutes = allMinutes + user.Minutes
            allMessages = allMessages + user.Messages
            if(user.Messages != 0) allValuableMessages++
            if(user.Minutes != 0) allValuableMinutes++
        })

        await client.guilds.cache.forEach(async guild => {
            allUsers = allUsers + guild.memberCount
            allGuilds = allGuilds + 1
          })

        const info = new Discord.EmbedBuilder()
        .setColor('#5865F2')
        .setTitle('Gloasty - Bot Info')
        .addFields(
            { name: 'Discord Username', value: "``" + client.user.tag + "``", inline: false }, // Discord bot username.
            { name: 'Discord ID', value: "``" + client.user.id + "``", inline: false }, // Discord bot ID.
            { name: 'Created at', value: "``" + Gloasty.utilities.dateFormatter(client.user.createdAt) + "``", inline: false }, // Discord bot creation date.
            { name: 'Global Member count', value: "``" + allUsers + " Members``", inline: false }, // Total Members from all servers.
            { name: 'Global Servers count', value: "``" + allGuilds + " Servers``", inline: false }, // Total server Gloasty in.
            { name: 'Total Chat Messages', value: "``" + allMessages + " Messages (" + allValuableMessages + " Users)``", inline: false }, // Total Messages in all servers.
            { name: 'Total Voice Minutes', value: "``" + allMinutes + " Minutes (" + allValuableMinutes + " Users)``", inline: false }, // Total Minutes in all voice channels.
            { name: 'Average Chat Messages', value: "``" + (allMessages / allValuableMessages).toFixed(2) + " Average Messages``", inline: false }, // Average chat messages from all servers.
            { name: 'Average Voice Minutes', value: "``" + (allMinutes / allValuableMinutes).toFixed(2) + " Average Minutes``", inline: false }, // Average Minutes from all voice channels.
            { name: 'Gloasty Uptime', value: "``" + Gloasty.utilities.timeFormatter(process.uptime()) + "``", inline: false }, // Time since last restart.
        )
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({ text: 'Gloasty - By Edvin Studios', iconURL: client.user.displayAvatarURL() });

        interaction.reply({
            ephemeral: true,
            embeds: [info]
        })
	}
}