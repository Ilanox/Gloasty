const userSc = require('../../schema/user.js')
var path = require("path");

module.exports = function (VoiceMember) {

    var MembersInVoice = 0;

    for(const i of VoiceMember.voice.channel.members) {

        const Member = i[1];

        if(Member.user.bot) return;
        if(Member.voice.selfMute || Member.voice.selfDeaf || Member.voice.serverDeaf || Member.voice.serverMute) return;

        MembersInVoice++;
    }

    if(MembersInVoice != 0 && MembersInVoice != 1 && !VoiceMember.voice.selfMute && !VoiceMember.voice.selfDeaf && !VoiceMember.voice.serverDeaf && !VoiceMember.voice.serverMute) return true

    else return false;

}