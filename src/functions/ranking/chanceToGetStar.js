const UserSc = require('../../Schema/user.js')
var path = require("path");

module.exports = function (level) {
    return ~~(2.86 * Math.pow(level, 1.40) + (level * 1.5) + 50);
}