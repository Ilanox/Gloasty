const Discord = require('discord.js')
const RankingSystem = require('../../functions/RankingFunctions.js')
const UserSc = require('../../Schema/user.js')

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {

        if(message.guild.id != "908015611148378112") return

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        if (message.author.bot) return
        if (message.channel.type == "dm") return

        var userData;

        await UserSc.findOne({ UserID: message.author.id, GuildID: message.guild.id }, async function (err, docs) {

            if (!docs || docs == null || docs == undefined) {
                await RankingSystem.createUser(message.author.id, message.guild.id)
                userData = { GuildID: interaction.guild.id, UserID: MemberID, Stars: 0, Level: 1, Warns: new Map(), Punishes: new Map(), TotalStars: 0, StoreStars: 0 }
            }
            userData = docs
        });

        if(userData == undefined || userData == null) return;

        if(RankingSystem.CheckIfGettingStar(userData.Level)) {
            await RankingSystem.AddStars(message.author.id, message.guild.id, 1)
            console.log("Star added to " + message.author.tag)
        }

        if(userData.TotalStars >= RankingSystem.getMaxStarsNextLevel(userData.Level)) {
            
            await RankingSystem.AddLevel(message.author.id, message.guild.id)
            await RankingSystem.RemoveStars(message.author.id, message.guild.id, userData.Stars)
            message.reply(`עלית לרמה ${userData.Level + 1}! יש לך עכשיו **${userData.StoreStars}** ⭐ לבזבוז בחנות!`)

        }

    }
}