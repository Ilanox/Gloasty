const Gloasty = require('../../../gloasty.js');
const ytdl = require('ytdl-core')
const Voice = require('@discordjs/voice')

module.exports = {
    name: 'ready',
    async execute(client) {

        while(true) {

            const VoiceList = Gloasty.ranking.voice.getVoiceList();

            for (const i of VoiceList) {

                const VoiceMember = client.guilds.cache.get(i[1]).members.cache.get(i[0]);

                if(Gloasty.ranking.voice.checkIfEligibleForStar(VoiceMember)) {

                    var userData = await Gloasty.user.getUserData(VoiceMember.user.id, VoiceMember.guild.id)

                    if (!userData || userData == null || userData == undefined) {
                        await Gloasty.user.createUser(VoiceMember.user.id, VoiceMember.guild.id)
                        userData = Gloasty.user.getDefaultData(VoiceMember.user.id, VoiceMember.guild.id)
                    }

                    if(userData == undefined || userData == null) return;

                    if(Gloasty.ranking.checkIfGettingStar(userData.Level)) {
                        await Gloasty.ranking.addStars(VoiceMember.user.id, VoiceMember.guild.id, 1)
                        console.log("Star added to " + VoiceMember.user.tag)
                    }

                    if(userData.TotalStars >= Gloasty.ranking.getMaxStars(userData.Level)) {
                        await Gloasty.ranking.removeStars(VoiceMember.user.id, VoiceMember.guild.id, await Gloasty.ranking.getStars(message.author.id, message.guild.id))
                        await Gloasty.ranking.addLevel(VoiceMember.user.id, VoiceMember.guild.id)
                    }
                    
                }

            }
            await Gloasty.utilities.sleep(15000);

        }

    }
}