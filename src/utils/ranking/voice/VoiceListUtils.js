const UserSc = require('../../../Schema/user.js')
var path = require("path");

const VoiceList = new Map();

async function addToVoiceList(user, guild) {
    if(VoiceList.has(user)) return;
    VoiceList.set(user, guild);
}

function getVoiceList() {
    return VoiceList;
}

async function removeFromVoiceList(user, guild) {
    if(!VoiceList.has(user)) return;
    VoiceList.delete(user);
}

module.exports = { addToVoiceList, getVoiceList, removeFromVoiceList }