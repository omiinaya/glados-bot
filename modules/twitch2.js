const axios = require('axios')
const { twitch } = require('../config')

const twitchClientID = process.env.TWITCH_CLIENT_ID
const twitchOAuthID = process.env.TWITCH_OAUTH_ID

function startTwitchModule() {
    getStreamStatus('Taegya')
    tick(twitch.interval)
}

function getStreamStatus(input) {
    var url = "https://api.twitch.tv/helix/search/channels?query=" + input
    axios.get(url, {
        headers: {
            'Client-ID': twitchClientID,
            'Authorization': twitchOAuthID
        }
    }).then(res => {
        var streamers = res.data.data
        streamers.forEach((streamer) => {
            if (streamer.display_name == input) {
                console.log(streamer.is_live)
            }
        })
    })
}

function tick(interval) {
    var x = 0
    const tock = setInterval(function() {
        console.log(x+1)
        x++;
        if (x >= 5) {
            clearInterval(tock);
         }
      }, interval * 1000);
}
//check if last was offline and new is online then alert

module.exports = { startTwitchModule }