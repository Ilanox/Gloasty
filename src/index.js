const { GatewayIntentBits, InteractionType } = require('discord.js');
const Discord = require('discord.js')
const { readdirSync } = require('fs');
const mongoose = require('mongoose')
const Gloasty = require('./gloasty')
const { mongoPath, token, testGuild} = require('../config.json');

const client = new Discord.Client({ intents: [GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers], partials: [Discord.Partials.GuildMember] });

const commandMap = {}

module.exports = { client }

// ----------------------------------------------------------------------------------------------------------------------------------------------

console.log()

readdirSync(__dirname + "/events").forEach(dir => {
    const eventFiles = readdirSync(`${__dirname}/events/${dir}/`).filter(file => file.endsWith(".js"));

    for (const file of eventFiles) {
        const event = require(`${__dirname}/events/${dir}/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }

})

client.on("ready", async () => {
  
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false, 
      reconnectTries: 5,
      reconnectInterval: 500,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    };
  
    mongoose.connect(
      mongoPath,
      dbOptions
    );

    mongoose.Promise = global.Promise;
  
    mongoose.connection.on("connected", () => {
      console.log("Mongoose has successfully connected!");
    });
  
    mongoose.connection.on("err", err => {
      console.error(`Mongoose connection error: \n${err.stack}`);
    });
  
    mongoose.connection.on("disconnected", () => {
      console.warn("Mongoose connection lost");
    });

    console.log("Done loading bot!");

    let commands = []

    const commandFiles = readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      let command = require(__dirname + `/commands/${file}`)
      commandMap[command.name] = command
      commands.push(command)
    }

    client.application.commands.set(commands)
  
    client.user.setActivity("Gloasty | by Edvin Studios | Type /help");

    await Gloasty.cache.loadCacheFromDatabase(client)

});

client.on('interactionCreate', async (interaction) => {

  if (interaction.isButton()) {
    return
  } else if (interaction.type === InteractionType.ApplicationCommand) {

    let cmd = commandMap[interaction.commandName]
    if (cmd) {
      cmd.run(interaction, client)
    }
  }
})

client.login(token);