module.exports.help = {
	name: 'rep'
}
module.exports.run = async (client, message, commandArgs, Stands, boo, best, chan, talkedRecently) => {
if (talkedRecently.has(message.author.id)) {
            message.reply("Wait 30 minute before getting typing this again.");
		} 
		else {
			var whom;
			if(commandArgs == null){
			const who = await Stands.findOne({where: {name: message.author.id}});
			whom = await Stands.findOne({ where: {name: who.ability} });
			}
			else whom = await Stands.findOne({ where: {name: commandArgs}});
			if(whom){
				if(whom.username == message.author.id)
					return message.channel.send("You can't rep yourself!");
				var ratingA = whom.rating + 1;
				const hak = await whom.update({ rating: ratingA});
				for (var i = 0; i < best.length; i++)
					if(best[i][1] == whom.username){
						ratingA = best[i][0] + 1;
						best[i][0] += 1;
					}
				best.sort(sortFunction).reverse();		
				const hah = await Stands.update({ rating: ratingA}, { where: {name: whom.username, username: whom.username} });
				message.channel.send(`Gave ${client.users.get(whom.username).username}'s ${whom.name} a point.`)
			}
			else return message.reply("Stand not found!");

       		talkedRecently.add(message.author.id);
        	setTimeout(() => {
          		talkedRecently.delete(message.author.id);
				}, 60000 * 30);
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