const Discord = require('discord.js')
const settings = require('../../schema/guilds.js')
const {mongoPath,token,pkey,botID,testGuild,RadioToken} = require('../../../config.json');

module.exports = {
	name: 'guildCreate',
	async execute(guild, client) {

        settings.create({
            GuildID: guild.id,
            OwnerID: guild.ownerId,
            LogsChannel: "None",
            xpRateMin: "5",
            xpRateMax: "25",
            WelcomeChannel: "None",
            WelcomeImage: "Default",
            PunishChannel: "None"
        })


        let channel = await client.channels.cache.get("944213458231099463");

        async function GuildInfo(guild, channel) {

            console.log(guild.name)

            console.log(guild.id)

            console.log(guild.ownerId)

            console.log(guild.memberCount)

            console.log("\n-----------------------\n")

            const embed = new Discord.MessageEmbed()
            .setColor("BLURPLE")
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setTitle("Server info")
            .addField("Server Name", guild.name, true)
            .addField("Server ID", guild.id, true)
            .addField("Owner ID", guild.ownerId, true)
            .setFooter(client.user.username, client.user.displayAvatarURL());
        
            let invite = "No invite";
            
            const fetch = await guild.invites.fetch().catch(() => undefined);
            
            if (fetch && fetch.size) {
                invite = fetch.first().url;
            }
            
            for (const [channelID, channel] of guild.channels.cache) {
            
                if (!invite && channel.createInvite) {
                    const attempt = await channel.createInvite().catch(() => undefined);
            
                    if (attempt) {
                        invite = attempt.url;
                    }
                }
            }

            if(invite != "No invite") embed.addField("Invite link", invite, true)
            else embed.addField("Invite link", "Missing permissions", true);

            channel.send({ embeds: [embed] });
        }

        GuildInfo(guild, channel)

    }
}