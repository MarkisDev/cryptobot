

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const token = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () =>
{
    console.log(`Ready as ${client.user.username}!`);
});


client.login(token.bot);
