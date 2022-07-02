const userSc = require('../schema/user.js')
const main = require('../../index')


/**
 * @name advertising
 * @description Ban a user from the server
 * @param {userID} user
 * @param {ms} time
 * @param {string} reason
 * @param {guildID} guild
 */

module.exports = async function ban(user, time, reason, guild) {

    var Guild = await main.client.guilds.cache.find(guild)

    var member = await Guild.members.cache.get(user)

    if (time == "infinity") {
        member.ban({ reason: reason })
    } else {
        member.ban({ time, reason })
    }

}