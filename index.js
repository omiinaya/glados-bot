const Discord = require('discord.js');
require('dotenv').config()

const { config, emojis, roles } = require('./config')
const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
});
const startRolesModule = require('./roles')
const startMusicModule = require('./music')

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
  startRolesModule(client, config, emojis, roles)
  console.log('The bot has been started!')
});