const Discord = require('discord.js')
const {readdirSync} = require('fs');
const mongoose = require('mongoose')
const {mongoPath,token,pkey,botID,testGuild,RadioToken} = require('./config.json');

const client = new Discord.Client({intents: [ 'GUILD_VOICE_STATES', 'GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MEMBERS', 'GUILD_EMOJIS_AND_STICKERS'], partials: ['GUILD_MEMBER']});


const commandMap = {}

const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));

function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

// ----------------------------------------------------------------------------------------------------------------------------------------------

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

client.on("ready", () => {

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
  
  
    let commandss = []
  
    readdirSync("./commands/").forEach(dir => {
      
      const commandFiles = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
  
      for (let file of commandFiles) {
        let c = require(`./commands/${dir}/${file}`)
        commandMap[c.name] = c
        commandss.push(c)
      }
      client.guilds.cache.get(testGuild).commands.set(commandss)
    });
  
    console.log(commandss)
  
    async function Status() {
        while(true) {
            client.user.setActivity("Gloasty | by Edvin Studios"); 
            await sleep(30000)
            client.user.setActivity("Gloasty | /help"); 
            await sleep(30000)
        }
    } Status()

  
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isSelectMenu()) {
    console.log(interaction)
    return
  } else if (interaction.isCommand()) {
    console.log(interaction)

    let cmd = commandMap[interaction.commandName]
    if (cmd) {
      cmd.run(interaction, client)
    }
  }
})

client.login(token);