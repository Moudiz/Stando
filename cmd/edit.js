module.exports.help = {
    name: 'edit'
}
module.exports.run = async (client, message, commandArgs, Stands, boo, best, chan, talkedRecently) => {
    if(boo){
		let remp = await Stands.findOne({ where: { name: commandArgs , username: message.author.id} });
		if(!remp){
			const allStands = await Stands.findAll({ where: {username: message.author.id} });
			allStands.forEach(b => {
				if(/*b.username == message.author.id && */b.name.toLowerCase() == commandArgs.toLowerCase())
					remp = b;
			});
		}
		if(remp  && message.author.id != remp.name){
			const temp = await Stands.update({user: commandArgs},{ where: { name: message.author.id } });
			return message.channel.send(`Editing **「${remp.name}」**!`)
		}
		return message.reply(`**${commandArgs}** doesn't exist or you haven't created it!`);
		} else try{
			message.reply('This command only works in a bot channel!\nThe bot channels are: <#' + chan.join("> <#") + ">");
			}
			catch(err){
				message.reply("No bot channels set, this is a bot channels command!");
			}
			return;
}