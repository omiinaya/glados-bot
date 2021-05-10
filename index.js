require('dotenv').config()
const Discord = require('discord.js');

const client = new Discord.Client({
  disableMentions: "everyone",
  restTimeOffset: 0,
  partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
});

const { config, emojis, roles, music } = require('./config')
const path = require("path");
const i18n = require("i18n");


const startRolesModule = require('./roles')
const startMusicModule = require('./music')
const startTwitchModule = require('./twitch')

client.login(process.env.BOT_TOKEN);
client.commands = new Discord.Collection();
client.prefix = music.prefix;
client.queue = new Map();

const cooldowns = new Discord.Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

i18n.configure({
  locales: ["ar", "de", "en", "es", "fr", "it", "ko", "nl", "pl", "pt_br", "ru", "sv", "tr", "zh_cn", "zh_tw"],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: "en",
  objectNotation: true,
  register: global,

  logWarnFn: function (msg) {
    console.log("warn", msg);
  },

  logErrorFn: function (msg) {
    console.log("error", msg);
  },

  missingKeyFn: function (locale, value) {
    return value;
  },

  mustacheConfig: {
    tags: ["{{", "}}"],
    disable: false
  }
});

client.on('ready', () => {
  startRolesModule(client, config, emojis, roles)
  startMusicModule()
  startTwitchModule()
  console.log('The bot has been started!')
});