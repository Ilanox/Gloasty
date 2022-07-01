const canvas = require('./canvas/loader')
const voice = require('./voice/loader')

const addLevel = require('./addLevel')
const addStars = require('./addStars')
const chanceToGetStar = require('./chanceToGetStar')
const checkIfGettingStar = require('./checkIfGettingStar')
const getLevel = require('./getLevel')
const getMaxStars = require('./getMaxStars')
const getStars = require('./getStars')
const removeStars = require('./removeStars')
const removeLevel = require('./removeLevel')

module.exports = { canvas, voice, addLevel, addStars, checkIfGettingStar, chanceToGetStar, getLevel, getMaxStars, getStars, removeLevel, removeStars }
