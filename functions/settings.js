const settings = require('../Schema/settings.js')

async function setQueue1(channelID, link, skip, time) {
    await Queue1.updateMany(
        { 
        clientID: "889899959346925638"
        },
        {
         channelID: channelID,
         skip: skip,
         songURL: link,
         time: time,
        }
    )
}

module.exports = { setQueue1, };