const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    let config = client.config.get(message.guild.id);
    
    let embed = new MessageEmbed()
        .setTitle(`${message.guild.name}'s Configuration`)
        .setColor('PURPLE')
        .addField('Server Prefix', config.prefix)
        .addField('Welcoming Enabled', config.welcomeEnabled ? "Enabled" : "Disabled")
        .addField('Moderation Logs Enabled', config.modLogsEnabled ? "Enabled" : "Disabled")
        .addField('Administrator List', config.administrators.length > 0 ? config.administrators.map(a => `<@&${a}>`).join(' ') : "No Administrator Roles")
        .addField('Moderator List', config.moderators.length > 0 ? config.moderators.map(m => `<@&${m}>`).join(' ') : "No Moderator Roles")

    if (config.welcomeEnabled === true) {
        embed
        .addField('Welcome Message', `${config.welcomeMessage}`)
        .addField('Welcome Channel', config.welcomeChannel !== undefined ? `<#${config.welcomeChannel.replace('<user>', message.author).replace('<server>', message.guild.name)}>` : `Set with ${config.prefix}welcome channel <channel id / mention>`);
    }

    if (config.modLogsEnabled === true) embed.addField('Moderator Logging Channel', config.modLogsChannel !== undefined ? `<#${config.modLogsChannel}>` : `Set with ${config.prefix}modlog channel <channel id / mention>`);
    
    message.channel.send(embed);
}

module.exports.config = {
    name: "showconfig",
    aliases: ["showcfg", "cfg", "config"],
    usage: `showconfig`,
    category: 'config'
}