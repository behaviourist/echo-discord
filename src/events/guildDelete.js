module.exports = async (client, guild) => {
    client.config.delete(guild.id);
};