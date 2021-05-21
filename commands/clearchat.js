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
                async function clear() {
                    msg.delete();
                    const fetched = await msg.channel.messages.fetch({ limit: 99 });
                    msg.channel.bulkDelete(fetched);
                }
                clear();
            } else {
                msg.channel.send('You are not authorized to use this command.')
            }
        }
    }
}