const userSc = require('../schema/user.js')
const chanceToGetStar = require('./chanceToGetStar')
var path = require("path");

module.exports = function (level) {
    chance = chanceToGetStar(level);
    return Math.floor(Math.random() * chance) + 1 == chance;
}