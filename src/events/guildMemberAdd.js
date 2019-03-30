module.exports = async (client, member) => {
    let config = client.config.get(member.guild.id);

    if (config.welcomeEnabled === true) {
        let welcomeChannel = member.guild.channels.get(config.welcomeChannel);    
        let welcomeMessage = config.welcomeMessage.replace('<user>', member.user).replace('<server>', member.guild.name);

        welcomeChannel.send(welcomeMessage);
    }
};