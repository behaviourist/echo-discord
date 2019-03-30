require('dotenv-flow').config();

module.exports = async (client, message) => {
    let adminRoles = []; 
    message.guild.roles.map(role => role.permissions.has('ADMINISTRATOR') || role.permissions.has('MANAGE_GUILD') ? adminRoles.push(role.id) : null);

    const defaultSettings = {
        prefix: "e!",
        modLogsEnabled: false,
        modLogsChannel: undefined,
        moderators: [],
        administrators: adminRoles,
        welcomeEnabled: false,
        welcomeChannel: undefined,
        welcomeMessage: "Welcome <user> to <server>! Have a great time."
    };

    if (message.author.bot || !message.guild) return;
    let guildConf = client.config.ensure(message.guild.id, defaultSettings);
    if (!message.content.includes(guildConf.prefix)) return;

    const args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let retrievedCommand = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!retrievedCommand) return;

    retrievedCommand.run(client, message, args);
};