const { GatewayIntentBits, InteractionType } = require('discord.js');
const Discord = require('discord.js')
const {readdirSync} = require('fs');
const mongoose = require('mongoose')
const {mongoPath,token,pkey,botID,testGuild,RadioToken,Music1Token,Music2Token} = require('./config.json');

const client = new Discord.Client({ intents: [GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers], partials: [Discord.Partials.GuildMember] });

const Music1 = new Discord.Client({ intents: [GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers], partials: [Discord.Partials.GuildMember] });
const Music2 = new Discord.Client({ intents: [GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers], partials: [Discord.Partials.GuildMember] });

const commandMap = {}

module.exports = { client }

function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

// ----------------------------------------------------------------------------------------------------------------------------------------------

readdirSync("./src/events/").forEach(dir => {
      
  const eventFiles = readdirSync(`./src/events/${dir}/`).filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./src/events/${dir}/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client, Music1, Music2));
  } else {  
    client.on(event.name, (...args) => event.execute(...args, client, Music1, Music2));
  }
}
})

client.on("ready", async () => {

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms)); 
    }
  
  // -----------------------------------------------------------------------------------------------------

  
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false, 
      reconnectTries: Number.MAX_VALUE,
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
  
  // -----------------------------------------------------------------------------------------------------
  
    console.log("Done loading bot!");
  
  // -----------------------------------------------------------------------------------------------------
  
    let commands = []

    const commandFiles = readdirSync('./src/commands').filter(file => file.endsWith('.js'));

    for (let file of commandFiles) {
      let c = require(`./src/commands/${file}`)
      commandMap[c.name] = c
      commands.push(c)
    }

      client.application.commands.set(commands)
  
    client.user.setActivity("Gloasty | by Edvin Studios | Type /help");

});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isSelectMenu()) {
    return
  } else if (interaction.type === InteractionType.ApplicationCommand) {

    let cmd = commandMap[interaction.commandName]
    if (cmd) {
      cmd.run(interaction, client)
    }
  }
})

client.login(token);
Music1.login(Music1Token)
Music2.login(Music2Token)