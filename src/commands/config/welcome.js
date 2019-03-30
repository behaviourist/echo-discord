const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!client.config.get(message.guild.id).administrators.some(a => message.member.roles.has(a)) && message.author.id !== process.env.OWNER) return message.channel.send('One of your roles must be in the administrator list to use this command.');
    if (!args[0]) return message.channel.send(`Please use \`${client.config.get(message.guild.id).prefix}help welcome\` to get help on this command.`);
    if (!['enable', 'disable', 'channel', 'message'].some(a => args[0].toLowerCase().includes(a))) return message.channel.send(`Please use \`${client.config.get(message.guild.id).prefix}help welcome\` to get help on this command.`);
    
    if (args[0].toLowerCase() === 'enable') {
        if (client.config.get(message.guild.id).welcomeEnabled === true) {
            let embed = new MessageEmbed()
            .setDescription(`Welcome Messages are already enabled.`)
            .setColor('PURPLE');
            
            return message.channel.send(embed);
        }

        let embed = new MessageEmbed()
            .setDescription(`Welcome Messages have been enabled.`)
            .setColor('PURPLE');

        message.channel.send(embed);
        return client.config.set(message.guild.id, true, 'welcomeEnabled');
    }

    if (args[0].toLowerCase() === 'disable') {
        if (client.config.get(message.guild.id).welcomeEnabled === false) {
            let embed = new MessageEmbed()
            .setDescription(`Welcome Messages are already disabled.`)
            .setColor('PURPLE');
            
            return message.channel.send(embed);
        }

        let embed = new MessageEmbed()
            .setDescription(`Welcome Messages have been disabled.`)
            .setColor('PURPLE');

        message.channel.send(embed);
        return client.config.set(message.guild.id, false, 'welcomeEnabled');
    }

    if (args[0].toLowerCase() === 'channel') {
        if (client.config.get(message.guild.id).welcomeEnabled === false) {
            let embed = new MessageEmbed()
            .setDescription(`Welcome Messages are disabled.`)
            .setColor('PURPLE');
            
            return message.channel.send(embed);
        }

        let channel = message.guild.channels.get(args[1]) || message.mentions.channels.first();
        if (!channel) return message.channel.send('Please enter a channel id or mention a channel.');

        if (client.config.get(message.guild.id).welcomeChannel === channel.id) {
            let embed = new MessageEmbed()
            .setDescription(`Welcome Messages Channel is already ${channel}.`)
            .setColor('PURPLE');
            
            return message.channel.send(embed);
        }

        let embed = new MessageEmbed()
            .setDescription(`Welcome Messages Channel has been changed to ${channel}.`)
            .setColor('PURPLE');

        message.channel.send(embed);
        return client.config.set(message.guild.id, channel.id, 'welcomeChannel');
    }

    if (args[0].toLowerCase() === 'message') {
        if (client.config.get(message.guild.id).welcomeEnabled === false) return message.channel.send('Welcome Messages is disabled.');

        let welcomeMessage = args.slice(1).join(" ");
        if (!welcomeMessage) return message.channel.send('Please enter a welcome message.');

        let embed = new MessageEmbed()
            .setDescription(`Welcome message has been changed to ${welcomeMessage}.`)
            .setColor('PURPLE');

        message.channel.send(embed);
        return client.config.set(message.guild.id, welcomeMessage, 'welcomeMessage');
    }
}

module.exports.config = {
    name: "welcome",
    aliases: [],
    usage: `welcome <enable, disable, channel, message> [channel id / mention | message]`,
    category: 'config'
}