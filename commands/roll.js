const { config } = require('../config')
const PREFIX = config.prefix
const LOCALE = config.locale
const i18n = require("i18n");

i18n.setLocale(LOCALE);

function roll1() {
    return Math.floor(Math.random() * 101);
}

function roll2(a, b) {
    const lowest = parseInt(a);
    const highest = parseInt(b);
    if (isNaN(lowest) || isNaN(highest)) return 0;
    return Math.floor(Math.random() * (highest - lowest + 1)) + lowest;
}

module.exports = {
    name: "roll",
    description: i18n.__('roll.description'),
    execute(msg) {
        var args = msg.content.trim().split(/ +/g);
        if (msg.content.toLowerCase().startsWith(PREFIX + "roll")) {
            if (args.length > 1) {
                msg.reply(roll2(args[1], args[2]))
            } else {
                msg.reply(roll1())
            }
        }
        
    }
}