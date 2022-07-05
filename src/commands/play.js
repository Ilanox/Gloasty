const Discord = require("discord.js");
const Gloasty = require('../../gloasty')

module.exports = {
	name: "play",
	description: "Play a song with Gloasty",
	category: "Music",
	options: [
        {
            name: "query",
            description: "Enter song name or url",
            type: "STRING",
            required: true
        }
    ],
	run: async (interaction, client) => {

        const query = interaction.options.get('query');

        const queryItem = Gloasty.music.createQueueItem(interaction.user.id, interaction.guild.id, "929730084330414141", query.value)

        Gloasty.music.addItemToQueue(queryItem);

	}
}
