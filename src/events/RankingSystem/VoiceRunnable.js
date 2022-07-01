const Discord = require('discord.js');

const RankingSystem = require('../../utils/RankingFunctions.js');
const UserSc = require('../../Schema/user.js');
const Gloasty = require('../../../gloasty.js');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    name: 'ready',
    async execute(client) {

        while(true) {

            const VoiceList = RankingSystem.getVoiceList();

            for (const i of VoiceList) {

                const VoiceMember = client.guilds.cache.get(i[1]).members.cache.get(i[0]);

                if(RankingSystem.checkIfEligibleForStar(VoiceMember)) {

                    var userData;

                    await UserSc.findOne({ UserID: VoiceMember.user.id, GuildID: VoiceMember.guild.id }, async function (err, docs) {

                        if (!docs || docs == null || docs == undefined) {
                            await RankingSystem.createUser(VoiceMember.user.id, VoiceMember.guild.id)
                            userData = { GuildID: VoiceMember.guild.id, UserID: VoiceMember.id, Stars: 0, Level: 1, Warns: new Map(), Punishes: new Map(), TotalStars: 0, StoreStars: 0 }
                        }
                        userData = docs
                    });

                    if(userData == undefined || userData == null) return;

                    if(RankingSystem.CheckIfGettingStar(userData.Level)) {
                        await RankingSystem.AddStars(VoiceMember.user.id, VoiceMember.guild.id, 1)
                        console.log("Star added to " + VoiceMember.user.tag)
                    }
            
                    if(userData.TotalStars >= RankingSystem.getMaxStarsNextLevel(userData.Level)) {
                        await RankingSystem.RemoveStars(message.author.id, message.guild.id, userData.Stars)
                        await RankingSystem.AddLevel(VoiceMember.user.id, VoiceMember.guild.id)
                    }
                    
                }

            }
            await sleep(5000);

        }

    }
}