const { client, PREFIX, i18n, LOCALE } = require('../index')

const axios = require('axios')
const twitchClientID = process.env.TWITCH_CLIENT_ID
const twitchOAuthID = process.env.TWITCH_OAUTH_ID

function startTwitchModule(client) {
        getStreamID('Taegya')
        client.on("message", msg => {
            console.log(msg.content)
        })
    }

function getStreamID(a) {
        var url = "https://api.twitch.tv/helix/users?login=" + a
        axios.get(url, {
            headers: {
                'Client-ID': twitchClientID,
                'Authorization': 'Bearer ' + twitchOAuthID
            }
        }).then(res => {
            console.log(res.data.data[0].id)
        })
    }

module.exports = { startTwitchModule }