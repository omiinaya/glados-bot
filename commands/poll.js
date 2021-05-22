const { config, numbers, bars, embed } = require('../config')
const Discord = require('discord.js')
const PREFIX = config.prefix
const LOCALE = config.locale
const i18n = require("i18n");
const splitargs = require('splitargs')
const { getNumbers, getTimeLeft, msToTime, progressBar } = require('../scripts');

i18n.setLocale(LOCALE);

module.exports = {
    name: "poll",
    description: i18n.__('poll.description'),
    execute(msg) {
        var args = splitargs(msg.content)
        var timer = args[2] * 60 * 1000 //x minutes
        if (msg.content.toLowerCase().startsWith(PREFIX + "poll")) {
            msg.reply('This command is not ready yet.')
            if (args.length > 4 && args.length < 12) {
                var str = ''
                var count = 0;
                for (var i = 3; i < args.length; i++) {
                    count++;
                    str += '\n' + count + ". " + args[i]
                }
                const pollEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(args[1])
                    .setDescription(str)
                    .setThumbnail(embed.glados)
                    .setTimestamp()
                    .setFooter(embed.footer + '  •  ' + msToTime(timer), embed.thumbnail);
                msg.reply(pollEmbed).then(embedMessage => {
                    getTimeLeft(timer, embedMessage, msg, pollEmbed, timer, removeReactions)
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

function removeReactions(embedMessage, msg) {
    var results = {}
    var total = 0
    var str = ''
    embedMessage.reactions.cache.some(reaction => {
        if (getNumbers().includes(reaction.emoji.name)) {
            results[reaction.emoji.name] = reaction.count
            total += reaction.count
        }
    })
    for (const key in results) {
        results[key] -= 1
    }
    var count = 0
    var realTotal = total - 4
    for (const key in results) {
        count++
        str += '\n' + `${key}` + " : " + progressBar(`${results[key]}`, realTotal)
    }
    const resultEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Results: ')
        .setDescription(str)
        .setThumbnail(embed.glados)
        .setTimestamp()
        .setFooter(embed.footer, embed.thumbnail);
    msg.reply(resultEmbed)
    console.log(str)
    console.log(realTotal)
    embedMessage.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

    console.log('timesup')
}