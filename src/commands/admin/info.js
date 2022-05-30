const Discord = require("discord.js");
const {mongoPath,token,pkey,botID,testGuild} = require('../../../config.json');

module.exports = {
	name: "admin-info",
	description: "Check things about the bot (Like Guilds and stuff)",
	category: "Admin",
	options: [],
	run: async (interaction, client) => {

for (const [guildID, guild] of client.guilds.cache) {

    let invite = "No invite";

    const fetch = await guild.invites.fetch().catch(() => undefined);

    if (fetch && fetch.size) {
        invite = fetch.first().url;
        continue;
    }

    for (const [channelID, channel] of guild.channels.cache) {

        if (!invite && channel.createInvite) {
            const attempt = await channel.createInvite().catch(() => undefined);

            if (attempt) {
                invite = attempt.url;
            }
        }
    }
}

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
    

        if(interaction.user.id != "302904462123466752") return;

        let channel = await client.channels.cache.get("944213458231099463");

        client.guilds.cache.forEach(guild => {
            GuildInfo(guild, channel)
        })
	}
}