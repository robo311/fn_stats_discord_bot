const { default: axios } = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {

	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Replies with Fortnite stats for user.')
		.addStringOption((option) => 
			option.setName('mode')
				.setDescription('Provide mode.')
				.setRequired(true)
				.addChoices(
					{name: 'solo', value: 'solo'},
					{name: 'duos', value: 'duos'},
					{name: 'squads', value: 'squads'},
					{name: 'overall', value: 'overall'}
				))
		.addStringOption((option) => 
			option.setName('username')
				.setDescription('Provide your username')
				.setRequired(true)
		)
		.addStringOption((option) => 
			option.setName('account_type')
				.setDescription('Provide your platform.')
				.addChoices(
					{name: 'epic', value: 'epic'},
					{name: 'xbox', value: 'xbl'},
					{name: 'playstation', value: 'psn'}
				))
		.addStringOption((option)=>
			option.setName('timeframe')
				.setDescription('Provide time frame of your statistics.')
				.addChoices(
					{name: 'lifetime', value:'lifetime'},
					{name: 'current_season', value: 'season'}
				)
			),
		
	async execute(interaction, client){

		console.log(interaction.options)
		let name = interaction.options.getString('username')
		let accountType = interaction.options.getString('accountType')
		let timeWindow = interaction.options.getString('timeframe')

		if(!accountType){
			accountType = "epic"
		}
		if(!timeWindow){
			timeWindow = "lifetime"
		}

		const url = `https://fortnite-api.com/v2/stats/br/v2?name=${name}&accountType=${accountType}&timeWindow=${timeWindow}`
		const config = {
			headers:{
				Authorization: "0fb8cc84-a908-44fe-be2b-d39218e47a6e"
			}
		}

		let req = await axios.get(url, config)
			.catch(console.error)
	
		if(!req) return interaction.reply({content: "An error occured, please try again later!"}) 
		
		req = req.data.data

		if(req){
			console.log(req.stats.all)
			let embed = ""
			if(interaction.options.getString('mode') === "solo") {
				embed = new EmbedBuilder()
				.setColor("Random")
				.setTitle(`Fortnite solo statistics for ${name}`)
				.addFields(
					{name: " ", value: " \n"}
				)
				.addFields(
					{name: "Wins", value: `${req.stats.all.solo.wins.toLocaleString()}`, inline: true},
					{name: "Winrate", value: `${req.stats.all.solo.winRate.toFixed(2)}%`, inline: true},
					{name: "Matches", value: `${req.stats.all.solo.matches.toLocaleString()}`, inline: true},
					{name: "Kills", value: `${req.stats.all.solo.kills.toLocaleString()}`, inline: true},
					{name: "K/D", value: `${req.stats.all.solo.kd.toFixed(2)}`, inline: true},
					{name: "Kills per match", value: `${req.stats.all.solo.killsPerMatch.toFixed(2)}`, inline: true},
					{name: "TOP 10", value: `${req.stats.all.solo.top10.toLocaleString()}`, inline: true},
					{name: "TOP 25", value: `${req.stats.all.solo.top25.toLocaleString()}`, inline: true},
					{name: "Players outlived", value: `${req.stats.all.solo.playersOutlived.toLocaleString()}`, inline: true},
				)
				.setFooter({
					text: `Requested by: ${interaction.user.globalName} | Created: ${interaction.guild.createdAt.toDateString()}`,
					iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`
				})
			}
			else if(interaction.options.getString("mode") === "duos"){
				embed = new EmbedBuilder()
				.setColor("Random")
				.setTitle(`Fortnite duos statistics for ${name}`)
				.addFields(
					{name: " ", value: " \n"}
				)
				.addFields(
					{name: "Wins", value: `${req.stats.all.duo.wins.toLocaleString()}`, inline: true},
					{name: "Winrate", value: `${req.stats.all.duo.winRate.toFixed(2)}%`, inline: true},
					{name: "Matches", value: `${req.stats.all.duo.matches.toLocaleString()}`, inline: true},
					{name: "Kills", value: `${req.stats.all.duo.kills.toLocaleString()}`, inline: true},
					{name: "K/D", value: `${req.stats.all.duo.kd.toFixed(2)}`, inline: true},
					{name: "Kills per match", value: `${req.stats.all.duo.killsPerMatch.toFixed(2)}`, inline: true},
					{name: "TOP 5", value: `${req.stats.all.duo.top5.toLocaleString()}`, inline: true},
					{name: "TOP 12", value: `${req.stats.all.duo.top12.toLocaleString()}`, inline: true},
					{name: "Players outlived", value: `${req.stats.all.duo.playersOutlived.toLocaleString()}`, inline: true},
				)
				.setFooter({
					text: `Requested by: ${interaction.user.globalName} | Created: ${interaction.guild.createdAt.toDateString()}`,
					iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`
				})
			}
			else if(interaction.options.getString("mode") === "squads"){
				embed = new EmbedBuilder()
				.setColor("Random")
				.setTitle(`Fortnite squads statistics for ${name}`)
				.addFields(
					{name: " ", value: " \n"}
				)
				.addFields(
					{name: "Wins", value: `${req.stats.all.squad.wins.toLocaleString()}`, inline: true},
					{name: "Winrate", value: `${req.stats.all.squad.winRate.toFixed(2)}%`, inline: true},
					{name: "Matches", value: `${req.stats.all.squad.matches.toLocaleString()}`, inline: true},
					{name: "Kills", value: `${req.stats.all.squad.kills.toLocaleString()}`, inline: true},
					{name: "K/D", value: `${req.stats.all.squad.kd.toFixed(2)}`, inline: true},
					{name: "Kills per match", value: `${req.stats.all.squad.killsPerMatch.toFixed(2)}`, inline: true},
					{name: "TOP 3", value: `${req.stats.all.squad.top3.toLocaleString()}`, inline: true},
					{name: "TOP 6", value: `${req.stats.all.squad.top6.toLocaleString()}`, inline: true},
					{name: "Players outlived", value: `${req.stats.all.squad.playersOutlived.toLocaleString()}`, inline: true},
				)
				.setFooter({
					text: `Requested by: ${interaction.user.globalName} | Created: ${interaction.guild.createdAt.toDateString()}`,
					iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`
				})
			}else if(interaction.options.getString("mode") === "overall"){
				embed = new EmbedBuilder()
				.setColor("Random")
				.setTitle(`Fortnite overall statistics for ${name}`)
				.addFields(
					{name: " ", value: " \n"}
				)
				.addFields(
					{name: "Wins", value: `${req.stats.all.overall.wins.toLocaleString()}`, inline: true},
					{name: "Winrate", value: `${req.stats.all.overall.winRate.toFixed(2)}%`, inline: true},
					{name: "Matches", value: `${req.stats.all.overall.matches.toLocaleString()}`, inline: true},
					{name: "Kills", value: `${req.stats.all.overall.kills.toLocaleString()}`, inline: true},
					{name: "K/D", value: `${req.stats.all.overall.kd.toFixed(2)}`, inline: true},
					{name: "Kills per match", value: `${req.stats.all.overall.killsPerMatch.toFixed(2)}`, inline: true},
					{name: "TOP 10", value: `${req.stats.all.overall.top10.toLocaleString()}`, inline: true},
					{name: "TOP 25", value: `${req.stats.all.overall.top25.toLocaleString()}`, inline: true},
					{name: "Players outlived", value: `${req.stats.all.overall.playersOutlived.toLocaleString()}`, inline: true},
				)
				.setFooter({
					text: `Requested by: ${interaction.user.globalName} | Created: ${interaction.guild.createdAt.toDateString()}`,
					iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`
				})
			}
			interaction.reply({
				embeds: [embed]
			})
		}else{
			let embed = new EmbedBuilder()
				.setColor("Red")
				.setTitle("There was an error.")
				.setDescription(`We were unable to get statistics for ${req.account.value}`)
			interaction.reply({
				embeds: [embed]
			})
		}
		
	}
};