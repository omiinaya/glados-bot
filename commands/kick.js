const Discord = require('discord.js')
const { config, twitch, embed } = require('../config')
const PREFIX = config.prefix
const LOCALE = config.locale
const i18n = require("i18n");

i18n.setLocale(LOCALE);

module.exports = {
    name: "kick",
    description: i18n.__('kick.description'),
    execute(msg) {
        var args = msg.content.trim().split(/ +/g);
        if (msg.content.toLowerCase().startsWith(PREFIX + "kick")) {
            if (msg.member.roles.cache.some(role => role.name === 'Sullen')) {
                const user = msg.mentions.users.first()
                if (user) {
                    const member = msg.guild.member(user);
                    if (member) {
                        member
                            .kick('As requested by ' + msg.author.tag)
                            .then(() => {
                                msg.send('A fool has been erased.')
                            })
                    }
                } else {
                    msg.reply('This user does not exist.')
                }
            } else {
                msg.reply('You are not authorized to use this command.')
            }
        }
    }
}