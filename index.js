require("dotenv").config()

const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");
const i18n = require("i18n");

const client = new Discord.Client({
  disableMentions: "everyone",
  restTimeOffset: 0,
  partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
});

const { config, emojis, roles, music, twitch } = require('./config')
const PREFIX   = music.prefix
const LOCALE   = music.locale
const TOKEN = process.env.BOT_TOKEN

const startRolesModule = require('./modules/roles')
const startMusicModule = require('./modules/music')
const startTwitchModule = require('./modules/twitch')

client.login(TOKEN);

client.on('ready', () => {
  startRolesModule(client, config, emojis, roles)
  startMusicModule(client, fs, path, Discord, music, i18n, PREFIX)
  //startTwitchModule(fs, Discord, client, twitch, TOKEN)
  console.log(`${client.user.username} ready!`);
  client.user.setActivity(`${PREFIX}help and ${PREFIX}play`, { type: "LISTENING" });
});

module.exports = { client, PREFIX, i18n, LOCALE }