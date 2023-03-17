import express from 'express';
import {
    Client,
    GatewayIntentBits,
    Partials,
    EmbedBuilder,
    SlashCommandBuilder,
    PermissionFlagsBits,
    Events
} from 'discord.js';

const app = express();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    'partials': [Partials.Channel]
}); // Intents.

const CHANNEL_ID = "1086288088529129492";

client.login(process.env.TOKEN); // Login with the Bot's Token

const prefix = "."; // Prefix. Example Command: .generate

client.on(Events.MessageCreate, async (message) => {
    if (!message.author.bot && message.content.startsWith(prefix)) {
        const command = message.content.replace(prefix, "");
        const commandName = command.split(" ")[0];
        const commandArg = command.split(" ")[1];
        try {
            const data = await import(`./commands/${commandName}.js`); // If the file is `commands/generate.js` the command name will be `generate`
            if (!data) return;
            try {
                await data.default.exec(message, commandArg, client);
            } catch (error) {
                return message.reply(`${error}`);
            }
        } catch (error) {
            return console.error(error);
        }
    }
});


client.once(Events.ClientReady, async () => {
    client.user.setPresence({
        activities: [{
            name: 'on Training Ground'
        }],
        status: 'idle'
    });
    console.log('Started.');
}); // When the Client or Bot is Online. You can update it's status.

app.get('/', (req, res) => {
    res.send('Training Data Bot is Online')
});

app.listen(3000, () => {
    console.log('Port 3000 Connected');
});

export default {
    client
};
