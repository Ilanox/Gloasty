const settings = require('../Schema/settings.js')

async function setLogChannel(GuildID, LogID) {
    await settings.updateMany(
        { 
        GuildID: GuildID
        },
        {
            LogsChannel: LogID
        }
    )
}

async function setWelcomeChannel(GuildID, WelcomeID) {
    await settings.updateMany(
        { 
        GuildID: GuildID
        },
        {
            WelcomeChannel: WelcomeID
        }
    )
}

module.exports = { setLogChannel, setWelcomeChannel };