const Discord = require('discord.js');
require('dotenv').config()

const { config, emojis, roles } = require('./config')
const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
});

client.login(process.env.BOT_TOKEN);

client.on('ready', () => console.log('The bot has been started!'));

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.channel.id == config.channel) {
    console.log(reaction.emoji.id)
    for (const key in emojis) {
      if (reaction.emoji.id === `${emojis[key]}`) {
        var currentEmoji = `${key}`
        await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(roles[currentEmoji]);
      }
    }
  } else return;
});

client.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.channel.id == config.channel) {
    for (const key in emojis) {
      if (reaction.emoji.id === `${emojis[key]}`) {
        var currentEmoji = `${key}`
        await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(roles[currentEmoji]);
      }
    }
  } else return;
});
