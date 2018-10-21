module.exports.help = {
    name: 'ban'
}
module.exports.run = async (client, message, commandArgs, Stands, boo, best, chan, talkedRecently) => {
		var temp2 = commandArgs.split(' ');
		var temp = temp2.shift();
	return message.channel.send(`"Banned" ${temp} for ${temp2.join(' ')} <:sans:433938682680967170>`);
}