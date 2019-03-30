const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');
const Enmap = require('enmap');

require('dotenv-flow').config();

client.commands = new Enmap();
client.aliases = new Enmap();
client.config = new Enmap({ 
    name: "config",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep'
});

const categories = ["config", "utility", "developer"];

for (category of categories) {
    let path = `commands/${category}`;
    fs.readdir(`./src/${path}`, async (err, files) => {
        if (err) console.error(err);
    
        files.forEach(file => {
            if (!file.endsWith('js')) return;
    
            let properties = require(`./src/${path}/${file}`);
    
            client.commands.set(properties.config.name, properties);
    
            properties.config.aliases.forEach(alias => {
                client.aliases.set(alias, properties.config.name);
            });
        });
    });
}

fs.readdir('./src/events/', async (err, files) => {
    if (err) console.error(err);

    files.forEach(file => {
        if (!file.endsWith('js')) return;

        const event = require(`./src/events/${file}`);
        const eventName = file.split('.')[0];

        client.on(eventName, event.bind(null, client));
    });
});

client.login(process.env.TOKEN);