const userSc = require('../../schema/user.js')
var path = require("path");

module.exports = async function (user, guild) {

    var userPosition;
    
    const docs = await userSc.find({ GuildID: guild }).sort({TotalStars: 0});

    sortedData = docs.sort((a, b) => b.TotalStars - a.TotalStars);

    var position = 0;

    for(const i of sortedData) {
        if(i.UserID == user) {
            userPosition = position;
        } 
        position++;
    }

    userPosition = userPosition + 1                                

    return userPosition;

}