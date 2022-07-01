const fs = require('fs');
const path = require('path');

const punish = require('./src/utils/punish/punishHandler')
const user = require('./src/utils/user/loader')
const utilities = require('./src/utils/utilities/loader')

module.exports = {
    punish,
    user,
    utilities
}