const {MessageButton,EmbedBuilder,MessageSelectMenu,DiscordAPIError, ApplicationCommandOptionType} = require("discord.js");
const Discord = require("discord.js")
const fetch = require('node-fetch')

/**
 * Activity command, a command that displays all the games available on Discord.
 */

module.exports = {
	name: "activity",
	description: "Play discord games with your friend! (You need to be in a voice!)",
	category: "Activity",
	options: [
        {
            name: "activity",
            description: "What game whould you like to play?",
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "Watch together", // Youtube watch together.
                    value: "880218394199220334"
                },
                {
                    name: "Poker Night", // Poker Night game with 6 people
                    value: "755827207812677713"
                },
                {
                    name: "Chess In The Park", // Chess game for 2 people
                    value: "832012774040141894"
                },
                {
                    name: "Sketch Heads", // skribbl.io but by discord
                    value: "902271654783242291"
                },
                {
                    name: "Letter League", // Making words using letters? Not sure but sounds nice..
                    value: "879863686565621790"
                },
                {
                    name: "Word Snacks", // Again, Making words using letters, Discord aren't so original
                    value: "879863976006127627"
                },
                {
                    name: "SpellCast", // SpellCast is a multiplayer word game where each player takes turns attempting to find words in sequences of adjacent letters.
                    value: "852509694341283871"
                },
                {
                    name: "Checkers In The Park", // Basiclly checkers in discord
                    value: "832013003968348200"
                },
                {
                    name: "Blazing 8s", // Uno but cool and in discord
                    value: "832025144389533716"
                },
            ],
            required: true
        },
    ],
	run: async (interaction, client) => {

        const Guild = client.guilds.cache.get(interaction.guild.id);

		const member = Guild.members.cache.get(interaction.user.id);
		let channel = member.voice.channel;
		if (!channel) return interaction.reply({
			ephemeral: true,
			content: "You need to be in a voice to use this command!"
		})

        async function Game (value) {

            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
				method: "POST",
				body: JSON.stringify({
					max_age: 86400,
					max_uses: 0,
					target_application_id: value,
					target_type: 2,
					temporary: false,
					validate: null
				}),
				headers: {
					"Authorization": `Bot ${client.token}`,
					"Content-Type": "application/json"
				}
			})

			.then(res => res.json())
			.then(async invite => {
				if (!invite.code) return interaction.reply("Something went wrong!")
				const e = new EmbedBuilder()
                    .setTitle("Activity is Ready!")
					.setDescription(`[Click here to Play the Activity in #${channel.name}](https://discord.com/invite/${invite.code})`)
				interaction.reply({
                    ephemeral: true,
					embeds: [e],
					components: []
				})
			})
        }
        const gameID = interaction.options.get('activity').value;


        Game(gameID)

		
	}
}
