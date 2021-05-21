const { config, numbers } = require('../config')
const Discord = require('discord.js')
const PREFIX = config.prefix
const LOCALE = config.locale
const i18n = require("i18n");

i18n.setLocale(LOCALE);

module.exports = {
    name: "poll",
    description: i18n.__('poll.description'),
    execute(msg) {
        var myMsg = msg.content
        var myRegexp = /[^\s"]+|"([^"]*)"/gi;
        var args = myRegexp.exec(myMsg)
        if (msg.content.toLowerCase().startsWith(PREFIX + "poll")) {
            console.log(args)
            msg.reply('This command is not ready yet.')
            if (args.length > 2 && args.length < 12) {
                var str = ''
                var count = 0;
                for (var i = 2; i < args.length; i++) {
                    count++;
                    str += '\n' + count + ". " + args[i]
                }
                const Embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(args[1])
                    .setDescription(str)
                    .setTimestamp()
                    .setFooter('Brought to you by GLaDOS', 'https://i.imgur.com/OsnSOeR.png');
                msg.reply(Embed).then(embedMessage => {
                    var lines = str.split(/\r\n|\r|\n/)
                    lines.forEach(line => {
                        for (const key in numbers) {
                            if (line.charAt(0) === `${numbers[key]}`) {
                                embedMessage.react(`${key}`);
                            }
                        }
                    })
                })
            } else {
                msg.reply('You need to provide a question, at least 2 options and at most 9.')
            }
        }
    }
}