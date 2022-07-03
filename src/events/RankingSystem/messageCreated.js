const Discord = require('discord.js')
const Gloasty = require('../../../gloasty')
const userSc = require('../../schema/user.js')

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {

        if(message.guild.id != "908015611148378112") return

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        if (message.author.bot) return
        if (message.channel.type == "dm") return

        var userData = await Gloasty.user.getUserData(message.author.id, message.guild.id)

        if (!userData || userData == null || userData == undefined) {
            await Gloasty.user.createUser(message.author.id, message.guild.id)
            userData = Gloasty.user.getDefaultData(message.author.id, message.guild.id)
        }

        if(userData == undefined || userData == null) return;

        if(Gloasty.ranking.checkIfGettingStar(userData.Level)) {
            await Gloasty.ranking.addStars(message.author.id, message.guild.id, 1)
            console.log("Star added to " + message.author.tag)
        }

        if(userData.TotalStars >= Gloasty.ranking.getMaxStars(userData.Level)) {
            
            await Gloasty.ranking.addLevel(message.author.id, message.guild.id)
            await Gloasty.ranking.removeStars(message.author.id, message.guild.id, await Gloasty.ranking.getStars(message.author.id, message.guild.id))
            message.reply(`עלית לרמה ${userData.Level + 1}! יש לך עכשיו **${userData.StoreStars}** ⭐ לבזבוז בחנות!`)

        }

    }
}