module.exports.help = {
    name: 'ref',
    aliases: ['mref']
}
module.exports.run = async (client, message, commandArgs, Stands, boo, best, chan, talkedRecently) => {
    if(boo){
        const temp = await Stands.findOne({where: {name: message.author.id}})
        const affectedRows = await Stands.update({ ref: commandArgs }, { where: { name: temp.user } });
        if (affectedRows > 0) {
            return message.channel.send(`**「${temp.user}」** was edited.`);
        }
        return message.reply(`Something went wrong!\nContact Moudiz or try again...`);
    } else try{
        message.reply('This command only works in a bot channel!\nThe bot channels are: <#' + chan.join("> <#") + ">");
        }
        catch(err){
            message.reply("No bot channels set, this is a bot channels command!");
        }
        return;	
}