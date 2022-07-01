const UserSc = require('../../Schema/user.js')
const ms = require('ms')
const main = require('../../../index')

module.exports = async function kick(user, reason, guild) {

    console.log(main.client)

    var Guild = await main.client.guilds.cache.get(guild)

    var member = await Guild.members.cache.get(user)

    member.kick(reason)

}