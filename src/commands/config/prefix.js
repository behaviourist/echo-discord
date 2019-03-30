const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (args[0]) {
        if (!client.config.get(message.guild.id).administrators.some(a => message.member.roles.has(a)) && message.author.id !== process.env.OWNER) return message.channel.send('One of your roles must be in the administrator list to use this command.');
    
        let embed = new MessageEmbed()
            .setTitle(`\`prefix\` has been changed to \`${args.join(" ")}\`.`)
            .setColor('PURPLE');

        message.channel.send(embed);

        return client.config.set(message.guild.id, args.join(" "), 'prefix');
    } else {
        let embed = new MessageEmbed()
            .setTitle(`${message.guild.name}'s current prefix is ${client.config.get(message.guild.id).prefix}`)
            .setColor('PURPLE')
            .setFooter(`Admins: change the prefix by using ${client.config.get(message.guild.id).prefix}prefix [new prefix]`);

        message.channel.send(embed);
    }
}

module.exports.config = {
    name: "prefix",
    aliases: [],
    usage: `prefix [new prefix]`,
    category: 'config'
}