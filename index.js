const talkedRecently = new Set();

const Discord = require ('discord.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const PREFIX = "!stando ";
const fs = require("fs");

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
var best = new Array();
var botchan = new Array();
var chan = new Array();
var boo = false;

/*const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
   	 const command = require(`./commands/${file}`);
    	client.commands.set(command.name, command);
	}*/

fs.readdir("./cmd/", (err,files) => {
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split('.').pop() === 'js');
	if(jsfiles.length <= 0) return console.log('No commands to load');
	console.log(`Loading ${jsfiles.length} commands.`)

	jsfiles.forEach((f,i) => {
		let props = require(`./cmd/${f}`);
		console.log(`${i + 1}. ${f} loaded.`);
		client.commands.set(props.help.name, props);
	});
});

const helpEmbed0 = new Discord.RichEmbed()
            .setColor('GREEN')
            .setTitle('**Introduction: **')
            .setAuthor('Standos by Moudiz (Experimental edition).', 'https://cdn.discordapp.com/avatars/212017536105971713/faa2d6c7a02d0bf718f0805dd03244fa.jpg?size=512')
			.setThumbnail('https://cdn.discordapp.com/avatars/439099572862713857/1f452d6eae7c985a4afc44950d95fec2.png?size=512')
            .addField('Hello there.', "\n\t**TL;DR: **Scroll to page 2.\n\n\tHmmm... I'd like you to know that this bot is experimental, it's my first bot and I'm not sure where it will go, I can't have it run 24/7 and my internet isn't the best for hosting lol. \n\n\tThe commands aren't the same as the ones that were used in the tag _(rip tags)_ and the prefix is **!stando** _(you prob already know that)_, this bot will allow you to have multiple standos and rep a stand (the creator will receive the points and hopefully there will be a leaderboards), you will be able to check any stand (based on name) and give rep to 'em (there is a delay to make things _fair_).\n\n\tI guess that's it for the first page, you can go to the second page which will show you the commands and how to use them, the text below will be for updates and maybe more, thanks for reading <3 (if there's any bad engrish let me know).")
            .addBlankField()
			.addField('Updates (and more):', "```\n - If you have any suggestion, let me know. Should I do a command for that?\n - If you leave view empty (!stando view) it will now view the stando that's being edited.\n" + 
			" - Help now works with numbers (!stando help 2 will go directly to page 2).\n - You can now remove any of your standos and not just the one that's being edited (!stando remove <Name>) not giving a name will delete the one being edited.\n" + 
			"```")
			.setFooter('Browsing <<	Help Page 1/4: Introduction	>> Initialization (1/2)');
	
const helpEmbed1 = new Discord.RichEmbed()
			.setColor('GREEN')
			.setTitle('**Initialization:** (Bot channel commands)')
			.setAuthor('Standos by Moudiz (Experimental edition).', 'https://cdn.discordapp.com/avatars/212017536105971713/faa2d6c7a02d0bf718f0805dd03244fa.jpg?size=512')
			.setThumbnail('https://cdn.discordapp.com/avatars/439099572862713857/1f452d6eae7c985a4afc44950d95fec2.png?size=512')
			.addField('Add/Create <name>', 'This will initialize your stando, the name will be used to add information to it.')
			.addBlankField()
			.addField('Remove/Delete <name>',' \tIf left blank the Stando that\'s being edited will be deleted.\n ')
			.addBlankField()
			.addField('Edit <name>', 'Will make your current selected stand the one that\'s being edited (useful later)')
			.addBlankField()
			.setFooter('Intoduction <<	Help Page 2/4: Initialization (1/2)	>> Initialization (2/2)');
const helpEmbed2 = new Discord.RichEmbed()
			.setColor('GREEN')
			.setTitle('**Initialization:** (Bot channel commands)')
			.setAuthor('Standos by Moudiz (Experimental edition).', 'https://cdn.discordapp.com/avatars/212017536105971713/faa2d6c7a02d0bf718f0805dd03244fa.jpg?size=512')
			.setThumbnail('https://cdn.discordapp.com/avatars/439099572862713857/1f452d6eae7c985a4afc44950d95fec2.png?size=512')		
			.addField('User/Master <info>', ' \n\tWill set the master of the stand being edited (`!stando edit <name>`) defaults to your username.\n ')
			.addBlankField()
			.addField('Appearance/Ap <info>', ' \n\tWill set the appearence info of the stando being edited (text).\n ')
			.addBlankField()
			.addField('Img <info> (optional)', ' \tA link of your stando\'s picture. ~~Attachments work too!~~\n ')
			.addBlankField()
			.addField('MRef/Ref <info> (optional)', ' \tA link to the ref song.\n ')
			.addBlankField()
			.addField('Ability/ab <info>',' \tInfo about the stando\'s ability.\n ')
			.addBlankField()
			.addField('Stats <Power, Speed, Range, Durability, Precision, Potential>',' \tWill set your stand\'s stats (you must seperate them by **commas \',\'**). ex: !stando stats A, B, C, D, E, C\n ')
			.addBlankField()
			.setFooter('Intoduction <<	Help Page 3/4: Initialization (2/2)	>> Browsing');

const helpEmbed3 = new Discord.RichEmbed()
			.setColor('GREEN')
			.setTitle('**Browsing:**')
			.setAuthor('Standos by Moudiz (Experimental edition).', 'https://cdn.discordapp.com/avatars/212017536105971713/faa2d6c7a02d0bf718f0805dd03244fa.jpg?size=512')
			.setThumbnail('https://cdn.discordapp.com/avatars/439099572862713857/1f452d6eae7c985a4afc44950d95fec2.png?size=512')
			.addField("Top", "Will show you the top 10 stando creators.")
			.addBlankField()
			.addField("List @<user>","Will list the user's standos.")
			.addBlankField()
			.addField("View <Stando Name>", "Will show you the stando's info, if left blank it will show you the one you're editing.")
			.addBlankField()
			.addField("Rep", "Will give a point to the mentioned stand (will count to the user too with a 30 min cooldown).")
			.addBlankField()
			.setFooter('Initialization (2/2) <<	Help Page 4/4: Browsing	>> Introduction');



var helpEmbed = [helpEmbed0,helpEmbed1,helpEmbed2,helpEmbed3,"**<@439099572862713857>  General Help**\n*The prefix is !stando. Names are case sensitive and unique, commands that require you to be in a bot channel are marked with ^, optionals are marked with $*\n**__Useful Commands:__**\n\n -**``!stando add/create <name>`` and ``remove/delete <name>``^\tCreates a Stando and begins editing it/Deletes the Stando that's being edited if left blank!**\n -**``!stando edit <name>``^ Finished editing your new Stando? This will allow you to edit another one.**\n -**``!stando appearance/ap`` and ``ability/ab``^ These will allow you to add info about the Stando that's being edited's ability/appearance. **\n -**``!stando img`` and ``mref/ref``^$ Will link a picture/Add the musical ref of your Stando!**\n -**``!stando view <Name>`` See the Stando's information, if left blank it will be the one you're currently editing (Global).**\n -**``!stando list @<user>`` List the user's Standos if left blank it will list yours.**\n -**``!stando rep <Name>`` and ``top`` Will rep the Stando, if left blank it will rep the last one you viewed/Will show you the top 10 stando creators (Global)**"];

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	operatorsAliases: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Stands = sequelize.define('standos', {
		name: {                     //stand name, unique cause logic
			type: Sequelize.STRING,
			unique: true,
		},
    	ability: Sequelize.TEXT,    //ability desc
		user: Sequelize.STRING,     //master
		username: Sequelize.STRING, //creator
		rating: {
			type: Sequelize.INTEGER, //rating
			defaultValue: 0,
			allowNull: false,
    	},
    	ref: Sequelize.STRING,       //link to music ref
    	img: Sequelize.STRING,       //link to stand img
    	stats: Sequelize.STRING,
    	ap: Sequelize.TEXT,          //Stand's ap (desc)
});

client.once('ready', async () => {
	//Stands.sync();
	const storedBalances = await Stands.findAll();
	storedBalances.forEach(b => {
		if(b.rating >= 0 && b.username == b.name){					//User Rate
			var temp = new Array(b.rating, b.username);
			best.push(temp);
		}
		if(b.rating < 0){			//Guild Bot Channels
			var temp2 = b.ability.split('\n');
			var temp3 = [b.name, temp2];
			botchan.push(temp3);
		}
	});
	
	best.sort(sortFunction).reverse();
	console.log('Ready!');
	client.user.setActivity("!stando help");
	var temp = client.guilds.array().join('\n');
	console.log(`In ${client.guilds.size -2} non testing servers! (2 for testing): \n${temp}`);
});

client.on("guildCreate", async guild => {
	console.log(`Joined ${guild.name}`);
	let defaultChannel = guild.defaultChannel;
	try{
		defaultChannel.send("Hello!\n``!stando help`` but first let a mod/Moudiz set up the bot channel with ``!stando bot #<Channel-Name>`` <:sans:433938682680967170>");
	}
	catch(err)
	{
		guild.channels.forEach((channel) => {
			if(channel.type == "text" && defaultChannel == "") {
			  if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
				  defaultChannel = channel;
				 }
			}
	  });
	  try{
	  	defaultChannel.send("<:sans:433938682680967170><:sans:433938682680967170>\tHenlo!\n``!stando help`` but first let a mod/Moudiz set up the bot channel with ``!stando bot #<Channel-Name>`` <:sans:433938682680967170>");
	  }
	  catch(err) {return;}
	}
}); 

client.on('message', async message => {

    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

	const input = message.content.slice(PREFIX.length).split(/ +/);
	const commandName = input.shift().toLowerCase();
	const commandArgs = input.join(' ');


	if(commandName == 'bot' && (message.author.id == '212017536105971713' || message.member.hasPermission("ADMINSTRATOR") || message.member.hasPermission("MANAGE_MESSAGES") || message.member.hasPermission("MUTE_MEMBERS"))){
		tempo = message.mentions.channels.array().join(',').split(',');
		var temp2 = "";
		for(var i = 0; i < tempo.length; i ++){
			if(i != tempo.length - 1)
				temp2 += tempo[i].substring(2, tempo[i].length - 1) + "\n";
			else
				temp2 += tempo[i].substring(2, tempo[i].length - 1);
		}
		//console.log(temp2)
		var tempo2 = temp2.split('\n');
		var temp = new Array(message.guild.id, tempo2);
		//console.log(temp);	  
		const remp = await Stands.findOne({ where: { name: message.guild.id} });
		//console.log('1');
		if(remp){
			const temp = await Stands.update({ability: temp2},{ where: { name: message.guild.id } });
			for (var i = 0; i < botchan.length; i++)
			if(botchan[i][0] == message.guild.id)
				botchan[i][1] == tempo2;
			message.channel.send("Bot channels updated!");
		}
		else{
			const tamp = await Stands.create({
				name: message.guild.id,
				username: message.guild.id,
				ability: temp2,
				rating: -1
			}).catch(function(err) {
				// print the error details
				console.log(err);
			});
			botchan.push([message.guild.id,tempo2]);
			message.channel.send(`Bot channels added!`);
		}		 	
	}

	for (var i = 0; i < botchan.length; i++)
		if(botchan[i][0] == message.guild.id)
			chan = botchan[i][1];
	try {
		for(var i = 0; i < chan.length;i++)
		if(chan[i] == message.channel.id){
			boo = true;
			break;
		}
		else
			boo = false;
	}
	catch(err) {						//NO BOT CHANNELS!
		console.log(err);
	}
	

	
	await Stands
		.findOrCreate({where: {username: message.author.id}, defaults: {name: message.author.id, ability: 'If you see this, it shouldn\'t be here, let me know...'}})
  		.spread((name, created) => { });

	if (commandName == "help"){
		if(commandArgs.toLowerCase() == "all" || commandArgs.toLowerCase() == "general")
			return message.channel.send(helpEmbed[4]);
		var count = 0;
		if(!isNaN(commandArgs.split(' ').shift()) && commandArgs.split(' ').shift() >= 1 && commandArgs.split(' ').shift() <= 4)
			count = commandArgs.split(' ').shift() - 1;				
			message.channel.send(helpEmbed[count]).then(msg => {
				msg.react('◀')
					.then(() => msg.react('⏹'))
					.then(() => msg.react('▶'))
					.then(() => msg.react('🔢'));
				const filter = (reaction, user) => {
					return (reaction.emoji.name === '◀' || reaction.emoji.name === '▶' || reaction.emoji.name === '⏹' || reaction.emoji.name === '🔢') && user.id === message.author.id;
				};
				const collector = msg.createReactionCollector(filter, { time: 60000 * 3 });


				collector.on('collect', (reaction, reactionCollector) => {
					switch(reaction.emoji.name) {
						case '▶':
							count++;
							if(count == helpEmbed.length - 1)
								count = 0;
							msg.edit(helpEmbed[count]);	
							reaction.remove(message.author.id).catch(function(reason) {
								console.log(`Missing perm \'MANAGE_MESSAGES\' ${message.guild.name}, can\'t remove user reaction.`);
							 });
							break;
						case '◀':
							count--;
							if(count < 0)
								count = helpEmbed.length - 2;
							msg.edit(helpEmbed[count]);	
							reaction.remove(message.author.id).catch(function(reason) {
								console.log(`Missing perm \'MANAGE_MESSAGES\' ${message.guild.name}, can\'t remove user reaction.`);
							 });
							break;
						case '⏹':
							msg.delete(10);
							message.delete().catch(function(reason) {
								console.log(`Missing perm \'MANAGE_MESSAGES\' ${message.guild.name}, can\'t delet dis.`);
							});
							collector.stop();
							break;
						case '🔢':
							const filter2 = response => {
								return response.content.startsWith('1') || response.content.startsWith('2') || response.content.startsWith('3');
							};
							message.channel.send("Select a number (1-3)").then((boi) => {
								const collector2 = message.channel.createMessageCollector(filter2, { time: 15000 });
								

								collector2.on('collect', m => {
									if(m.content.startsWith('1'))
										msg.edit(helpEmbed[0]);
									else if(m.content.startsWith('2'))
										msg.edit(helpEmbed[1]);
									else if(m.content.startsWith('3'))
										msg.edit(helpEmbed[2]);
									m.delete();
									boi.edit("Done!")	
									boi.delete(250).then(()  => {collector2.stop();});
								});

								collector2.on('end', collected => {
										boi.edit("Time expired...").catch(function(reason) {});
										boi.delete(500).catch(function(reason2) {});
								});

							});
							reaction.remove(message.author.id).catch(function(reason) {
								console.log(`Missing perm \'MANAGE_MESSAGES\' ${message.guild.name}, can\'t delet dis.`);
							 });
							break;			
						
					}	
					console.log(`Collected ${reaction.emoji.name}`);
				});

				collector.on('end', collected => {
					msg.clearReactions().catch(function(reason) {});
					msg.delete(60000 * 2).catch(function(reason) {});
					message.delete(1).catch(function(reason) {});
  					console.log(`Collected ${collected.size} emongos from ${message.author.username}.`);
				});
		})
	
	}

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

	if (!command) return;

	message.channel.startTyping();
	try {
		command.run(client, message, commandArgs, Stands, boo, best, chan, talkedRecently);
	}
	catch (error) {
		console.error(error);
		message.reply('err');
	}
	message.channel.stopTyping();
	});

client.login(process.env.BOT_TOKEN);

function sortFunction(a, b) {
	if (a[0] === b[0]) {
	 return 0;
 }
 else {
	 return (a[0] < b[0]) ? -1 : 1;
 }
}
