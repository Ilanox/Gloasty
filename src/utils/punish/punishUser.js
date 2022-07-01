    
const Gloasty = require('../../../gloasty')

module.exports = async function (user, guild, rule) {

    let level;
    let secondReason;

    if (rule == "spam") {
        let punish = await Gloasty.punish.types.spam(user, guild);
        level = punish.level;
        secondReason = "ספאם";
    } else if (rule == "voice") {
        let punish = await Gloasty.punish.types.voiceAbuse(user, guild);
        level = punish.level;
        secondReason = "שימוש לרעה בוויס";
    } else if (rule == "insult") {
        let punish = await Gloasty.punish.types.insult(user, guild);
        level = punish.level;
        secondReason = "פגיעה בחבר שרת";
    } else if (rule == "advertising") {
        let punish = await Gloasty.punish.types.advertising(user, guild);
        level = punish.level;
        secondReason = "פרסום";
    } else if (rule == "raid") {
        let punish = await Gloasty.punish.types.raid(user, guild);
        level = punish.level;
        secondReason = "רייד";
    } else if (rule == "disrespect") {
        let punish = await Gloasty.punish.types.disrespect(user, guild);
        level = punish.level;
        secondReason = "פגיעה בחבר צוות";
    } else if (rule == "nsfw") {
        let punish = await Gloasty.punish.types.nsfw(user, guild);
        level = punish.level;
        secondReason = "פרסום פורנוגרפיה";
    } else if (rule == "bug") {
        let punish = await Gloasty.punish.types.bugAbuse(user, guild);
        level = punish.level;
        secondReason = "ניצול באגים";
    }

    return {
        level: level,
        reason: secondReason
    }
}
    