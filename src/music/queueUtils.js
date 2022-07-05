var QueueList = [];

function createQueueItem(user, guild, player, songURL) {

    var item = {
        GuildID: guild,
        PlayerID: player,
        UserID: user,
        SongURL: songURL,
        Timestamp: new Date().getTime()
    }

    return item;

}

function addItemToQueue(item) {

    QueueList.push(item)

}

function getQueueByGuild(guild) {

    const guildQueue = QueueList.filter(item => {return item.GuildID == guild});

    const sortedQueue = guildQueue.sort((a, b) => a.Timestamp - b.Timestamp);

    return sortedQueue

}

function getGuildsInQueue() {

    var guildsArray = []

    QueueList.forEach((item) => {

        if(guildsArray.includes(item.GuildID)) return

        guildsArray.push(item.GuildID)

    });

    return guildsArray;

}

function removeItemFromQueue(item) {

    guildQueue = getQueueByGuild(item.GuildID)

    guildQueue = guildQueue.filter(itm => {return itm.Timestamp !== itm.Timestamp})

    QueueList = QueueList.filter(guild => {return guild.GuildID !== item.GuildID});

    guildQueue.forEach( (song) => QueueList.push(song) );

}

module.exports = { createQueueItem, addItemToQueue, getGuildsInQueue, getQueueByGuild, removeItemFromQueue }