const UserSc = require('../../Schema/user.js')
var path = require("path");

module.exports = function (level) {
    chance = ChanceToGetStar(level);
    return Math.floor(Math.random() * chance) + 1 == chance;
}