const Gloasty = require('../../gloasty')

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {

        if (message.author.bot) return
        if (message.channel.type == "dm") return

        var userData = await Gloasty.user.getUserData(message.author.id, message.guild.id)

        if (!userData || userData == null || userData == undefined) {
            await Gloasty.user.createUser(message.author.id, message.guild.id)
            userData = Gloasty.user.getDefaultData(message.author.id, message.guild.id)
        }

        if (userData == undefined || userData == null) return;

        Gloasty.quests.addMessageData(message.author.id, message.guild.id, 1)

        if (Gloasty.ranking.checkIfGettingStar(userData.Level, "message")) {
            await Gloasty.ranking.addStars(message.author.id, message.guild.id, 1)
            console.log("Star added to " + message.author.tag)
            await Gloasty.cache.updateUserToChace(message.author.id, message.guild.id)
        }

        if (userData.Level % 5 != 0) {
            if (userData.Stars >= 6) {
                await Gloasty.ranking.addLevel(message.author.id, message.guild.id)
                await Gloasty.ranking.removeStars(message.author.id, message.guild.id, await Gloasty.ranking.getStars(message.author.id, message.guild.id))
                message.reply(`You have reached level **${userData.Level + 1}**! You now have **${userData.StoreStars}** ⭐ to use at the store`);
                await Gloasty.cache.updateUserToChace(message.author.id, message.guild.id)
            }
        } else if (userData.Stars >= 12) {
            await Gloasty.ranking.addLevel(message.author.id, message.guild.id)
            await Gloasty.ranking.removeStars(message.author.id, message.guild.id, await Gloasty.ranking.getStars(message.author.id, message.guild.id))
            message.reply(`You have reached level **${userData.Level + 1}**! You now have **${userData.StoreStars}** ⭐ to use at the store`);
            await Gloasty.cache.updateUserToChace(message.author.id, message.guild.id)
        }

    }
}