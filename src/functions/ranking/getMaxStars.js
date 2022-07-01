const UserSc = require('../../Schema/user.js')
var path = require("path");

module.exports = function (level) {
    var FiveCounter = 0;
    for(var i = 1; i <= level; i++) {
        if(i % 5 == 0) FiveCounter++;
    }

    var data;

    if(level % 5 == 0) data = (level * 6) + (FiveCounter * 6)

    return (level * 6) + (FiveCounter + 6);
}