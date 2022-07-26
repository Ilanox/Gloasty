const chanceToGetStar = require('./chanceToGetStar')

module.exports = function (level) {
    chance = chanceToGetStar(level);
    return Math.floor(Math.random() * chance) + 1 == chance;
}