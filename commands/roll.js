const { config } = require('../config')
const PREFIX = config.prefix
const LOCALE = config.locale
const i18n = require("i18n");

i18n.setLocale(LOCALE);

function roll1() {
    return Math.floor(Math.random() * 101);
}

function roll2(a, b) {
    lowest = parseInt(a)
    highest = parseInt(b)
    return Math.floor(Math.random() * highest) + lowest; 
}

module.exports = {
    name: "roll",
    description: i18n.__('roll.description'),
    execute(msg) {
        var args = msg.content.trim().split(/ +/g);
        console.log(args[0] + " : " +  args[1] + " : " + args[2])
        if (msg.content.toLowerCase().startsWith(PREFIX + "roll")) {
            if (args.length > 1) {
                msg.reply(roll2(args[1], args[2]))
            } else {
                msg.reply(roll1())
            }
        }
        
    }
}