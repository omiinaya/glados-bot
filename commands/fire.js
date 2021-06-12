const Discord = require('discord.js')
const { config, twitch, embed } = require('../config')
const client = require('../index.js')
const PREFIX = config.prefix
const LOCALE = config.locale
const i18n = require("i18n");

i18n.setLocale(LOCALE);

module.exports = {
    name: "fire",
    description: i18n.__('fire.description'),
    execute(msg) {
        //var args = msg.content.trim().split(/ +/g);
        var user = msg.mentions.users.first()
        console.log(user.username)
        if (msg.content.toLowerCase().startsWith(PREFIX + "fire")) {
            msg.reply(user.username + ' has been fired.')
        }
    }
}