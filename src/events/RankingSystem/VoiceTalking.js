const Gloasty = require('../../gloasty')

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldVoiceStateMember, newVoiceStateMember, client) {
        
        const oldVoiceChannel = oldVoiceStateMember.channelId;
        const newVoiceChannel = newVoiceStateMember.channelId;

        if ((!Gloasty.ranking.voice.checkVoiceChannel(oldVoiceChannel)) && (Gloasty.ranking.voice.checkVoiceChannel(newVoiceChannel))) Gloasty.ranking.voice.addToVoiceList(newVoiceStateMember.id, newVoiceStateMember.guild.id);

        if ((Gloasty.ranking.voice.checkVoiceChannel(oldVoiceChannel)) && (!Gloasty.ranking.voice.checkVoiceChannel(newVoiceChannel))) Gloasty.ranking.voice.removeFromVoiceList(oldVoiceStateMember.id, oldVoiceStateMember.guild.id);

        if (((Gloasty.ranking.voice.checkVoiceChannel(oldVoiceChannel)) && (Gloasty.ranking.voice.checkVoiceChannel(newVoiceChannel))) && !Gloasty.ranking.voice.getVoiceList().has(newVoiceStateMember.id)) Gloasty.ranking.voice.addToVoiceList(newVoiceStateMember.id, newVoiceStateMember.guild.id);

    }
}