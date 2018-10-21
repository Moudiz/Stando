module.exports.help = {
    name: 'remove',
    aliases: ['delete']
}
module.exports.run = async (client, message, commandArgs, Stands, boo, best, chan, talkedRecently) => {
    if(boo/* && message.author.id == '212017536105971713'*/){
		let temp = await Stands.findOne({where: {name: message.author.id}});
		let temp2 = await Stands.findOne({where: {name: temp.user}});
		var eb = 0;
		if(commandArgs){
			temp2 = await Stands.findOne({ where: { name: commandArgs , username: message.author.id} });
			eb = 1;
			if(!temp2 || commandArgs == message.author.id) return message.reply(`**${commandArgs}** doesn't exist or you haven't created it!`);
		} 

	message.channel.send(`Are you sure you want to delete **${temp2.name}**?\n1. Type \`\`confirm\`\` to confrim your decision.\n2. Type \`\`cancel\`\` to... cancel your decision.`)
	.then(async msg => {
		const filter = m => {return m.author.id === message.author.id;};
		const collector = msg.channel.createMessageCollector(filter, { time: 15000 * 2});
		
		collector.on('collect', async m => {
			if(m.content.includes('confirm')){
				var ratingA = temp.rating - temp2.rating;
				await Stands.update({ rating: ratingA }, { where: { name: temp.username } });

				for (var i = 0; i < best.length; i++)
					if(best[i][1] == temp.username)
						best[i][0] -= temp2.rating;
				best.sort(sortFunction).reverse();
				var namee = temp2.name;
				const rowCount = await temp2.destroy(/*{ where: { name: temp.user } }*/);
				if (!rowCount) return message.reply('That stand doesn\'t exist.');
				message.channel.send(`**「${namee}」**'s user was killed :c`);
				if(eb == 0)
				temp.update({user: null});
				m.delete(666);
				collector.stop();
			}
			else if(m.content.includes('cancel')) {
				m.delete(666);
				collector.stop();
			}
		});

		collector.on('end', collected => {
			msg.delete(666);
			message.delete(666);
		});
		
	});
		return;	
    } else try{
        	message.reply('This command only works in a bot channel!\nThe bot channels are: <#' + chan.join("> <#") + ">");
        }
        catch(err){
            message.reply("No bot channels set, this is a bot channels command!");
        }
        return;	
}

function sortFunction(a, b) {
	if (a[0] === b[0]) {
	 return 0;
 }
 else {
	 return (a[0] < b[0]) ? -1 : 1;
 }
}