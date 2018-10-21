const Discord = require('discord.js');

module.exports.help = {
	name: 'view'
}
module.exports.run = async (client, message, commandArgs, Stands, boo, best, chan, talkedRecently) => {
let toView = await Stands.findOne({where : {name: commandArgs} });
if(!toView){
	const allStands = await Stands.findAll();
	allStands.forEach(b => {
		if(b.name.toLowerCase() == commandArgs.toLowerCase())
			toView = b;			
	});
}

if(!commandArgs)	{
	const remp = await Stands.findOne({ where: { name: message.author.id} });
	toView = await Stands.findOne({where : {name: remp.user} });
}
		if(toView){
			var fcount = 0;
			await Stands.update({ ability: commandArgs }, {where: { name: message.author.id }});
			var standEmb = new Discord.RichEmbed()
            	.setColor('RANDOM')
            	.setTitle('**Stando: **')
				.setAuthor(`Now viewing ${ client.users.get(toView.username).username}'s Stando!`, client.users.get(toView.get('username')).avatarURL);
			if(toView.get('img') != null)
				standEmb
					.setImage(toView.img);
			standEmb
            	.addField('**Name: **', `**「${toView.name}」**`,true) 
				.addField('**Master:**', `${toView.user}`, true);
			fcount += 2;	
			if(toView.get('ref') != null){
					standEmb
						.addField('**Music ref:**',toView.ref);
					fcount ++;	
			}
			standEmb.addBlankField()
			try{
			if(toView.ability != null)
				standEmb.addField('**Ability:**', toView.ability + '\n');
			else standEmb.addField('**Ability:**','Not set.');

				fcount ++;
			}
			catch(err){
				var temp;
				var temp2 = " ";
				var temp3 = "";
				try{
					temp = toView.ability.split('\n')
				}
				catch(err){
					message.reply("The ability is too big, try making it paragraphs <3");
				}
				var lengthy = 0;
				var end = false;
				var cont = 0;
				for(var i = 0; i < temp.length; i ++){
					if(temp2.length + 1 < 1024){
						if(i != temp.length - 1){
						lenghty = temp[i + 1].length
						if(temp[i].length + lengthy + temp2.length + 2 < 1024){
							if(i == 0)
								temp2 += temp[i] + '\n' + temp[i+1];
							else temp2 += '\n' + temp[i] + '\n' + temp[i+1];
							i += 1;
						}}
						else if(temp[i].length + temp2.length + 1 < 1024){
							if(i == 0)
								temp2 += temp[i];
							else temp2 += '\n' + temp[i];
							
						}else end = true;
					} 
					if(end){
						if(temp3.length + 1 < 1024){
							if(i != temp.length - 1){
							if(temp[i].length + temp[i+1] . length + temp3.length + 2 < 1024){
								if(cont == 0)
									temp3 += temp[i] + '\n' + temp[i+1];
								else temp3 += '\n' + temp[i] + '\n' + temp[i+1];
								i += 1;
								cont ++;
							}}
							else if(temp[i].length + temp3.length + 1 < 1024){
								if(cont == 0)
									temp3 += temp[i];
								else temp3 += '\n' + temp[i];	
							}
						} 
					}					
				}
				standEmb.addField('**Ability (1/2):**', temp2 + '...');
				try{
					standEmb.addField('**Ability (2/2):**', '...' + temp3);
				} catch(erro){message.reply('Something went wrong!')};
			}
			try{
				if(toView.ap != null)
					standEmb.addField('**Appearance:**', toView.ap + '\n');
				else standEmb.addField('**Appearance:**','Not set.');
			}
			catch(ero){
				var temp;
				var temp2 = " ";
				var temp3 = "";
				try{
					temp = toView.ability.split('\n')
				}
				catch(err){
					message.reply("The appearance is too big, try making it in paragraphs <3");
				}
				var lengthy = 0;
				var end = false;
				var cont = 0;
				for(var i = 0; i < temp.length; i ++){
					if(temp2.length + 1 < 1024){
						if(i != temp.length - 1){
						lenghty = temp[i + 1].length
						if(temp[i].length + lengthy + temp2.length + 2 < 1024){
							if(i == 0)
								temp2 += temp[i] + '\n' + temp[i+1];
							else temp2 += '\n' + temp[i] + '\n' + temp[i+1];
							i += 1;
						}}
						else if(temp[i].length + temp2.length + 1 < 1024){
							if(i == 0)
								temp2 += temp[i];
							else temp2 += '\n' + temp[i];
							
						}else end = true;
					} 
					if(end){
						if(temp3.length + 1 < 1024){
							if(i != temp.length - 1){
							if(temp[i].length + temp[i+1] . length + temp3.length + 2 < 1024){
								if(cont == 0)
									temp3 += temp[i] + '\n' + temp[i+1];
								else temp3 += '\n' + temp[i] + '\n' + temp[i+1];
								i += 1;
								cont ++;
							}}
							else if(temp[i].length + temp3.length + 1 < 1024){
								if(cont == 0)
									temp3 += temp[i];
								else temp3 += '\n' + temp[i];	
							}
						} 
					}					
				}
				standEmb.addField('**Appearance (1/2):**', temp2 + '...');
				try{
					standEmb.addField('**Appearance (2/2):**', '...' + temp3);
				} catch(erro){message.reply('Something went wrong!')};
			}
			var statso = "";	
			if(toView.stats != null){	
				var tempo = toView.stats.split(',');
				var i;
				statso += '```py\n'
				for (i = 0; i < tempo.length; i++) { 
					switch(i){
						case 0:
							statso += '>>> Power (破壊力) - ' + tempo[i] + '\n';
							break;
						case 1:
							statso += '>>> Speed (スピード) - ' + tempo[i] + '\n';
							break;
						case 2:
							statso += '>>> Range (射程距離) - ' + tempo[i] + '\n';
							break;
						case 3:
							statso += '>>> Durability (持続力) - ' + tempo[i] + '\n';
							break;
						case 4:
							statso += '>>> Precision (精密動作性) - ' + tempo[i] + '\n';
							break;
						case 5:
							statso += '>>> Potential (成長性) - ' + tempo[i] + '\n';
							break;	
					}   
				}
				statso += '```';
			}
			else 	statso = "Not set.";
			standEmb
				.addField('**Stats: **', statso + '\n')
				.addField('``Points``', toView.rating);
			return(message.channel.send(standEmb));	
		}
		return(message.reply('Could not find ' + commandArgs));
}