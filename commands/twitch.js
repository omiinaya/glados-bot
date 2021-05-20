const path = require('path')
const axios = require('axios')
const Discord = require('discord.js')
const { config } = require('../config')
const PREFIX = config.prefix
const LOCALE = config.locale
const i18n = require("i18n");
const { getList, addStreamer, removeStreamer } = require('../scripts')

const twitchClientID = process.env.TWITCH_CLIENT_ID
const twitchOAuthID = process.env.TWITCH_OAUTH_ID

i18n.setLocale(LOCALE);

var pth = path.join(__dirname, "../modules/channels.json")

module.exports = {
    name: "twitch",
    description: i18n.__('twitch.description'),
    execute(msg) {
        var args = msg.content.trim().split(/ +/g);
        if (msg.content.toLowerCase().startsWith(PREFIX + "twitch")) {
            getList().then(res => {
            })
            if (args[1] === 'add') {
                var url = "https://api.twitch.tv/helix/users?login=" + args[2]
                axios.get(url, {
                    headers: {
                        'Client-ID': twitchClientID,
                        'Authorization': twitchOAuthID
                    }
                }).then(res => {
                    if (res.data.data) {
                        getList().then(streamers => {
                            var displayName = res.data.data[0].display_name
                            if (streamers.some(streamer => streamer.name === displayName)) {
                                //alert streamer has already been added
                                msg.reply(displayName + ' is alreday on the list.')
                            } else {
                                //if name isnt found on list, then add it
                                addStreamer(displayName, false)
                                msg.reply(displayName + ' has been added to the list.')
                            }
                        })
                    }
                })
            }
            if (args[1] === 'remove') {
                if (msg.member.roles.cache.some(role => role.name === 'Sullen')) {
                    getList().then(streamers => {
                        if (streamers.some(streamer => streamer.name.toUpperCase() === args[2].toUpperCase())) {
                            removeStreamer(args[2])
                            msg.reply(args[2] + ' has been removed.')
                        } else {
                            msg.reply(args[2] + ' was not on the list.')
                        }
                    })
                } else {
                    msg.reply('You are not authorized to use this command.')
                }
            }
            if (args[1] === 'list') {
                getList().then(res => {
                    var count = 0;
                    var str = '';
                    res.forEach(streamer => {
                        count++
                        str += '\n' + count + ". " + streamer.name
                    })

                    const Embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Streamer list:")
                        .setDescription(str)
                        .setTimestamp()
                        .setFooter('Brought to you by GLaDOS', 'https://i.imgur.com/OsnSOeR.png');

                    msg.reply(Embed)
                })
            }
        }
    }
}