const Discord = require('discord.js');
const { Image, createCanvas, loadImage, registerFont } = require('canvas');
const RankingSystem = require('../../functions/RankingFunctions');
const path = require('path');
const fs = require('fs')
const request = require('request');
const UserSc = require('../../Schema/user.js')

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var download = async function(uri, filename, callback) {
    request.head(uri, async function(err, res, body) {
  
      await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);

    });
};

module.exports = {
	name: "rank",
	description: "Check your ranking!",
	category: "Ranking",
	options: [
        {
            name: "user",
            description: "Who is the user you want to check? (optional)",
            type: "USER",
            required: false
    }
],

    run: async (interaction, client) => {

        await interaction.deferReply({ ephemeral: false })
        
        try {
            
            var MemberID;

            var BackgroundImage = new Image();

            const userOption = interaction.options.get('user');

            if (userOption == null || userOption == undefined) MemberID = interaction.user.id
            else MemberID = userOption.value

            var userData;

            await UserSc.findOne({ UserID: MemberID, GuildID: interaction.guild.id }, async function (err, docs) {

                if (!docs || docs == null || docs == undefined) {
                    await RankingSystem.createUser(MemberID, interaction.guild.id)
                    userData = { GuildID: interaction.guild.id, UserID: MemberID, Stars: 0, Level: 1, Warns: new Map(), Punishes: new Map(), TotalStars: 0, StoreStars: 0 }
                    return;
                }
                userData = docs
            });

            var user = client.users.cache.get(MemberID);

            const ImagePath = await RankingSystem.getImagePath(MemberID, interaction.guild.id)

            const canvas = createCanvas(2024, 693);
            const ctx = canvas.getContext('2d')

            registerFont(path.resolve("./src/Fonts/OpenSans-ExtraBold.ttf"), { family: 'OpenSans-ExtraBold' })

            console.log(user.displayAvatarURL({ format: 'png', dynamic: true, size: 512 }))

            // -=-=-=-=-=-=-=-=-=-=-=-= | Profile Picture and Background | =-=-=-=-=-=-=-=-=-=-=-=-

            const avatarImage = await loadImage(user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }));

            BackgroundImage.onload = function() {
                ctx.drawImage(avatarImage, 68, 113, 512, 512);
                ctx.drawImage(BackgroundImage, 0, 0);
            }

            BackgroundImage.src = ImagePath;

            var fontSize;

            // -=-=-=-=-=-=-=-=-=-=-=-= | Username TEXT | =-=-=-=-=-=-=-=-=-=-=-=-

            ctx.font = "128px OpenSans-ExtraBold";
            ctx.fillStyle = "#8BA5FF";
            if(ctx.measureText(user.tag).width >= 800) fontSize = (800 / ctx.measureText(user.tag).width) * 128
            else fontSize = 128
            ctx.font = fontSize + "px OpenSans-ExtraBold";
            ctx.fillText(user.tag, 595, 260)

            // -=-=-=-=-=-=-=-=-=-=-=-= | Rank TEXT | =-=-=-=-=-=-=-=-=-=-=-=-

            var Rank = "#" + await RankingSystem.FindPositionByStars(MemberID, interaction.guild.id)

            ctx.font = "62px OpenSans-ExtraBold";
            ctx.fillStyle = "#AEAEAE";
            if(ctx.measureText(Rank).width >= 98) fontSize = (98 / ctx.measureText(Rank).width) * 62
            else fontSize = 62;
            ctx.font = fontSize + "px OpenSans-ExtraBold";
            ctx.fillText(Rank, 777, 325)

            // -=-=-=-=-=-=-=-=-=-=-=-= | Rank TEXT | =-=-=-=-=-=-=-=-=-=-=-=-

            var Level = userData.Level

            ctx.font = "62px OpenSans-ExtraBold";
            ctx.fillStyle = "#AEAEAE";
            if(ctx.measureText(Level).width >= 108) fontSize = (108 / ctx.measureText(Level).width) * 62
            else fontSize = 62;
            ctx.font = fontSize + "px OpenSans-ExtraBold";
            ctx.fillText(Level, 1126, 325)

            const attachment = new Discord.MessageAttachment(canvas.toBuffer('image/png'), 'rank.png');

            interaction.editReply({ files: [ attachment ], ephemeral: false })
            
        } catch(error) {

            console.log(error);
            interaction.editReply({ content: "```Error 502, Please contant Iłanøx#2006```", ephemeral: false })

        }

        

    }
}



