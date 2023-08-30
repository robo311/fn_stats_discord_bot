const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Replies with information about current server.'),
	async execute(interaction) {
    
        console.log(interaction.guild)

        if(!interaction.inGuild()){
            interaction.reply({
                content: "You can only run this command inside a server!",
                ephemeral: true
            })
            return;
        }

		let embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`Server information`)
            .setAuthor({
                name: interaction.guild.name, 
                iconURL: interaction.guild.iconURL()
            })
            .addFields(
                {name: "Owner", value: `<@${interaction.guild.ownerId}>`, inline: true },
                {name: "Text Channels", value: `${interaction.guild.channels.cache.filter((c) => c.type === 0 ).toJSON().length}`, inline: true },
                {name: "Voice Channels", value: `${interaction.guild.channels.cache.filter((c) => c.type === 2 ).toJSON().length}`, inline: true },
                {name: "Number of members", value: `${interaction.guild.memberCount}`, inline: true },
                {name: "Number of roles", value: `${interaction.guild.roles.cache.size}`, inline: true },
                {name: "Number of roles", value: `${interaction.guild.roles.cache.size}`, inline: true },
                {name: "List of roles", value: `${interaction.guild.roles.cache.map((role) => "<@&" + role.id + ">")}` },
            )
            .setFooter({
                text: `Requested by: ${interaction.user.globalName} | Created: ${interaction.guild.createdAt.toDateString()}`,
                iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`
            })
                
				

        await interaction.reply({
            embeds: [embed]
        })
	},
};