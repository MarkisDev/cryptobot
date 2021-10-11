

// // Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token, apiKey } = require('./config.json');
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const got = require('got');

// When the client is ready, run this code (only once)
client.once('ready', () =>
{
    console.log(`Ready as ${client.user.username}!`);
});

client.on('interactionCreate', async interaction =>
{
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'start')
    {
        await interaction.reply(`Bot will be sending the values every 5 min!`);

        async function makeRequest()
        {
            got.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC', { responseType: 'json', headers: { 'X-CMC_PRO_API_KEY': apiKey } })
                .then(async (res) =>
                {
                    let data = res.body.data.BTC.quote.USD;
                    let usd = data.price;
                    let inr = usd * 75.40;
                    await interaction.channel.send(`The value in INR is ${String(inr)} and USD is ${String(usd)}`);
                    // DM USER
                })
                .catch(err =>
                {
                    console.log('Error: ', err.message);
                });
        }
        // Setting Interval to keep sending the details
        setInterval(makeRequest, 30000);

    }
});

client.login(token);



