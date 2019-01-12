const Discord = require('discord.js');
exports.run = async (bot, guild) => {
	  const invite = await guild.channels.random().createInvite({
        maxAge: 0
    });
    let guildCreateChannel = bot.channels.get('531493786342391809');
   // guild.createChannel("bot-logs", "text");
    let joinEmbed = new Discord.RichEmbed()
    .setTitle("Le bot a rejoin un nouveau serveur")
    .setThumbnail(guild.iconURL)
    .addField(`Nom du serveur :`, `${guild.name}`)
    .addField(`Serveur ID:`, `${guild.id}`)
    .addField(`Serveur Region`, `${guild.region}`)
    .addField(`Serveur Owner :`, `${guild.owner}`)
    .addField(`nombre de membres :`, `${guild.memberCount}`)
    .addField(`Serveur Invite :`, `${invite.url}`)
    .setColor("#4286f4")
    .setFooter(`${bot.guilds.size} serveur <3`)
    .setTimestamp();
    guildCreateChannel.send(joinEmbed);
	}