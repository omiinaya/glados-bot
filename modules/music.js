var musicModule = (
    function startMusicModule(client, fs, path, Discord, music, i18n, PREFIX) {
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
    }
)

module.exports = musicModule