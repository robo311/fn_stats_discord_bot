const { default: axios } = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('map')
		.setDescription('Replies with image of the current Fortnite map.')
        .addStringOption((option) =>
            option.setName('type')
                .setDescription('Type of the map.')
                .addChoices(
                    {name: "blank", value: "blank"},
                    {name: "pois", value: "pois"}
                )
        ),
	async execute(interaction) {


        const url = `https://fortnite-api.com/v1/map`
		
		let req = await axios.get(url)
			.catch(console.error)
	
		if(!req) return interaction.reply({content: "An error occured, please try again later!"})

        req = req.data.data

        if(req){

            let embed = new EmbedBuilder()
				.setColor("Random")
				.setTitle(`BR Map`)
				.setImage(interaction.options.getString("type") === "pois" ? req.images.pois : req.images.blank)
				.setFooter({
					text: `Requested by: ${interaction.user.globalName} | Created: ${interaction.guild.createdAt.toDateString()}`,
					iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`
				})

            

            await interaction.reply({
                embeds: [embed]
            })
        }else{
			let embed = new EmbedBuilder()
				.setColor("Red")
				.setTitle("There was an error.")
				.setDescription(`We were unable to get the map for ${req.account.value}`)
			await interaction.reply({
				embeds: [embed]
			})
		}

		
	},
};