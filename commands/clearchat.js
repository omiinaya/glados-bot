const { client, PREFIX, i18n, LOCALE } = require('../index')

i18n.setLocale(LOCALE);

var clearchat = {
    name: "clearchat",
    description: i18n.__('clearchat.description'),
    async execute() {
    client.on("message", msg => {
        if (msg.content.toLowerCase().startsWith(PREFIX + "clearchat")) {
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
    })
  }
}

module.exports = clearchat