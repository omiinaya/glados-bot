//dependencies
const axios = require('axios')
const Discord = require('discord.js');
const { print } = require('../scripts')
const { twitch, channels, embed } = require('../config')
const { getList, updateStreamer } = require('../scripts')
const APIURL = twitch.apiUrl

//environment variables
const twitchClientID = process.env.TWITCH_CLIENT_ID
const twitchOAuthID = process.env.TWITCH_OAUTH_ID

let Client;

function startTwitchModule(client) {
    console.log("Twitch module initialized.")
    Client = client
    tick(twitch.cooldown)
}

function tick(cooldown) {
    setInterval(function () {
        getList().then(streamers => {
            var promise = Promise.resolve();
            streamers.forEach(streamer => {
                promise = promise.then(function () {
                    getStreamStatus(streamer.name)
                    return new Promise(function (resolve) {
                        setTimeout(resolve, twitch.interval);
                    });
                });
            })
        })
        console.log('------------------------------------------------')
    }, cooldown);
}

function getStreamStatus(input) {
    var url = APIURL + "/search/channels?query=" + input
    axios.get(url, {
        headers: {
            'Client-ID': twitchClientID,
            'Authorization': twitchOAuthID
        }
    }).then(res => {
        var streamers = res.data.data
        streamers.forEach((streamer) => {
            if (streamer.display_name.toUpperCase() == input.toUpperCase()) {
                updateList(streamer.display_name, streamer.is_live, streamer.title, streamer.game_name, streamer.thumbnail_url)
            }
        })
    })
}

function updateList(name, status, title, game, thumbnail) {
    getList().then(streamers => {
        streamers.forEach(streamer => {
            if (streamer.name.toUpperCase() === name.toUpperCase() && streamer.status !== status) {
                updateStreamer(name, status)
                if (status == true) {
                    discordAlert(name, title, game, thumbnail)
                }
            }
        })
        print(name + " : " + status)
    })

}

function discordAlert(name, title, game, thumbnail) {
    const twitchEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(name + " is now live on Twitch!")
        .setURL(twitch.url + name)
        .setDescription(game)
        .setThumbnail(embed.thumbnail)
        .addFields(
            { name: title, value: '\u200B' }
        )
        .setImage(thumbnail)
        .setTimestamp()
        .setFooter(embed.footer, embed.glados);

    Client.channels.cache.get(channels.twitch).send(twitchEmbed);
}

module.exports = { startTwitchModule }