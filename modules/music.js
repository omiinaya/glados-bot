const Discord = require('discord.js');
const fs = require('fs')
const path = require('path')
const i18n = require('i18n')

function startMusicModule(client, PREFIX) {
    console.log("Music module initialized.");

    client.commands = new Discord.Collection();
    client.queue = new Map();
    client.prefix = PREFIX;

    const cooldowns = new Discord.Collection();
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    i18n.configure({
        locales: ["ar", "de", "en", "es", "fr", "it", "ko", "nl", "pl", "pt_br", "ru", "sv", "tr", "zh_cn", "zh_tw"],
        directory: path.join(__dirname, '../locales'),
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

    client.on("warn", (info) => console.log(info));

    client.on("error", console.error);

    const commandFiles = fs.readdirSync(path.join(__dirname, "../commands")).filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(path.join(__dirname, "../commands", `${file}`));
        client.commands.set(command.name, command);
    }

    client.on("message", async (message) => {
        if (message.author.bot) return;
        if (!message.guild) return;

        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
        if (!prefixRegex.test(message.content)) return;

        const [, matchedPrefix] = message.content.match(prefixRegex);

        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command =
            client.commands.get(commandName) ||
            client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 1) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(
                    i18n.__mf("common.cooldownMessage", { time: timeLeft.toFixed(1), name: command.name })
                );
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply(i18n.__("common.errorCommend")).catch(console.error);
        }
    });
}

module.exports = { startMusicModule }