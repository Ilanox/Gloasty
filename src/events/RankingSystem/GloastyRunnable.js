const Gloasty = require('../../gloasty.js');
const Discord = require('discord.js')
var weeklyBoolean = false;
var dailyBoolean = false;

/**
 * Gloasty global Runnable, everything you like to do but Runnable :)
 */

function nextDay(dow) {
    const d = new Date();
    d.setDate(d.getDate() + (dow+(7-d.getDay())) % 7);
    return d;
}

module.exports = {
    name: 'ready',
    async execute(client) {

        while(true) {

            // -=-=-=-=-=-=-=-=-=-=-=-= | All Dates Setup | =-=-=-=-=-=-=-=-=-=-=-=-

            nowDate = new Date()
            resetDate = new Date(nextDay(6))
            nextDayDate = new Date() 

            nextDayDate.setHours(23)
            nextDayDate.setMinutes(0)

            resetDate.setHours(23)
            resetDate.setMinutes(0)

            // -=-=-=-=-=-=-=-=-=-=-=-= | Weekly Logs | =-=-=-=-=-=-=-=-=-=-=-=-

            const dataCollector = await Gloasty.quests.getDataCollector();

            if ( (nowDate.getDay() == resetDate.getDay()) && (nowDate.getHours() == resetDate.getHours()) && (nowDate.getMinutes() == resetDate.getMinutes()) ) {

                if (!weeklyBoolean) {
                    weeklyBoolean = true

                    const gloastyGuild = client.guilds.cache.get("908015611148378112");
                    const logChannel = gloastyGuild.channels.cache.get("1020681991257067530");
                    const dataChannel = gloastyGuild.channels.cache.get("1020683626637181048");
    
                    await Gloasty.punish.resetPunishes();
    
                    const weekly = new Discord.EmbedBuilder()
                        .setTitle("Gloasty || Weekly reset")
                        .setDescription("**__Global Punishes reset.__**")
                        .setColor('Blurple')
                        .setThumbnail(client.user.displayAvatarURL())
                        .setFooter({ text: 'Gloasty - By Edvin Studios', iconURL: client.user.displayAvatarURL() });
    
                    logChannel.send({embeds: [weekly] })
    
                    const data = new Discord.EmbedBuilder()
                        .setColor('#5865F2')
                        .setTitle('Gloasty || Weekly data')
                        .addFields(
                            { name: 'Weekly Chat Messages', value: "``" + dataCollector.WeeklyMessages + " Messages (" + dataCollector.WeeklyMessagesUsers.length + " Users)``", inline: false },
                            { name: 'Weekly Voice Minutes', value: "``" + dataCollector.WeeklyMinutes + " Minutes (" + dataCollector.WeeklyMinutesUsers.length + " Users)``", inline: false },
                            { name: 'Average Weekly Chat Messages', value: "``" + (dataCollector.WeeklyMessages / dataCollector.WeeklyMessagesUsers.length).toFixed(2) + " Average Messages``", inline: false },
                            { name: 'Average Weekly Voice Minutes', value: "``" + (dataCollector.WeeklyMinutes / dataCollector.WeeklyMinutesUsers.length).toFixed(2) + " Average Minutes``", inline: false },
                        )
                        .setThumbnail(client.user.displayAvatarURL())
                        .setFooter({ text: 'Gloasty - By Edvin Studios', iconURL: client.user.displayAvatarURL() });
    
                    dataChannel.send({embeds: [data] })
                    Gloasty.quests.resetWeeklyData();

                }

            } else weeklyBoolean = false;

            // -=-=-=-=-=-=-=-=-=-=-=-= | Daily Logs | =-=-=-=-=-=-=-=-=-=-=-=-

            if( (nowDate.getDay() == nextDayDate.getDay()) && (nowDate.getHours() == nextDayDate.getHours()) && (nowDate.getMinutes() == nextDayDate.getMinutes()) ) {

                if(!dailyBoolean) {
                    dailyBoolean = true;

                    const gloastyGuild = client.guilds.cache.get("908015611148378112");
                    const dataChannel = gloastyGuild.channels.cache.get("1020683626637181048");

                    const data = new Discord.EmbedBuilder()
                        .setColor('#5865F2')
                        .setTitle('Gloasty || Daily data')
                        .addFields(
                            { name: 'Daily Chat Messages', value: "``" + dataCollector.DailyMessages + " Messages (" + dataCollector.DailyMessagesUsers.length + " Users)``", inline: false },
                            { name: 'Daily Voice Minutes', value: "``" + dataCollector.DailyMinutes + " Minutes (" + dataCollector.DailyMinutesUsers.length + " Users)``", inline: false },
                            { name: 'Average Daily Chat Messages', value: "``" + (dataCollector.DailyMessages / dataCollector.DailyMessagesUsers.length).toFixed(2) + " Average Messages``", inline: false },
                            { name: 'Average Daily Voice Minutes', value: "``" + (dataCollector.DailyMinutes / dataCollector.DailyMinutesUsers.length).toFixed(2) + " Average Minutes``", inline: false },
                        )
                        .setThumbnail(client.user.displayAvatarURL())
                        .setFooter({ text: 'Gloasty - By Edvin Studios', iconURL: client.user.displayAvatarURL() });

                    dataChannel.send({embeds: [data] })
                    Gloasty.quests.resetDailyData();
                }
            } else dailyBoolean = false;

            // -=-=-=-=-=-=-=-=-=-=-=-= | Voice system | =-=-=-=-=-=-=-=-=-=-=-=-

            const VoiceList = Gloasty.ranking.voice.getVoiceList();

            for (const i of VoiceList) {

                const VoiceMember = client.guilds.cache.get(i[1]).members.cache.get(i[0]);

                if (Gloasty.ranking.voice.checkIfEligibleForStar(VoiceMember)) {

                    // -=-=-=-=-=-=-=-=-=-=-=-= | Check if user exist | =-=-=-=-=-=-=-=-=-=-=-=-

                    var userData = await Gloasty.user.getUserData(VoiceMember.user.id, VoiceMember.guild.id)

                    if (!userData || userData == null || userData == undefined) {
                        await Gloasty.user.createUser(VoiceMember.user.id, VoiceMember.guild.id)
                        userData = Gloasty.user.getDefaultData(VoiceMember.user.id, VoiceMember.guild.id)
                    }

                    if (userData == undefined || userData == null) return;

                    // -=-=-=-=-=-=-=-=-=-=-=-= | add Minutes | =-=-=-=-=-=-=-=-=-=-=-=-

                    if (!Gloasty.utilities.checkCooldown(VoiceMember.user.id, 'voice')) {
                        Gloasty.quests.addMinutesData(VoiceMember.user.id, VoiceMember.guild.id, 1)
                        Gloasty.utilities.setCooldown(VoiceMember.user.id, 'voice', 60000)
                    }

                    // -=-=-=-=-=-=-=-=-=-=-=-= | All Stars Setup | =-=-=-=-=-=-=-=-=-=-=-=-

                    if (Gloasty.ranking.checkIfGettingStar(userData.Level)) {
                        if (Gloasty.utilities.checkCooldown(VoiceMember.user.id, 'ranking voice')) return
                        else Gloasty.utilities.setCooldown(VoiceMember.user.id, 'ranking voice', 30000)
                        await Gloasty.ranking.addStars(VoiceMember.user.id, VoiceMember.guild.id, 1)
                        console.log("Star added to " + VoiceMember.user.tag)
                        await Gloasty.cache.updateUserToChace(VoiceMember.user.id, VoiceMember.guild.id)
                    }

                    // -=-=-=-=-=-=-=-=-=-=-=-= | Add levels To Users | =-=-=-=-=-=-=-=-=-=-=-=-

                    if (userData.Level % 5 != 0) {
                        if (userData.Stars >= 6) {
                            await Gloasty.ranking.removeStars(VoiceMember.user.id, VoiceMember.guild.id, await Gloasty.ranking.getStars(VoiceMember.user.id, VoiceMember.guild.id))
                            await Gloasty.ranking.addLevel(VoiceMember.user.id, VoiceMember.guild.id)
                            await Gloasty.cache.updateUserToChace(VoiceMember.user.id, VoiceMember.guild.id)
                        }
                    } else if (userData.Stars >= 12) {
                        await Gloasty.ranking.removeStars(VoiceMember.user.id, VoiceMember.guild.id, await Gloasty.ranking.getStars(VoiceMember.user.id, VoiceMember.guild.id))
                        await Gloasty.ranking.addLevel(VoiceMember.user.id, VoiceMember.guild.id)
                        await Gloasty.cache.updateUserToChace(VoiceMember.user.id, VoiceMember.guild.id)
                    }
                    
                    
                }

            }
            await Gloasty.utilities.sleep(5000);

        }

    }
}