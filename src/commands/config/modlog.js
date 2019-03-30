const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!client.config.get(message.guild.id).administrators.some(a => message.member.roles.has(a)) && message.author.id !== process.env.OWNER) return message.channel.send('One of your roles must be in the administrator list to use this command.');
    if (!args[0]) return message.channel.send(`Please use \`${client.config.get(message.guild.id).prefix}help modlog\` to get help on this command.`);
    
    if (args[0].toLowerCase() === 'enable') {
        if (client.config.get(message.guild.id).modLogEnabled === true) return message.channel.send('Moderation Logging is already enabled.');

        let embed = new MessageEmbed()
            .setDescription(`Moderation Logging has been enabled.`)
            .setColor('PURPLE');

        message.channel.send(embed);
        return client.config.set(message.guild.id, true, 'modLogsEnabled');
    }

    if (args[0].toLowerCase() === 'disable') {
        if (client.config.get(message.guild.id).modLogEnabled === false) return message.channel.send('Moderation Logging is already disabled.');
        
        let embed = new MessageEmbed()
            .setDescription(`Moderation Logging has been disabled.`)
            .setColor('PURPLE');

        message.channel.send(embed);
        return client.config.set(message.guild.id, false, 'modLogsEnabled');
    }

    if (args[0].toLowerCase() === 'channel') {
        if (client.config.get(message.guild.id).modLogsEnabled === false) {
            let embed = new MessageEmbed()
            .setDescription(`Moderation Logging is disabled.`)
            .setColor('PURPLE');
            
            return message.channel.send(embed);
        }

        let channel = message.guild.channels.get(args[1]) || message.mentions.channels.first();
        if (!channel) return message.channel.send('Please enter a channel id or mention a channel.');

        if (client.config.get(message.guild.id).modLogsChannel === channel.id) {
            let embed = new MessageEmbed()
            .setDescription(`Moderation Logging Channel is already ${channel}.`)
            .setColor('PURPLE');
            
            return message.channel.send(embed);
        }

        let embed = new MessageEmbed()
            .setDescription(`Moderation Logging Channel has been changed to ${channel}.`)
            .setColor('PURPLE');

        message.channel.send(embed);
        return client.config.set(message.guild.id, channel.id, 'modLogsChannel');
    }
}

module.exports.config = {
    name: "modlog",
    aliases: [],
    usage: `modlog <enable, disable, channel> [channel id / mention]`,
    category: 'config'
}