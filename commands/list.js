const { client, PREFIX, i18n, LOCALE } = require('../index')
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const { twitch } = require('../config')

const twitchClientID = process.env.TWITCH_CLIENT_ID
const twitchOAuthID = process.env.TWITCH_OAUTH_ID

i18n.setLocale(LOCALE);

var pth = path.join(__dirname, "../modules/channels.json")

var clearchat = {
    name: "list",
    description: i18n.__('list.description'),
    async execute() {
        client.on("message", msg => {
            if (msg.content.toLowerCase().startsWith(PREFIX + "list")) {
                fs.readFile(pth, "utf-8", function read(err, data) {
                    var json = JSON.parse(data)
                    var streamers = json.data
                    streamers.forEach(streamer => {
                        console.log(streamer.name)
                    })
                    msg.reply(JSON.stringify(streamers))
                })
            }
        })
    }
}

module.exports = clearchat