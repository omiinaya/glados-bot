const { config } = require('../config')
const PREFIX = config.prefix
const LOCALE = config.locale
const i18n = require("i18n");

i18n.setLocale(LOCALE);

module.exports = {
    name: "clearchat",
    description: i18n.__('clearchat.description'),
    execute(msg) {
        if (msg.content.toLowerCase().startsWith(PREFIX + "clearchat")) {
            var args = msg.content.trim().split(/ +/g);
            if (msg.member.roles.cache.some(role => role.name === 'Sullen')) {
                if (args.length > 1) {
                    clearchat2(msg, args[1])
                } else {
                    clearchat(msg)
                }
            } else {
                msg.channel.send('You are not authorized to use this command.')
            }
        }
    }
}

function clearchat(msg) {
    async function clear() {
        msg.delete();
        const fetched = await msg.channel.messages.fetch({ limit: 99 });
        msg.channel.bulkDelete(fetched);
    }
    clear();
}

function clearchat2(msg, quantity) {
    var x = parseInt(quantity) + 1
    console.log(x)

    async function clear() {
        msg.delete();
        const fetched = await msg.channel.messages.fetch({ limit: x });
        msg.channel.bulkDelete(fetched);
    }
    clear();
}