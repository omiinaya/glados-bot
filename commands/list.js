const { PREFIX, i18n, LOCALE } = require('../index')
const fs = require('fs')
const path = require('path')

i18n.setLocale(LOCALE);

var pth = path.join(__dirname, "../modules/channels.json")

var list = {
    name: "list",
    description: i18n.__('list.description'),
    execute(message) {
        if (message.content.toLowerCase().startsWith(PREFIX + "list")) {
            fs.readFile(pth, "utf-8", function read(err, data) {
                var streamers = JSON.parse(data)
                var str = '\n'
                streamers.forEach(streamer => {
                    str+='\n'+streamer.name
                })
                message.reply(str)
            })
        }

    }
}

module.exports = list