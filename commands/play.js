const { play } = require("../modules/player");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const scdl = require("soundcloud-downloader").default
const https = require("https");
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
const { config, music } = require('../config')
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
const i18n = require("i18n");

i18n.setLocale(config.locale);

module.exports = {
  name: "play",
  cooldown: 3,
  aliases: ["p"],
  description: i18n.__("play.description"),
  async execute(message, args) {
    message.reply('Currently under maintenance')
  }
};
