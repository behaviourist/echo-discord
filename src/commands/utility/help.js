const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (args[0]) {
        let command;

        if (client.commands.has(args[0])) command = client.commands.get(args[0]);
        
        if (client.aliases.has(args[0])) command = client.commands.get(client.aliases.get(args[0]));

        let embed = new MessageEmbed()
            .setTitle(command.config.name)
            .setColor('PURPLE')
            .setFooter(`Any parameters where there are arrow brackets (<>) are needed.`)
            .addField('Aliases', command.config.aliases.length > 0 ? command.config.aliases.join(", ") : "No Aliases")
            .addField('Parameters (Usage)', command.config.usage);

        return message.channel.send(embed);
    }

    let configCommands = [], utilityCommands = [];

    client.commands.filter(c => c.config.category === 'utility').forEach(command => utilityCommands.push(`**${command.config.name}**`));
    client.commands.filter(c => c.config.category === 'config').forEach(command => configCommands.push(`**${command.config.name}**`));

    let embed = new MessageEmbed()
        .setTitle(`${client.user.username}'s Help System`)
        .setColor('PURPLE')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(`Use ${client.config.get(message.guild.id).prefix}help <command> to get info on a specific command.`)
        .addField('Utility Commands', utilityCommands.join('\n'), true)
        .addField('Config Commands (Admin)', configCommands.join('\n'), true);

    message.channel.send(embed);
}

module.exports.config = {
    name: "help",
    aliases: [],
    usage: `help [command name / alias]`,
    category: 'utility'
}