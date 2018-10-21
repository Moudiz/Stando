module.exports.help = {
    name: 'add',
    aliases: ['create']
}
module.exports.run = async (client, message, commandArgs, Stands, boo, best, chan, talkedRecently) => {
        if(boo){
				try { var check = 0;
			// equivalent to: INSERT INTO standos (name, descrption, username) values (?, ?, ?);
				const allStands = await Stands.findAll();
				allStands.forEach(b => {
					if(b.name.toLowerCase() == commandArgs.toLowerCase()){
						message.reply('Nani?!\nThat stando already exists!');
						check +=1;
					}	
				});
				if(check != 0) return;
				const brando = await Stands.create({
					name: commandArgs,
					username: message.author.id,
					user: message.author.username,
				});
				await Stands.update({user: commandArgs},{ where: { name: message.author.id } });
				return message.channel.send(`**「${brando.name}」** is manifested - now editing.`);
			}
			catch (e) {
				if (e.name === 'SequelizeUniqueConstraintError') {
					return message.reply('Nani?!\nThat stando already exists!');
				}
				return message.reply('Something went wrong while shooting the arrow (retry).');
			}
		} else try{
			message.reply('This command only works in a bot channel!\nThe bot channels are: <#' + chan.join("> <#") + ">");
			}
			catch(err){
				message.reply("No bot channels set, this is a bot channels command!");
			}
			return;
    }