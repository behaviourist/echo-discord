const { MessageEmbed } = require('discord.js');
const { performance } = require('perf_hooks');
require('dotenv-flow').config()

function clean(text) {
    if (typeof text === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
}

module.exports.run = async (client, message, args) => {
    let start = performance.now();
    if (message.author.id !== process.env.OWNER) return message.channel.send(`:warning: Developer-only Command :warning:`);
    if (!args.join(" ")) return message.channel.send('Please enter code for me to run.');

    try {
        let evaluated = eval(args.join(" "));
        if (typeof evaluated !== "string") evaluated = require('util').inspect(evaluated);

        evaluated = evaluated.replace(new RegExp(`${client.token}|${process.env.TOKEN}`, "g"), "...");

        if (evaluated.length > 1000) evaluated = evaluated.substr(0, 1000) + '...';
        let end = performance.now();

        let embed = new MessageEmbed()
            .setTitle('Evaluation Successful')
            .setColor('#36393F')
            .addField('Input', `\`\`\`${args.join(' ')}\`\`\``)
            .addField('Output', `\`\`\`xl\n${evaluated}\`\`\``)
            .setFooter(`Evaluation took ${Math.floor(end - start)}ms`);
        
        message.channel.send(embed);
    } catch (error) {
        let embed = new MessageEmbed()
            .setTitle('Evaluation Failed')
            .setColor('#36393F')
            .addField('Input', `\`\`\`${args.join(' ')}\`\`\``)
            .addField('Output', `\`\`\`xl\n${error}\`\`\``);
        
        message.channel.send(embed);
    }
}

module.exports.config = {
    name: "eval",
    aliases: ["run", "ev"],
    usage: "eval <code>",
    category: "developer"
}