const main = require('../../index')


/**
 * @name advertising
 * @description kick a user from the server
 * @param {userID} user
 * @param {string} reason
 * @param {guildID} guild
 */


module.exports = async function kick(user, reason, guild) {

    var Guild = await main.client.guilds.cache.get(guild)

    var member = await Guild.members.cache.get(user)

    member.kick(reason)

}