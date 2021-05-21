const { config, numbers, bars, embed } = require('../config')
const Discord = require('discord.js')
const PREFIX = config.prefix
const LOCALE = config.locale
const i18n = require("i18n");
const splitargs = require('splitargs')
const { getNumbers, test } = require('../scripts')

i18n.setLocale(LOCALE);

module.exports = {
    name: "poll",
    description: i18n.__('poll.description'),
    execute(msg) {
        var args = splitargs(msg.content)
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
                const pollEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(args[1])
                    .setDescription(str)
                    .setThumbnail(embed.thumbnail)
                    .setTimestamp()
                    .setFooter(embed.footer, embed.glados);
                msg.reply(pollEmbed).then(embedMessage => {
                    var lines = str.split(/\r\n|\r|\n/)
                    lines.forEach(line => {
                        for (const key in numbers) {
                            if (line.charAt(0) === `${numbers[key]}`) {
                                embedMessage.react(`${key}`);
                            }
                        }
                    })

                    const filter = (reaction, user) => reaction.emoji.name === '1️⃣' && user.id === msg.author.id
                    const collector = embedMessage.createReactionCollector(filter, { max: 0, time: 0 }); // 5 min

                    collector.on('collect', () => {
                        console.log(getNumbers())
                        console.log(test('1'))
                    })

                })
            } else {
                msg.reply('You need to provide a question, at least 2 options and at most 9.')
            }
        }
    }
}