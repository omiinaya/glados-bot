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
        var timer = args[2]*60*1000 //x minutes
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
                    .setThumbnail(embed.thumbnail)
                    .setTimestamp()
                    .setFooter(embed.footer, embed.glados);
                msg.reply(pollEmbed).then(embedMessage => {

                    setTimeout(function() { removeReactions(embedMessage) }, timer);

                    var lines = str.split(/\r\n|\r|\n/)
                    lines.forEach(line => {
                        for (const key in numbers) {
                            if (line.charAt(0) === `${numbers[key]}`) {
                                embedMessage.react(`${key}`);
                            }
                        }
                    })

                    const filter = (reaction) => getNumbers().includes(reaction.emoji.name)
                    const collector = embedMessage.createReactionCollector(filter, { dispose: true }); // 5 min
                    collector.on('collect', (reaction, user) => {
                        if (reaction.users.cache.some(ruser => ruser.id !== config.botID)) {
                            reactionAdded(reaction, user)
                        }
                    });

                    collector.on('remove', (reaction, user) => {
                            reactionRemoved(reaction, user)
                    });
                })
            } else {
                msg.reply('You need to provide a question, at least 2 options and at most 9.')
            }
        }
    }
}

function reactionAdded(reaction, user) {
    console.log('yes')
}

function reactionRemoved(reaction, user) {
    console.log('no')
}

function removeReactions(embedMessage) {
    embedMessage.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
    console.log('timesup')
}