const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Replies with information about current server.'),
	async execute(interaction) {
    
        console.log(interaction.guild.channels.cache)

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
                {name: "Owner", value: `<@${interaction.guild.ownerId}>`}
            )
            .setFooter({
                text: `Requested by: ${interaction.user.globalName}`,
                iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`
            })
                
				

        await interaction.reply({
            embeds: [embed]
        })
	},
};