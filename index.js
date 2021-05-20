require("dotenv").config()

const Discord = require("discord.js");

const client = new Discord.Client({
  disableMentions: "everyone",
  restTimeOffset: 0,
  partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
});

const { config } = require('./config')

const PREFIX   = config.prefix
const TOKEN    = process.env.BOT_TOKEN

const { startRolesModule }  = require('./modules/roles')
const { startMusicModule }  = require('./modules/music')
const { startTwitchModule } = require('./modules/twitch')

client.login(TOKEN);

client.on('ready', () => {
  startRolesModule(client)
  startMusicModule(client)
  startTwitchModule(client)
  console.log(`${client.user.username} ready!`);
  client.user.setActivity(`${PREFIX}help for command list.`, { type: "LISTENING" });
});