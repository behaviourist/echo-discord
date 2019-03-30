const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!client.config.get(message.guild.id).administrators.some(a => message.member.roles.has(a)) && message.author.id !== process.env.OWNER) return message.channel.send('One of your roles must be in the administrator list to use this command.');
    
    let role = message.guild.roles.get(args[0]) || message.mentions.roles.first();
    if (!role) return message.channel.send(`Please use \`${client.config.get(message.guild.id).prefix}help addadmin\` to get help on this command.`);

    if (client.config.get(message.guild.id).administrators.includes(role.id)) return message.channel.send('That role is already in the administrator list.');

    let embed = new MessageEmbed()
        .setTitle(`${role.name} was added to the administrator list`)
        .setColor('PURPLE');

    message.channel.send(embed);

    return client.config.push(message.guild.id, role.id, 'administrators');
}

module.exports.config = {
    name: "addadmin",
    aliases: ["newadmin", "aa"],
    usage: `addadmin <role id / mention>`,
    category: 'config'
}