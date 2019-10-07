import 'dotenv/config';
import Discord from 'discord.js';
import Keeper from './keeper';

const client = new Discord.Client()
const prefix = process.env.COMMAND_PREFIX

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'players') {
        let guid = process.env.DEFAULT_SERVER_GUID
        console.log(args)
        if (args.length) {
            guid = args[0]
        }

        let keeper = new Keeper(guid);
        keeper.fetchPlayerCounts()
            .then((playerCount) => {
                message.reply(`The server has ${playerCount} players`);
            })
            .catch(() => {
                message.reply(`Unable to fetch. Make sure the GUID is correct.`);
            })
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);