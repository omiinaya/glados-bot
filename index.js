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

const { config, emojis, roles, music } = require('./config')
const PREFIX = music.prefix

const startRolesModule = require('./modules/roles')
const startMusicModule = require('./modules/music')
const startTwitchModule = require('./modules/twitch')

client.login(process.env.BOT_TOKEN);

client.on("message", msg => {
  if (msg.content.toLowerCase().startsWith(PREFIX + "clearchat")) {
    if (msg.member.roles.cache.some(role => role.name === 'Sullen')) {
      msg.channel.send('test')

      async function clear() {
        msg.delete();
        const fetched = await msg.channel.messages.fetch({ limit: 99 });
        msg.channel.bulkDelete(fetched);
      }
      clear();
    } else {
      msg.channel.send('test')
    }
  }
});

client.on('ready', () => {
  startRolesModule(client, config, emojis, roles)
  startMusicModule(client, fs, path, Discord, music, i18n, PREFIX)
  startTwitchModule()
  console.log(`${client.user.username} ready!`);
  client.user.setActivity(`${PREFIX}help and ${PREFIX}play`, { type: "LISTENING" });
});