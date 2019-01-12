const discord = require('discord.js');
var bot = new discord.Client();
var Discord = discord
var client = bot
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const db = low(adapter)
const fs = require("fs")
const math = require('mathjs');


const express = require('express');
const app = express();




//DEBUT PARAGRAPHE HEROKU
app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), function(){
    console.log(`bot en fonctionnement sur le port ${app.get('port')}`)
})

const DBL = require("dblapi.js");
const dbl = new DBL(process.env.TOKEN2, bot);




var prefix = ("v/");
var randnum = 0;

bot.on('ready', () => {

  setInterval(() => {
    dbl.postStats(bot.guilds.size);
}, 8000)
  

  console.log ("bot ready !" + bot.guilds.size )

  setInterval(() => {
  bot.user.setActivity(`[v/help] ${bot.guilds.size} serveurs. V1.0.2`, { type: "STREAMING", url: "https://www.twitch.tv/omega33" });
  var status = [
      `[v/help] ${bot.guilds.size} serveurs. V1.0.2`
  ];
}, 7200)
  setInterval(() => {
      let gameval = Math.floor((Math.random() * status.length));
      bot.user.setActivity(`${status[gameval]}`, { type: "STREAMING", url: "https://www.twitch.tv/omega33" });
  }, 10 * 1000);


});






bot.login(process.env.TOKEN);


let warns = JSON.parse(fs.readFileSync("./data/warns.json", "utf8"));
let inline = true

  
bot.on ('message' , message=> { 
  
    
    var args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
     
    var msgauthor = message.author.id;
    const moment = require('moment');


    if (message.author.bot)return;

   
     if (!message.content.startsWith(prefix)) return;
     var args = message.content.substring(prefix.length).split(" ");

     switch (args[0].toLowerCase()){
         


        case "profile":

        const status = {
          online: "Online",
          offline: "Offline/Invisible "
        }

        var arg = message.content.substring(prefix.length).split(" ");

        const member = message.mentions.members.first() || message.guild.members.get(arg[0]) || message.member;

              
        var msgnom = message.mentions.members.first(); 


        var infomember = message.mentions.members.first();
        
        var usercreated_date = moment(member.user.createdTimestamp).format("DD/MM/YYYY - HH:mm:ss");
        var userjoining_date = moment(member.joinedTimestamp).format("DD/MM/YYYY - HH:mm:ss");
   
                             
          
         var stats_embed = new discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(`profile utilisateur :`)
         .addField("nom de l'utilisateur :", message.author.username)
         .addField("user ID :", msgauthor, true)
         .addField('Dernier message :', member.lastMessage, true)
         .addField("Status :", `${status[member.user.presence.status]}`, inline, true)
         .addField("jeux :", `${member.user.presence.game ? `${member.user.presence.game.name}` : "ne joue a rien"}`,inline, true)
         .addField("**Compte créer le : **", usercreated_date, true)
         .addField("**Date d'arriver : **", userjoining_date, true)
         .addField("Roles :", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "l'utilisateur n'a pas de role"}`)
         .setThumbnail(message.author.avatarURL)
         console.log('cmd profile')
         
         if(message.mentions.users.size === 0) {
      
          return message.channel.send(stats_embed)
          

        }else{        

          var infomember = message.mentions.members.first();
          var infouser = infomember.user;
          var usercreated_date = moment(infouser.createdTimestamp).format("DD/MM/YYYY - HH:mm:ss");
          var userjoining_date = moment(infomember.joinedTimestamp).format("DD/MM/YYYY - HH:mm:ss");
          var msgmention = message.mentions.members.first().id;
 
          var profilede_embed = new discord.RichEmbed()
          .setColor('RANDOM')
          .setTitle(`profile utilisateur :`)
          .addField("nom de l'utilisateur :", msgnom)
          .addField("user ID :", msgmention, true)
          .addField('Dernier message : ', infomember.lastMessage, true)
          .addField("Status :", `${status[member.user.presence.status]}`, inline, true)
          .addField("jeux :", `${member.user.presence.game ? `${member.user.presence.game.name}` : "ne joue a rien"}`,inline, true)
          .addField("Compte créer le : ", usercreated_date, true)
          .addField("Date d'arriver : ", userjoining_date, true)
          .addField("Roles :", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "l'utilisateur n'a pas de role"}`)
          .setThumbnail(message.mentions.members.first().user.avatarURL)
          console.log('cmd profile')
          
 
          message.channel.send({embed: profilede_embed})

        }

        break;



        case "logo":

        var msgnom = message.mentions.members.first();
 
        var logo_embed = new discord.RichEmbed()   
        .setColor('#25c059')
        .setTitle("**Voici ton logo**")
        .setImage(message.author.avatarURL)
        console.log('cmd logo')
 
        if(message.mentions.users.size === 0) {
      
         return message.channel.send(logo_embed);
        
       }else{
 
         var logode_embed = new discord.RichEmbed()
         .setColor('#25c059')
         .addField("**Voici le logo de**", msgnom)
         .setImage(message.mentions.members.first().user.avatarURL)
         message.channel.send(logode_embed)
         console.log('cmd logo')
 
       }
 
        break;

        case "8ball":
        let args = message.content.split(" ").slice(1);
        let tte = args.join(" ")
        if (!tte){
        return message.reply("Merci une question :8ball:")};

        var replys = [
            "Oui",
            "Non",
            "Je ne sais pas",
            "Peut-`ètre",
            "Certainement",
            "possible"
        ];
        let reponse = (replys[Math.floor(Math.random() * replys.length)])
        var b_embed = new discord.RichEmbed()
        .setDescription("**__:8ball: 8ball :8ball:__**")
        .addField("__Question:__", tte)
        .addField("__Réponse:__", reponse)
        message.channel.send(b_embed)
        message.delete(1000);
        console.log('cmd 8ball')

        break;      

}

    

    if (message.content === prefix + "logobot"){
        var logobot_embed = new discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("**Voici le logo du bot**")
        .setImage(bot.user.avatarURL)
        message.channel.send(logobot_embed)
        console.log('cmd logobot')

    }

    if (message.guild.emojis.size === 0) {
      emojis = 'Aucun';
  } else {
      emojis = message.channel.guild.emojis.map(e => e).join(" ");
  }

    if (message.content === prefix + "hh"){

      if(!message.member.hasPermission('MANAGE_MESSAGES') )

  
      return

      var helphh_embed = new discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle("**×HELP!**")
      .setDescription(` **SALUT ${message.author.username} !**\n \n **--------------** `)

      .addField("**__►FUN__**", "v/love == voyez si sa match entre vous\nv/say == Faites dire ce que vous voulez au bot\nv/8ball == Posez lui une question il vous répondra. \nv/roll == Vous donne un chifre entre 1 et 10. \nv/choose <propisitions1 | propisitions2> == Le bot va faire un choix. \nv/bvn == Souhaitez la bienvenue aux nouveaux. \nv/piece == Pile ou face.\n \n **--------------**\n  ")

      .addField("**__►MODÉRATION__**", "v/clear <nombres> == Clear le nombre de messages demandé.\nv/mute == Pour mute une personne. \nv/unmute == Pour unmute une personne.\n \n**--------------**\n")

      .addField("**__►IMAGES__**","v/logo <pseudo> == Vous affiche votre logo.\nv/logobot == Affiche le logo du bot.\n \n**--------------**\n")

      .addField("**__►AUTRES__**", "v/maj == Vous pouvez voir la dernière maj du bot\nv/calc == Permet de resoudre un calcul.\nv/poll == Faite un strawpoll.\nv/serverstats == Vous affiche les stats du serveur.\nv/profile <pseudo> == vous afichera votre profile\nv/stats = affichera les stats du bot \n \n**--------------**\n")

      .addField('**__►LINK__**', `Invite Link [**CLICK !**](https://discordapp.com/oauth2/authorize?client_id=406066553751076864&scope=bot&permissions=2146958591)\n Serveur discord  [**CLICK !**](https://discord.gg/3JuDXCC) `)
      .setFooter("Bot Programmé par omega#9187")
      console.log('cmd demande help')

    message.channel.send(helphh_embed);


  }


  if (message.content === prefix + "help"){
    message.channel.send(`**Help envoyé en message privé ${message.author.username} !**`)

    var help_embed = new discord.RichEmbed()
    .setColor('RANDOM')
      .setTitle("**×HELP!**")
      .setDescription(` **SALUT ${message.author.username} !**\n \n **--------------** `)

      .addField("**__►FUN__**", "v/love == voyez si sa match entre vous\nv/say == Faites dire ce que vous voulez au bot\nv/8ball == Posez lui une question il vous répondra. \nv/roll == Vous donne un chifre entre 1 et 10. \nv/choose <propisitions1 | propisitions2> == Le bot va faire un choix. \nv/bvn == Souhaitez la bienvenue aux nouveaux. \nv/piece == Pile ou face.\n \n **--------------**\n  ")

      .addField("**__►MODÉRATION__**", "v/clear <nombres> == Clear le nombre de messages demandé.\nv/mute == Pour mute une personne. \nv/unmute == Pour unmute une personne.\n \n**--------------**\n")

      .addField("**__►IMAGES__**","v/logo <pseudo> == Vous affiche votre logo.\nv/logobot == Affiche le logo du bot.\n \n**--------------**\n")

      .addField("**__►AUTRES__**", "v/maj == Vous pouvez voir la dernière maj du bot\nv/calc == Permet de resoudre un calcul.\nv/poll == Faite un strawpoll.\nv/serverstats == Vous affiche les stats du serveur.\nv/profile <pseudo> == vous afichera votre profile\nv/stats = affichera les stats du bot \n \n**--------------**\n")

      .addField('**__►LINK__**', `Invite Link [**CLICK !**](https://discordapp.com/oauth2/authorize?client_id=406066553751076864&scope=bot&permissions=2146958591)\n Serveur discord  [**CLICK !**](https://discord.gg/3JuDXCC) `)
      .setFooter("Bot Programmé par omega#9187")
      console.log('cmd demande help')

       
    message.author.send(help_embed);
  

}


if (message.content === prefix + "hha"){

  if (message.author.id !== "280753236548386816")


  return

  var helphh_embed = new discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle("**×HELP!**")
  .setDescription(` **SALUT ${message.author.username} !**\n \n **--------------** `)

  .addField("**__►FUN__**", "v/love == voyez si sa match entre vous\nv/say == Faites dire ce que vous voulez au bot\nv/8ball == Posez lui une question il vous répondra. \nv/roll == Vous donne un chifre entre 1 et 10. \nv/choose <propisitions1 | propisitions2> == Le bot va faire un choix. \nv/bvn == Souhaitez la bienvenue aux nouveaux. \nv/piece == Pile ou face.\n \n **--------------**\n  ")

  .addField("**__►MODÉRATION__**", "v/clear <nombres> == Clear le nombre de messages demandé.\nv/mute == Pour mute une personne. \nv/unmute == Pour unmute une personne.\n \n**--------------**\n")

  .addField("**__►IMAGES__**","v/logo <pseudo> == Vous affiche votre logo.\nv/logobot == Affiche le logo du bot.\n \n**--------------**\n")

  .addField("**__►AUTRES__**", "v/maj == Vous pouvez voir la dernière maj du bot\nv/calc == Permet de resoudre un calcul.\nv/poll == Faite un strawpoll.\nv/serverstats == Vous affiche les stats du serveur.\nv/profile <pseudo> == vous afichera votre profile\nv/stats = affichera les stats du bot \n \n**--------------**\n")

  .addField('**__►LINK__**', `Invite Link [**CLICK !**](https://discordapp.com/oauth2/authorize?client_id=406066553751076864&scope=bot&permissions=2146958591)\n Serveur discord  [**CLICK !**](https://discord.gg/3JuDXCC) `)
  .setFooter("Bot Programmé par omega#9187")
  console.log('cmd demande help')

message.channel.send(helphh_embed);


}


if(message.content === (prefix + "maj")){




  var maj_embed = new discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("**Mise à jour**")
    .setDescription("Voici les nouvautées du bot :")

    .addField("**Nouvelle(s) commande(s) :**", "``v/say``\n``v/maj``\n``v/love``")

    .addField("**Autre :**", "La commande ``v/help`` a était mis à jour.\nLa commande ``v/stats`` a aussi était mise à jour.\nLe bug de la commande ``v/profile`` à aussi était corrigé.")
    .setFooter("Bot Programmé par omega#9187")
    console.log('cmd maj')


  message.channel.send(maj_embed);


}


if(message.content.startsWith(prefix + "say")){
  console.log('cmd say')
	
  message.delete(message.author);

var text = message.content.split(' ').slice(1).join(' ')
if(!text) return message.channel.send(' ? ')
message.channel.send(text)
}



  let memberCount = message.guild.memberCount
  let humain = message.guild.members.filter(m => !m.user.bot).size
  let bots = memberCount - humain
  let online = message.guild.presences.size
  var guild_date = moment(message.guild.createdAt).format("DD/MM/YYYY - HH:mm:ss");
  var grade = message.guild.roles.filter(r => r.id !== message.guild.id).map(r => r.name).join(', ')

  var emojis;
  if (message.guild.emojis.size === 0) {
      emojis = 'Aucun';
  } else {
      emojis = message.channel.guild.emojis.map(e => e).join(" ");
  }


  if (message.content === prefix + "serverstats"){
    console.log('cmd serverstats')

    let sicon = message.guild.iconURL;


    var server_embed = new discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(message.guild.name, sicon)
        .setThumbnail(message.guild.iconURL)
        .addField("Propriétaire du serveur", message.guild.owner, inline)
        .addField("ID -", message.guild.id, inline)
        .addField("Membres", memberCount, inline)
        .addField("humains", humain, inline)
        .addField("Bots", bots, inline)
        .addField("En ligne", online ,inline)
        .addField("Rôles", message.guild.roles.size, inline)
        .addField("Channels", message.guild.channels.size, inline)
        .addField("Création du serveur", guild_date, inline)
        .addField("Région", message.guild.region, inline)
        .addField("liste des grades", grade)      
        .addField("liste des émojis", emojis)

        

        message.channel.send(server_embed)



  };

  if (message.content === prefix + "si"){


    console.log('cmd serverstats')

    let sicon = message.guild.iconURL;


    var si_embed = new discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(message.guild.name, sicon)
        .setThumbnail(message.guild.iconURL)
        .addField("Propriétaire du serveur", message.guild.owner, inline)
        .addField("ID -", message.guild.id, inline)
        .addField("Membres", memberCount, inline)
        .addField("humains", humain, inline)
        .addField("Bots", bots, inline)
        .addField("En ligne", online ,inline)
        .addField("Rôles", message.guild.roles.size, inline)
        .addField("Channels", message.guild.channels.size, inline)
        .addField("Création du serveur", guild_date, inline)
        .addField("Région", message.guild.region, inline)
        .addField("liste des grades", grade)      
        .addField("liste des émojis", emojis)


  
    message.channel.send(si_embed)



  }

  if (message.content === prefix + "stats"){




    var stats_embed = new discord.RichEmbed()
    .setColor("RANDOM")  
    .setAuthor(`vaffan bot stats`, `https://images.discordapp.net/avatars/406066553751076864/7d14144003d7f1dc85aa447bec7d7c3f.png?size=512`) 
    .addField("createur", "omega#9187")
    .setThumbnail(`https://images.discordapp.net/avatars/406066553751076864/7d14144003d7f1dc85aa447bec7d7c3f.png?size=512`)
    .addField(`Lib`, `Discord.js (Javascript)`, true)
    .addField(`Version`, `1.0.2`, true)
    .addField(`Serveurs`, `${bot.guilds.size.toLocaleString()}`, true)
    .addField(`Utilisateurs`, `${bot.users.size.toLocaleString()}`, true)
    .addField('Lien d\'invitation', `[**Invitation**](https://discordapp.com/oauth2/authorize?client_id=406066553751076864&scope=bot&permissions=2146958591)`)
    .addField('Serveur de Support', '[**rejoin nous**](https://discord.gg/3JuDXCC)')
    .setImage("https://discordbots.org/api/widget/406066553751076864.png")
    console.log('cmd stats')


    

    message.channel.send(stats_embed)

  }




 if (message.content === prefix + "serveur"){

  if (message.author.id !== "280753236548386816") 
  return message.reply("tu n'est pas omega");



   //bot.guilds.map(g => {g.channels.random().createInvite({ maxAge : 0, unique: false})})

   message.author.send(`salut maître voici mes serveurs,`  `\n${bot.guilds.map(g => g.name).join(" , ")
  }`)

 }


 


  if(message.content.startsWith(prefix + "poll")) {
    console.log('cmd poll')
    let args = message.content.split(" ").slice(1);
    let thingToEcho = args.join(" ")

    message.channel.send(`:bar_chart: **${thingToEcho}**`)

    var poll_embed = new discord.RichEmbed()
       .setColor("RANDOM")
       .setDescription("✅ oui\n ❌ non")
       .setTimestamp()
     message.channel.send(poll_embed)

    .then(function (message) {        
        message.react("❌")
        message.react("✅")
    }).catch(function() {

    });
}
   

if(message.content.startsWith (prefix + "choose")) {

let replies = [`${args[1]}`, `${args[3]}`];
let result = Math.floor((Math.random() * 2));

message.reply(`Mon choix est : ${replies[result]}`)
console.log('cmd choose')


}


if(message.content.startsWith (prefix + "clear")) {

        if(!message.member.hasPermission('MANAGE_MESSAGES')) 
    
        return message.channel.send ("Vous n'avez pas la permission !");

        let args = message.content.split(prefix + "clear ")[1];

        if(!args) return message.channel.send("Vous devez préciser un nombre de messages à supprimer !")
        message.channel.bulkDelete(args).then(() => {
        })

        console.log("clear")
    }



    if(message.content.startsWith(prefix + "mute")){

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("**Tu n'as pas la permission d'utiliser cette commande !**");

        if (!message.guild.roles.exists('name', 'Mute')) return message.channel.send("Le rôle `Mute` n'existe pas !")

        const args = message.content.split(' ').slice(1)
        var Mute = message.guild.roles.find('name', 'Mute');
        let member = message.mentions.members.first();

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("**Tu n'as pas la permission d'utiliser cette commande !**").catch(console.error);

        if(!member) return message.channel.send("Vous devez mentionner la personne à mute !");

        member.addRole(Mute);
        message.channel.send(`${member} est mute par ${message.author} !`);
        message.channel.send("Raison : " + args.slice(1).join(' '))
        };

        if(message.content.startsWith(prefix + "unmute")) {

        var Mute = message.guild.roles.find('name', 'Mute');
        var member = message.mentions.members.first();

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("**Tu n'as pas la permission d'utiliser cette commande !**").catch(console.error);

        if(message.mentions.users.size === 0){
        return message.channel.send("Vous devez mentionner la personne à unmute !");
        }

        member.removeRole(Mute)
        message.channel.send(`${member} est unmute par ${message.author} !`);
        };


        if(message.content.startsWith(prefix + "calc")) {
      console.log('cmd calc')
          var args = message.content.split(' ').slice(1);      
          let input = args.join(" ");
          if (!input) {
              message.channel.send(`:x: Utilisation : ${prefix}calc <calcul>`);
              return;
          }
  
      const question = args.join(" ");
  
      let answer;
          try {
      answer = math.eval(question);
      } catch (err) {
      return message.channel.send(`:x: Calcul mathématique ${err}`);
  }
  
  
  var calc_embed = new discord.RichEmbed()
      .setThumbnail("https://images-na.ssl-images-amazon.com/images/I/31QYTepQomL.png")
      .setColor('#990000')
      .setDescription(`**Calculatrice** \n\n**Calcul** : ${question} \n\n**Résultat** : ${answer}`)
      .setFooter(`💥Demandé par ${message.author.tag}`,message.author.avatarURL)
      
  
      message.channel.send(calc_embed)

  
  };


       
})



bot.on('message', message => {
    if (message.content.startsWith(prefix + "piece")) {
 var commande = [":moneybag: | La pièce dit : Face.", ":moneybag: | La pièce dit : Pile."]
      message.channel.send(`${(commande[Math.floor(Math.random() * commande.length)])}`)
    console.log('cmd piece')

 }
 
 });


 
 bot.on('message', message => {
    if (message.content.startsWith(prefix + "roll")) {
 var commande = [":control_knobs: | Vous etes tombé sur le numero: 1",":control_knobs: | Vous etes tombé sur le numero: 2",":control_knobs: | Vous etes tombé sur le numero: 3",":control_knobs: | Vous etes tombé sur le numero: 4",":control_knobs: | Vous etes tombé sur le numero: 5",":control_knobs: | Vous etes tombé sur le numero: 6",":control_knobs: | Vous etes tombé sur le numero: 7",":control_knobs: | Vous etes tombé sur le numero: 8",":control_knobs: | Vous etes tombé sur le numero: 9",":control_knobs: | Vous etes tombé sur le numero: 10"]
      message.channel.send(`${(commande[Math.floor(Math.random() * commande.length)])}`)
    console.log('cmd roll')

 }
 });

 


 bot.on('message', message => {
    if (message.content.startsWith(prefix + "bvn")) {
       message.delete(1000);
       message.channel.send(":tada: | **" + message.author.username + "** vous souhaite la bienvenue !");
    console.log('cmd bvn')

    }



    var command = message.content.split(" ")[0].slice(prefix.length).toLowerCase()

    if(command === "love") {
        require(`./Commands/love`).run(message, bot, discord ,Discord, prefix )
      }

     
    


      

 });
