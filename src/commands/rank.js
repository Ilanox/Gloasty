const Discord = require('discord.js');
const { ApplicationCommandOptionType } = require("discord.js");
const { Image, createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');
const Gloasty = require('../gloasty.js')

/**
 * rank command, getting information about the user using Gloasty's original stars system.
 */

module.exports = {
	name: "rank",
	description: "Check your ranking!",
	category: "Ranking",
	options: [
        {
            name: "user",
            description: "Who is the user you want to check? (optional)",
            type: ApplicationCommandOptionType.User,
            required: false
        }
],

    run: async (interaction, client) => {

        await interaction.deferReply({ ephemeral: false })
        
        try {
            
            var MemberID;

            const userOption = interaction.options.get('user');

            if (userOption == null || userOption == undefined) MemberID = interaction.user.id
            else MemberID = userOption.value

            // -=-=-=-=-=-=-=-=-=-=-=-= | Check if user exist on the database | =-=-=-=-=-=-=-=-=-=-=-=-

            var userData = await Gloasty.user.getUserData(MemberID, interaction.guild.id);

            if (!userData || userData == null || userData == undefined) {
                await Gloasty.user.createUser(MemberID, interaction.guild.id)
                await Gloasty.cache.updateUserToChace(MemberID, interaction.guild.id)
                userData = Gloasty.user.getDefaultData(MemberID, interaction.guild.id)
            }

            var user = client.users.cache.get(MemberID);

            // -=-=-=-=-=-=-=-=-=-=-=-= | Canvas setup | =-=-=-=-=-=-=-=-=-=-=-=-

            const ImagePath = await Gloasty.ranking.canvas.getImagePath(MemberID, interaction.guild.id)
            var BackgroundImage = new Image();

            const canvas = createCanvas(2024, 693);
            const ctx = canvas.getContext('2d')

            registerFont(path.resolve("./src/assets/fonts/OpenSans-ExtraBold.ttf"), { family: 'OpenSans-ExtraBold' })

            // -=-=-=-=-=-=-=-=-=-=-=-= | Profile Picture and Background | =-=-=-=-=-=-=-=-=-=-=-=-

            const avatarImage = await loadImage(user.displayAvatarURL({ extension: "png", dynamic: true, size: 2048 }));

            BackgroundImage.onload = function() {
                ctx.drawImage(avatarImage, 68, 113, 512, 512);
                ctx.drawImage(BackgroundImage, 0, 0);
            }

            BackgroundImage.src = ImagePath;

            var fontSize;

            // -=-=-=-=-=-=-=-=-=-=-=-= | Username TEXT | =-=-=-=-=-=-=-=-=-=-=-=-

            ctx.font = "128px OpenSans-ExtraBold";
            ctx.fillStyle = "#8BA5FF";
            if (ctx.measureText(user.tag).width >= 800) fontSize = (800 / ctx.measureText(user.tag).width) * 128
            else fontSize = 128
            ctx.font = fontSize + "px OpenSans-ExtraBold";
            ctx.fillText(user.tag, 595, 260)

            if (await Gloasty.user.checkIfVerified(MemberID)) {
                const Verified = await loadImage(path.resolve("./src/assets/images/VerifiedBadge.png"));
                ctx.drawImage(Verified, ctx.measureText(user.tag).width + 605, 170, 96, 92);
            }


            // -=-=-=-=-=-=-=-=-=-=-=-= | Rank TEXT | =-=-=-=-=-=-=-=-=-=-=-=-

            var Rank = "#" + await Gloasty.cache.getRankPosition(MemberID, interaction.guild.id)

            ctx.font = "62px OpenSans-ExtraBold";
            ctx.fillStyle = "#AEAEAE";
            if (ctx.measureText(Rank).width >= 98) fontSize = (98 / ctx.measureText(Rank).width) * 62
            else fontSize = 62;
            ctx.font = fontSize + "px OpenSans-ExtraBold";
            ctx.fillText(Rank, 777, 325)

            // -=-=-=-=-=-=-=-=-=-=-=-= | Level TEXT | =-=-=-=-=-=-=-=-=-=-=-=-

            var Level = userData.Level

            ctx.font = "62px OpenSans-ExtraBold";
            ctx.fillStyle = "#AEAEAE";
            if (ctx.measureText(Level).width >= 108) fontSize = (108 / ctx.measureText(Level).width) * 62
            else fontSize = 62;
            ctx.font = fontSize + "px OpenSans-ExtraBold";
            ctx.fillText(Level, 1126, 325)
            
            // -=-=-=-=-=-=-=-=-=-=-=-= | Sending the message | =-=-=-=-=-=-=-=-=-=-=-=-

            const attachment = new Discord.AttachmentBuilder(canvas.toBuffer('image/png'), 'rank.png');

            interaction.editReply({ files: [ attachment ], ephemeral: false })
            await Gloasty.cache.updateUserToChace(MemberID, interaction.guild.id)
            
        } catch(error) {

            console.log(error);
            interaction.editReply({ content: "```Error 502, Please contant Iłanøx#2006```", ephemeral: false })

        }

    }
}



