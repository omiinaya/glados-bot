//dependencies
const axios = require('axios')
const Discord = require('discord.js');
const { print } = require('../scripts')
const { twitch } = require('../config')
const APIURL = twitch.apiUrl
const { getList, updateStreamer } = require('../scripts')

//environment variables
const twitchClientID = process.env.TWITCH_CLIENT_ID
const twitchOAuthID = process.env.TWITCH_OAUTH_ID

let Client;

function startTwitchModule(client) {
    console.log("Twitch module initialized.")
    Client = client
    tick(twitch.interval)
}

function tick(interval) {
    //var x = 0
    const tock = setInterval(function () {
        x()
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

function x() {
    getList().then(streamers => {
        var interval = 300; // how much time should the delay between two iterations be (in milliseconds)?
        var promise = Promise.resolve();
        streamers.forEach(streamer => {
            promise = promise.then(function () {
            getStreamStatus(streamer.name)
            return new Promise(function (resolve) {
                setTimeout(resolve, interval);
              });
            });
        })
    })
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
            if (streamer.display_name == input) {
                updateList(streamer.display_name, streamer.is_live, streamer.title, streamer.game_name, streamer.thumbnail_url)
            }
        })
    })
}

function updateList(name, status, title, game, thumbnail) {
    getList().then(streamers => {
        streamers.forEach(streamer => {
            if (streamer.name === name && streamer.status !== status) {
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
    const Embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(name + " is now live on Twitch!")
        .setURL('https://twitch.tv/' + name)
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