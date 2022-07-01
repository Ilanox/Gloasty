    
const Gloasty = require('../../gloasty')

module.exports = async function (user, guild, rule) {

    let level;
    let secondReason;

    if (rule == "spam") {
        let punish = await Gloasty.punishTypes.spam(user, guild);
        level = punish.level;
        secondReason = "ספאם";
    } else if (rule == "voice") {
        let punish = await Gloasty.punishTypes.voiceAbuse(user, guild);
        level = punish.level;
        secondReason = "שימוש לרעה בוויס";
    } else if (rule == "insult") {
        let punish = await Gloasty.punishTypes.insult(user, guild);
        level = punish.level;
        secondReason = "פגיעה בחבר שרת";
    } else if (rule == "advertising") {
        let punish = await Gloasty.punishTypes.advertising(user, guild);
        level = punish.level;
        secondReason = "פרסום";
    } else if (rule == "raid") {
        let punish = await Gloasty.punishTypes.raid(user, guild);
        level = punish.level;
        secondReason = "רייד";
    } else if (rule == "disrespect") {
        let punish = await Gloasty.punishTypes.disrespect(user, guild);
        level = punish.level;
        secondReason = "פגיעה בחבר צוות";
    } else if (rule == "nsfw") {
        let punish = await Gloasty.punishTypes.nsfw(user, guild);
        level = punish.level;
        secondReason = "פרסום פורנוגרפיה";
    } else if (rule == "bug") {
        let punish = await Gloasty.punishTypes.bugAbuse(user, guild);
        level = punish.level;
        secondReason = "ניצול באגים";
    }

    return {
        level: level,
        reason: secondReason
    }
}
    