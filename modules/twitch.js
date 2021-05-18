//dependencies
const axios = require('axios')
const fs = require('fs')
const { twitch } = require('../config')

//environment variables
const twitchClientID = process.env.TWITCH_CLIENT_ID
const twitchOAuthID = process.env.TWITCH_OAUTH_ID

function startTwitchModule() {
    console.log("Twitch module initialized.")
    tick(twitch.interval)
}

function leadingZero(d) {
    if (d < 10) {
        return "0" + d;
    } else {
        return d;
    }
}

function print(msg, err) {
    var date = new Date();
    var h = leadingZero(date.getHours());
    var m = leadingZero(date.getMinutes());
    var s = leadingZero(date.getSeconds());

    console.log("[" + h + ":" + m + ":" + s + "]", msg);
    if (err) {
        console.log(err);
    }
}

function tick(interval) {
    //var x = 0
    const tock = setInterval(function () {
        getList()
        console.log('-----------------------------------')
        /*
        print(x + 1)
        x++;
        if (x >= 5) {
            clearInterval(tock);
        }
        */
    }, interval * 1000);
}

function getList() {
    fs.readFile(__dirname + "/channels.json", "utf-8", function read(err, data) {
        var json = JSON.parse(data)
        var streamers = json.data
        streamers.forEach(streamer => {
            getStreamStatus(streamer.name)
        })
    })
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
                updateList(streamer.display_name, streamer.is_live, streamer.title, streamer.game_name, streamer.thumbnail_url)
            }
        })
    })
}

function updateList(name, status, title, game, thumbnail) {
    fs.readFile(__dirname + "/channels.json", "utf-8", function read(err, data) {
        var json = JSON.parse(data)
        var streamers = json.data
        streamers.forEach(streamer => {
            if (name === streamer.name && streamer.status != status) {
                streamer.status = status;
                var data = JSON.stringify(json)
                fs.writeFile(__dirname + "/channels.json", data, (error) => {
                    console.log('updating file.')
                    if (error) {
                        console.log(error)
                    }
                })
                if (status == true) {
                    discordAlert(name, title, game, thumbnail)
                }
            }
        })
        print(name + ": " + status)
    })
}

function discordAlert(name, title, game, thumbnail) {
    console.log(name + " is now live on Twitch!")
    console.log(title)
    console.log(game)
    console.log(thumbnail)
    //discord alerts channel
}


//check if last was offline and new is online then alert

module.exports = { startTwitchModule }