const { config } = require('../config')
const i18n = require("i18n");

i18n.setLocale(config.locale);

module.exports = {
  name: "invite",
  description: i18n.__('invite.description'),
  execute(message) {
    return message.member
      .send(
        `https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=70282305&scope=bot
    `
      )
      .catch(console.error);
  }
};
