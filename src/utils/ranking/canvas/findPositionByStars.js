const UserSc = require('../../../Schema/user.js')
var path = require("path");

module.exports = async function (user, guild) {

    var userPosition;
    
    const docs = await UserSc.find({ GuildID: guild }).sort({TotalStars: 0});

    var position = 0;

    for(const i of docs) {
        if(i.UserID == user) {
            userPosition = position;
        } 
        position++;
    }

    userPosition = docs.length - userPosition;

    return userPosition;

}