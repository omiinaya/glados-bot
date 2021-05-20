const { config, emojis, roles } = require('../config')

function startRolesModule(client) {
    client.on('messageReactionAdd', (reaction, user) => {
        toggleRole(reaction, user, 'add')
    });

    client.on('messageReactionRemove', (reaction, user) => {
        toggleRole(reaction, user, 'remove')
    });

    async function toggleRole(reaction, user, action) {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;
        if (reaction.message.id == config.message) {
            console.log(reaction.emoji.id)
            for (const key in emojis) {
                if (reaction.emoji.id === `${emojis[key]}`) {
                    var currentEmoji = `${key}`
                    await reaction.message.guild.members.cache.get(user.id).roles[action](roles[currentEmoji]);
                }
            }
        } else return;
    }
    console.log("Roles module initialized.");
}

module.exports = { startRolesModule };