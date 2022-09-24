const Discord = require("discord.js");
const Gloasty = require('../gloasty')
const { PermissionsBitField, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")

/**
 * verify command, Verify a user with Gloasty's verification system. Can only be used by Ilanox!
 */

module.exports = {
	name: "verify",
	description: "Verify user by id (Ilanox Command)",
	category: "Developing",
	options: [
        {
            name: "user",
            description: "Who you wanna verify?",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "status",
            description: "Set the status for the user",
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "true",
                    value: "true"
                },
                {
                    name: "false",
                    value: "false"
                },
            ],
            required: true
    },],
	run: async (interaction, client) => {

        const User = interaction.options.get('user').value;
        const status = interaction.options.get('status').value;

        if(interaction.user.id != "302904462123466752") return;

        var userData = await Gloasty.user.getGlobalUserData(User);

        if (!userData || userData == null || userData == undefined) await Gloasty.user.createGlobalUser(User)

        if(status == "true") Gloasty.user.setVerificationStatus(User, true)
        else Gloasty.user.setVerificationStatus(User, false)

        interaction.reply({ephemeral: true, content: `The user status with the ID ${User} were changed to **__${status}__**.`})

	}
}
