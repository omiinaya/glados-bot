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
    name: "add",
    description: i18n.__('add.description'),
    async execute() {
        client.on("message", msg => {
            var args = msg.content.trim().split(/ +/g);
            if (msg.content.toLowerCase().startsWith(PREFIX + "add")) {
                var url = "https://api.twitch.tv/helix/users?login=" + args[1]
                axios.get(url, {
                    headers: {
                        'Client-ID': twitchClientID,
                        'Authorization': twitchOAuthID
                    }
                }).then(res => {
                    if (res.data.data) {
                        fs.readFile(pth, "utf-8", function read(err, data) {
                            var json = JSON.parse(data)
                            var streamers = json.data
                            var newId = streamers.length + 1
                            console.log(res.data.data[0].display_name)
                            if (streamers.some(streamer => streamer.name === res.data.data[0].display_name)) {
                                console.log('test2')
                            } else {
                                json.data.push({
                                    id: newId,
                                    name: res.data.data[0].display_name,
                                    status: false
                                })
                                var data = JSON.stringify(json)
                                fs.writeFile(pth, data, (error) => {
                                    console.log('updating file.')
                                    if (error) {
                                        console.log(error)
                                    }
                                })
                            }
                        })
                        console.log('test')
                    }
                })

            }
        })
    }
}

module.exports = clearchat