const UserSc = require('../Schema/user.js')
var path = require("path");
const fs = require('fs');
const request = require('request');

const VoiceList = new Map();

function ChanceToGetStar(level) {
    return ~~(2.86 * Math.pow(level, 1.40) + (level * 1.5) + 50);
}

function CheckIfGettingStar(level) {
    chance = ChanceToGetStar(level);
    return Math.floor(Math.random() * chance) + 1 == chance;
}

function getMaxStarsNextLevel(level) {
    var FiveCounter = 0;
    for(var i = 1; i <= level; i++) {
        if(i % 5 == 0) FiveCounter++;
    }

    var data;

    if(level % 5 == 0) data = (level * 6) + (FiveCounter * 6)

    return (level * 6) + (FiveCounter + 6);
}

async function AddStars(user, guild, Number) {
    await UserSc.findOne({ UserID: user, GuildID: guild }, async function (err, docs) {
        
        var Stars = docs.Stars;

        Stars = Stars + Number;

        TotalStars = docs.TotalStars;

        TotalStars = TotalStars + Number;

        StoreStars = docs.StoreStars;

        StoreStars = StoreStars + Number;

        await UserSc.updateOne(
            { UserID: user},
            { $set: { Stars: Stars } }
        )

        await UserSc.updateOne(
            { UserID: user},
            { $set: { TotalStars: TotalStars } }
        )

        await UserSc.updateOne(
            { UserID: user},
            { $set: { StoreStars: StoreStars } }
        )

    });
}

async function RemoveStars(user, guild, stars) {
    await UserSc.findOne({ UserID: user, GuildID: guild }, async function (err, docs) {
        
        var Stars = docs.Stars;

        Stars = Stars - stars;

        TotalStars = docs.TotalStars;

        TotalStars = TotalStars - stars;

        StoreStars = docs.StoreStars;

        StoreStars = StoreStars - stars;

        if (Stars < 0) Stars = 0;

        if (TotalStars < 0) TotalStars = 0;

        await UserSc.updateOne(
            { UserID: user},
            { $set: { Stars: Stars } }
        )

        await UserSc.updateOne(
            { UserID: user},
            { $set: { TotalStars: TotalStars } }
        )

        await UserSc.updateOne(
            { UserID: user},
            { $set: { StoreStars: StoreStars } }
        )

    });
}

async function getLevel(user, guild) {

    let data;
    await UserSc.findOne({ UserID: user, GuildID: guild }, function (err, docs) {
        if (!docs || docs == null || docs == undefined) data = 1;

        var Level = docs.Level;
        data = Level;

    });

    return data;
}

async function checkIfUserExists(user, guild) {

    let bool;

    await UserSc.findOne({ UserID: user, GuildID: guild }, function (err, docs) {

        if (!docs || docs == null || docs == undefined) bool = false;

        bool = true;
    });

    return bool;
}

async function createUser(user, guild) {
    await UserSc.create({ GuildID: guild, UserID: user, Stars: 0, Level: 1, Warns: new Map(), Punishes: new Map(), TotalStars: 0, StoreStars: 0 });
}

async function getUserData(user, guild) {
    
    let data;
    await UserSc.findOne({ UserID: user, GuildID: guild }, function (err, docs) {
        if (!docs || docs == null || docs == undefined) data = null
        
        data = docs;
    });

    return data;
}

async function AddLevel(user, guild) {
    await UserSc.findOne({ UserID: user, GuildID: guild }, async function (err, docs) {
            var Level = docs.Level;
            Level = Level + 1;
            await UserSc.updateOne({ UserID: user }, { $set: { Level: Level } });
    });
}

async function RemoveLevel(user, guild) {

    await UserSc.findOne({ UserID: user, GuildID: guild }, async function (err, docs) {
        
        var Level = docs.Level;
        Level = Level - 1;
        if(Level < 1) Level = 1;
        await UserSc.updateOne({ UserID: user }, { $set: { Level: Level } });

    });
}

async function getStars(user, guild) {

    let data;
    await UserSc.findOne({ UserID: user, GuildID: guild }, function (err, docs) {
        if (!docs || docs == null || docs == undefined) data = 0;

        var Stars = docs.Stars;
        data = Stars;

    });
    return data;
}


// -=-=-=-=-=-=-=-=-=-=-=-= | Voice Channels | =-=-=-=-=-=-=-=-=-=-=-=-

async function addToVoiceList(user, guild) {
    if(VoiceList.has(user)) return;
    VoiceList.set(user, guild);
}

function getVoiceList() {
    return VoiceList;
}

async function removeFromVoiceList(user, guild) {
    if(!VoiceList.has(user)) return;
    VoiceList.delete(user);
}

function checkIfEligibleForStar(VoiceMember) {

    var MembersInVoice = 0;

    for(const i of VoiceMember.voice.channel.members) {

        const Member = i[1];

        if(Member.user.bot) return;
        if(Member.voice.selfMute || Member.voice.selfDeaf || Member.voice.serverDeaf || Member.voice.serverMute) return;

        MembersInVoice++;
    }

    if(MembersInVoice != 0 && MembersInVoice != 1 && !VoiceMember.voice.selfMute && !VoiceMember.voice.selfDeaf && !VoiceMember.voice.serverDeaf && !VoiceMember.voice.serverMute) return true

    else return false;

}

// -=-=-=-=-=-=-=-=-=-=-=-= | Canvas | =-=-=-=-=-=-=-=-=-=-=-=-

async function getImagePath(user, guild) {

    let data;
    let starsNumber;
    await UserSc.findOne({ UserID: user, GuildID: guild }, function (err, docs) {

        if (!docs || docs == null || docs == undefined) {
            createUser(user, guild);
            data = { GuildID: guild, UserID: user, Stars: 0, Level: 1, Warns: new Map(), Punishes: new Map(), TotalStars: 0 };
        }

        else data = docs;
        
    });

    var level = await getLevel(user, guild);

    if(level % 5 == 0) starsNumber = 12;
    else starsNumber = 6;

    return path.resolve("./src/Images/RankCard" + starsNumber + "/Rank-" + data.Stars + ".png");

}

async function FindPositionByStars(user, guild) {

    var userPosition;
    
    const docs = await UserSc.find({ GuildID: guild }).sort({TotalStars: 0});

    var position = 0;

    for(const i of docs) {
        if(i.UserID == user) {
            console.log(position)
            userPosition = position;
        } 
        position++;
    }

    userPosition = docs.length - userPosition;

    console.log(userPosition)

    return userPosition;

}

module.exports = {
    ChanceToGetStar,
    CheckIfGettingStar,
    getMaxStarsNextLevel,
    AddStars,
    RemoveStars,
    getLevel,
    checkIfUserExists,
    createUser,
    getUserData,
    AddLevel,
    RemoveLevel,
    getStars,
    addToVoiceList,
    removeFromVoiceList,
    getVoiceList,
    checkIfEligibleForStar,
    getImagePath,
    FindPositionByStars
};