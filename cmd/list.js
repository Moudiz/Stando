const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports.help = {
    name: 'list'
}
module.exports.run = async (client, message, commandArgs, Stands, boo, best, chan, talkedRecently) => {
var who = "";			//Checked.
		if (!message.mentions.users.size)
			if(!commandArgs)
				who = message.author.id;
			else {
				var temp = client.users.find(member => member.username.toLowerCase() == commandArgs.toLowerCase());
				if(!temp) return message.reply(`Could not find ${commandArgs} (they prob don't have a stando)`);
				who = temp.id;
			}
		else
			who = message.mentions.users.first().id;
		const standList = await Stands.findAll({ attributes: ['name'] , where: {username: who, name: {[Op.ne]: who}}});
		const tagString = standList.map(t => t.name).join('\n') || 'This user has no standos!';
		return message.channel.send(`**List of standos:**\n${tagString}`);
}