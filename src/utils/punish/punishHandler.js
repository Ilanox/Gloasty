const ban = require('./ban')
const kick = require('./kick')
const timeout = require('./timeout')
const warn = require('./warn')
const types = require('../punishTypes/loader')

module.exports = { types, warn, timeout, kick, ban }