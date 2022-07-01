const fs = require('fs');
const path = require('path');
const { importer } = require('./src/functions/importer.js')

const punish = importer('./src/functions/punish');
const punishTypes = importer('./src/functions/punishTypes');
const user = importer("./src/functions/user")
const ranking = importer('./src/functions/ranking')

module.exports = {
    punish,
    punishTypes,
    user
}