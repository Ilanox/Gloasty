const UserSc = require('../../Schema/user.js')
const ms = require('ms')
const main = require('../../../index')

module.exports = async function ban(user, time, reason, guild) {

    console.log(main.client)

    var Guild = await main.client.guilds.cache.find(guild)

    var member = await Guild.members.cache.get(user)

    if (time == "infinity") {
        member.ban({ reason: reason })
    } else {
        member.ban({ time, reason })
    }

}