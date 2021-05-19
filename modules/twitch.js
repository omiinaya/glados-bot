//dependencies
const axios = require('axios')
const Discord = require('discord.js');
const fs = require('fs')
const { twitch } = require('../config')

//environment variables
const twitchClientID = process.env.TWITCH_CLIENT_ID
const twitchOAuthID = process.env.TWITCH_OAUTH_ID

let Client;

function startTwitchModule(client) {
    console.log("Twitch module initialized.")
    Client = client
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
        var streamers = JSON.parse(data)
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
        var streamers = JSON.parse(data)
        streamers.forEach(streamer => {
            if (name === streamer.name && streamer.status != status) {
                streamer.status = status;
                var data = JSON.stringify(streamers)
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
    const Embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(name + " is now live on Twitch!")
	.setURL('https://twitch.tv/'+name)
	.setDescription(game)
	.setThumbnail('https://i.imgur.com/OsnSOeR.png')
	.addFields(
		{ name: title, value: '\u200B' }
	)
	.setImage(thumbnail)
	.setTimestamp()
	.setFooter('Brought to you by GLaDOS', 'https://i.imgur.com/OsnSOeR.png');

    Client.channels.cache.get(twitch.channel).send(Embed);
}

module.exports = { startTwitchModule }