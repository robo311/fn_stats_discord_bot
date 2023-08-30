const { default: axios } = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('news')
		.setDescription('Replies with current news from the game.'),
	async execute(interaction) {


        const url = `https://fortnite-api.com/v2/news`
		
		let req = await axios.get(url)
			.catch(console.error)
	
		if(!req) return interaction.reply({content: "An error occured, please try again later!"})

        req = req.data.data

        if(req){
            console.log(req)

            let embed = new EmbedBuilder()
				.setColor("Random")
				.setTitle(`Fortnite BR news`).setURL(req.br.image)
				.setAuthor({
					name: `Requested by: ${interaction.user.globalName}`,
					iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`
				})
				.setImage(`${req.br.image}`)

            await interaction.reply({
                embeds: [embed]
            })
        }else{
			let embed = new EmbedBuilder()
				.setColor("Red")
				.setTitle("There was an error.")
				.setDescription(`We were unable to get statistics for ${req.account.value}`)
			await interaction.reply({
				embeds: [embed]
			})
		}
	},
};