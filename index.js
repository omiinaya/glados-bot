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
    if (reaction.emoji.id === emojis.warzone) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(roles.warzone);
    }
    if (reaction.emoji.id === emojis.valorant) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(roles.valorant);
    }
    if (reaction.emoji.id === emojis.wow) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(roles.wow);
    }
    if (reaction.emoji.id === emojis.overwatch) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(roles.overwatch);
    }
    if (reaction.emoji.id === emojis.csgo) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(roles.csgo);
    }
    if (reaction.emoji.id === emojis.minecraft) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(roles.minecraft);
    }
  } else return;
});

client.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.channel.id == config.channel) {
    if (reaction.emoji.id === emojis.warzone) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(roles.warzone);
    }
    if (reaction.emoji.id === emojis.valorant) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(roles.valorant);
    }
    if (reaction.emoji.id === emojis.wow) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(roles.wow);
    }
    if (reaction.emoji.id === emojis.overwatch) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(roles.overwatch);
    }
    if (reaction.emoji.id === emojis.csgo) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(roles.csgo);
    }
    if (reaction.emoji.id === emojis.minecraft) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(roles.minecraft);
    }
  } else return;
});
