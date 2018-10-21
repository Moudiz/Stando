module.exports.help = {
    name: 'top'
}
module.exports.run = async (client, message, commandArgs, Stands, boo, best, chan, talkedRecently) => {
    var Toppo = "```py\n";
    for(var i = 0; i < best.length; i ++){
        if(i == 10)
            break;
        Toppo += `[${i+1}]\t> #${client.users.get(best[i][1]).username}:\n\t\t\tTotal Points: ${best[i][0]}\n\n`
    }
    for (var i = 0; i < best.length; i++)
            if(best[i][1] == message.author.id)
                Toppo += `-------------------------------------\n# Your Stando Making Stats\nRank: ${i+1}\tTotal Points: ${best[i][0]}\n\`\`\``;
			else if(i == best.length - 1)
				Toppo += `-------------------------------------\n# Your Stando Making Stats\nRank: ${i+1}\tTotal Points: 0\n\`\`\``;
    //message.channel.send("**TOP 10 STANDO CREATORS: **");
    return message.channel.send("**TOP 10 STANDO CREATORS: **" + Toppo).catch(function(reason) {message.channel.send('Nobody has been rated yet lol')});   
}