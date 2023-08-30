const { default: axios } = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('aes')
		.setDescription('Replies with current AES key.'),
	async execute(interaction) {


        const url = `https://fortnite-api.com/v2/aes`
		
		let req = await axios.get(url)
			.catch(console.error)
	
		if(!req) return interaction.reply({content: "An error occured, please try again later!"})

        req = req.data.data

        if(req){
            console.log(req)

            let embed = new EmbedBuilder()
				.setColor("Random")
				.setTitle(`AES Keys`)
				.setAuthor({
					name: `Requested by: ${interaction.user.globalName}`,
					iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`
				})
				.addFields(
					{name: "Build", value: `${req.build}`},
				)
                .addFields(
					{name: "Main AES key", value: `${req.mainKey} \n`},
				)
                .addFields(
					{name: " \n", value: ` \n`},
				)
                .addFields(
					{name: "Other files", value: ` \n`},
				)

                
            req.dynamicKeys.map((key)=> {
                if(key.pakFilename.endsWith(".pak")){
                    embed.addFields(
                        {name: "File name:", value: key.pakFilename },
                        {name: "AES key", value: key.key},
                        {name: " \n", value: " \n" },
                    )
                   
                }
            })
                

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