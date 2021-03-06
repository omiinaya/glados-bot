const { config, emojis, roles, private, channels } = require('../config')

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
                if (reaction.emoji.id === `${emojis[key]}` || reaction.emoji.name === `${emojis[key]}`) {
                    private.forEach(role => {
                        if (reaction.emoji.name === role && !reaction.message.member.roles.cache.some(role => role.name === 'Origin')) {
                            client.channels.cache.get(channels.logs).send('<@' + reaction.message.member.user.id + '>, you are not an Origin employee.');
                            return
                        }
                    })
                    var currentEmoji = `${key}`
                    await reaction.message.guild.members.cache.get(user.id).roles[action](roles[currentEmoji]);
                }
            }
        } else return;
    }
    console.log("Roles module initialized.");
}

module.exports = { startRolesModule };