module.exports = function (user, guild) {

    data = {
        GuildID: guild,
        UserID: user,
        Stars: 0,
        Level: 1,
        Warns: new Map(),
        Punishes: new Map(),
        TotalStars: 0,
        StoreStars: 0
    }

    return data;
}