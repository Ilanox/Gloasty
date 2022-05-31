function ChanceToGetStar(level) {
    return ~~(2.86 * Math.pow(level, 1.40) + (level * 1.5) + 50);
}

function CheckIfGettingStar(level) {
    chance = ChanceToGetStar(level);
    return Math.floor(Math.random() * chance) + 1 == chance;
}

module.exports = {
    ChanceToGetStar,
    CheckIfGettingStar 
};