const UserSc = require('../Schema/user.js')
const ms = require('ms')
const { client } = require("../index.js");

async function Timeout(user, time, reason, guild) {

    var Guild = await client.guilds.cache.get(guild)

    var member = await Guild.members.cache.get(user)

    member.timeout(time, reason)

}

async function Ban(user, time, reason, guild) {

    var Guild = await client.guilds.cache.get(guild)

    var member = await Guild.members.cache.get(user)

    if(time == "infinity") {
        member.ban({ reason: reason })
    } else {
        member.ban({ time, reason })
    }

}

async function Kick(user, reason, guild) {

    var Guild = await client.guilds.cache.get(guild)


    var member = await Guild.members.cache.get(user)

    member.kick(reason)

}

async function Warn(user, reason, guild) {

    var Guild = await client.guilds.cache.get(guild)

    var member = await Guild.members.cache.get(user)

    await UserSc.findOne({UserID: user}, async function (err, docs) {

        if(!docs || docs == null || docs == undefined) {
            await UserSc.create({Guild: guild, UserID: user, XP: 0, Level: 1, Warns: new Map(), Punishes: new Map()})
        }
        await UserSc.findOne({UserID: user}, async function (err, data) {

            var WarnsMap = data.Warns
            if(!WarnsMap.get(reason)) {
                WarnsMap.set(reason, 1)
            } else {
                var reasonNum = parseInt(WarnsMap.get(reason)) + 1 
                WarnsMap.set(reason, reasonNum.toString())
            }

            await UserSc.updateOne(
                { UserID: user},
                { $set: { Warns: WarnsMap } }
            )

            member.user.send(`You were warned on the server "**${Guild.name}**".\nReason: ${reason}`)
            
        })
        
    }) 

}



module.exports = {
   Timeout,
   Ban,
   Kick,
   Warn,
};