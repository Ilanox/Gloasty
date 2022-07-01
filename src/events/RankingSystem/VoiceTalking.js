const Discord = require('discord.js');

const RankingSystem = require('../../utils/RankingFunctions.js');

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldVoiceStateMember, newVoiceStateMember, client) {
        
        const oldVoiceChannel = oldVoiceStateMember.channelId;
        const newVoiceChannel = newVoiceStateMember.channelId;

        function checkVoiceChannel(voiceChannel) {
            if (voiceChannel == null || voiceChannel == undefined) return false;
            return true;
        }

        if((!checkVoiceChannel(oldVoiceChannel)) && (checkVoiceChannel(newVoiceChannel))) RankingSystem.addToVoiceList(newVoiceStateMember.id, newVoiceStateMember.guild.id);

        if((checkVoiceChannel(oldVoiceChannel)) && (!checkVoiceChannel(newVoiceChannel))) RankingSystem.removeFromVoiceList(oldVoiceStateMember.id, oldVoiceStateMember.guild.id);

        if(((checkVoiceChannel(oldVoiceChannel)) && (checkVoiceChannel(newVoiceChannel))) && !RankingSystem.getVoiceList().has(newVoiceStateMember.id)) RankingSystem.addToVoiceList(newVoiceStateMember.id, newVoiceStateMember.guild.id);

    }
}