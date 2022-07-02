const userSc = require('../schema/user.js')
const main = require('../../index')


/**
 * @name advertising
 * @description Timeout user from using chat channels
 * @param {userID} user
 * @param {ms} time
 * @param {string} reason
 * @param {guildID} guild
 */

module.exports = async function timeout(user, time, reason, guild) {

    var Guild = await main.client.guilds.cache.get(guild)

    var member = await Guild.members.cache.get(user)

    member.timeout(time, reason)

}