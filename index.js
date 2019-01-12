const discord = require('discord.js');
var bot = new discord.Client();
var client = bot
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('DataBase.json')
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

const DBL = require("./dblapi.js");
const dbl = new DBL(process.env.TOKEN2, bot);




var prefix = ("v/");
var randnum = 0;

bot.on('ready', () => {

  setInterval(() => {
    dbl.postStats(bot.guilds.size);
}, 8000)
  

  console.log ("bot ready !" + bot.guilds.size )

  setInterval(() => {
  bot.user.setActivity(`[v/help] | vaffan bot ${bot.guilds.size} serveurs`, { type: "STREAMING", url: "https://www.twitch.tv/omega33" });
  var status = [
      `[v/help] | vaffan bot ${bot.guilds.size} serveurs`
  ];
}, 7200)



});






bot.login(process.env.TOKEN);


db.defaults({money: []})
  .write()



let warns = JSON.parse(fs.readFileSync("./data/warns.json", "utf8"));
let inline = true

  
bot.on ('message' , message=> { 
  
    
    var args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();



    if (message.content === ("ping")) {
        message.channel.send(`:ping_pong: pong ! ${(client.ping).toFixed(0)} ms `)
        console.log('ping pong !')

    }


    if (message.content === ("bonne nuit")) {
        message.channel.send("bonne nuit à toi")
        console.log('bonne nuit')
    }
    if (message.content === ("Bonne nuit")){
        message.channel.send("bonne nuit à toi")
         console.log('bonne nuit')
    }
    if (message.content === ("test")){
        message.channel.send("tout est fonctionnel !")
        console.log('test')
    }
    if (message.content === ("bonjour")){
        message.channel.send("bonjour!")
        console.log('bonjour')
    }

    if (message.content === ("Bonjour")){
        message.channel.send("bonjour!")
        console.log('bonjour')
    }

    if (message.content === ("bonsoir")){
        message.channel.send("bonsoir!")
        console.log('bonsoir')
    }

    if (message.content === ("Bonsoir")){
        message.channel.send("bonsoir!")
        console.log('bonsoir')
    }

     
    var msgauthor = message.author.id;


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

        var usercreatedate = message.author.createdAt.toString().split(' ')       
        var msgnom = message.mentions.members.first(); 

         var stats_embed = new discord.RichEmbed()
         .setColor('#01FF3E')
         .setTitle(`profile utilisateur :`)
         .addField("nom de l'utilisateur", message.author.username)
         .addField("user ID", msgauthor, true)
         .addField("Status", `${status[member.user.presence.status]}`, inline, true)
         .addField("jeux", `${member.user.presence.game ? `${member.user.presence.game.name}` : "ne joue a rien"}`,inline, true)
         .addField("Roles", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "l'utilisateur n'a pas de role"}`, true)
         .setThumbnail(message.author.avatarURL)
         .addField("date de création de l'utilisateur", usercreatedate[1] + ' ' + usercreatedate[2]+','+usercreatedate[3])

         if(message.mentions.users.size === 0) {
      
          return message.channel.send(stats_embed)

        }else{        

          var msgmention = message.mentions.members.first().id;
 
          var profilede_embed = new discord.RichEmbed()
          .setColor('#01FF3E')
          .setTitle(`profile utilisateur :`)
          .addField("nom de l'utilisateur", msgnom)
          .addField("user ID", msgmention, true)
          .addField("Status", `${status[member.user.presence.status]}`, inline, true)
         .addField("jeux", `${member.user.presence.game ? `${member.user.presence.game.name}` : "ne joue a rien"}`,inline, true)
         .addField("Roles", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "l'utilisateur n'a pas de role"}`, true)
          .setThumbnail(message.mentions.members.first().user.avatarURL)
          .addField("date de création de l'utilisateur", usercreatedate[1] + ' ' + usercreatedate[2]+','+usercreatedate[3])
          
 
          message.channel.send({embed: profilede_embed})

        }

        break;

        case "logo":

        var msgnom = message.mentions.members.first();
 
        var logo_embed = new discord.RichEmbed()   
        .setColor('#25c059')
        .setTitle("**Voici ton logo**")
        .setImage(message.author.avatarURL)
 
        if(message.mentions.users.size === 0) {
      
         return message.channel.send(logo_embed);
        
       }else{
 
         var logode_embed = new discord.RichEmbed()
         .setColor('#25c059')
         .addField("**Voici le logo de**", msgnom)
         .setImage(message.mentions.members.first().user.avatarURL)
         message.channel.send(logode_embed)
 
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

        break;
    

     }

    if (message.content === prefix + "logobot"){
        var logobot_embed = new discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("**Voici le logo du bot**")
        .setImage(bot.user.avatarURL)
        message.channel.send(logobot_embed)

    }

    if (message.content === prefix + "hh"){

      if(!message.member.hasPermission('MANAGE_MESSAGES'))
  
      return

      var helphh_embed = new discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle("**×HELP!**")
      .setDescription(` **SALUT ${message.author.username} !**\n \n **--------------** `)

      .addField("**__►FUN :__**", "v/8ball == Posez-lui une question, il vous répondra. \nv/roll == Vous donne un chiffre entre 1 et 10. \nv/choose <propisitions1 | propisitions2> == Le bot va faire un choix. \nv/bvn == Souhaitez la bienvenue aux nouveaux arrivants. \nv/piece == Pile ou face.\n \n **--------------**\n  ")

      .addField("**__►MODÉRATION :__**", "v/clear <nombres> == Supprime le nombre de message demandé.\nv/mute == Pour mute une personne. \nv/unmute == Pour unmute une personne.\n \n**--------------**\n")

      .addField("**__►IMAGES :__**","v/logo <pseudo> == Vous affiche votre logo.\nv/logobot == Affiche le logo du bot.\n \n**--------------**\n")

      .addField("**__►AUTRES :__**", "v/calc == Permet de résoudre un calcul.\nv/poll == Faîtes un strawpoll.\nv/serverstats == Vous affiche les statistiques du serveur.\nv/profile <pseudo> == Vous affiche votre profil.\nv/stats = Vous affiche les statistiques du bot. \n \n**--------------**\n")

      .addField('**__►LINK__ :**', `Invite Link [**CLICK !**](https://discordapp.com/oauth2/authorize?client_id=406066553751076864&scope=bot&permissions=2146958591)\n Serveur discord  [**REJOIN**](https://discord.gg/3JuDXCC) `)


    message.channel.send(helphh_embed);




  }


  if (message.content === prefix + "help"){
    message.channel.send(`**Help envoyé en message privé ${message.author.username} !**`)

    var help_embed = new discord.RichEmbed()
    .setColor('RANDOM')
      .setTitle("**×HELP!**")
      .setDescription(` **SALUT ${message.author.username} !**\n \n **--------------** `)

      .addField("**__►FUN :__**", "v/8ball == Posez-lui une question, il vous répondra. \nv/roll == Vous donne un chiffre entre 1 et 10. \nv/choose <propisitions1 | propisitions2> == Le bot va faire un choix. \nv/bvn == Souhaitez la bienvenue aux nouveaux arrivants. \nv/piece == Pile ou face.\n \n **--------------**\n  ")

      .addField("**__►MODÉRATION :__**", "v/clear <nombres> == Supprime le nombre de message demandé.\nv/mute == Pour mute une personne. \nv/unmute == Pour unmute une personne.\n \n**--------------**\n")

      .addField("**__►IMAGES :__**","v/logo <pseudo> == Vous affiche votre logo.\nv/logobot == Affiche le logo du bot.\n \n**--------------**\n")

      .addField("**__►AUTRES :__**", "v/calc == Permet de résoudre un calcul.\nv/poll == Faîtes un strawpoll.\nv/serverstats == Vous affiche les statistiques du serveur.\nv/profile <pseudo> == Vous affiche votre profil.\nv/stats = Vous affiche les statistiques du bot. \n \n**--------------**\n")

      .addField('**__►LINK__ :**', `Invite Link [**CLICK !**](https://discordapp.com/oauth2/authorize?client_id=406066553751076864&scope=bot&permissions=2146958591)\n Serveur discord  [**REJOIN**](https://discord.gg/3JuDXCC) `)


       
    message.author.send(help_embed);
  

}


  let memberCount = message.guild.memberCount
  let humain = message.guild.members.filter(m => !m.user.bot).size
  let bots = memberCount - humain
  let online = message.guild.presences.size
  var serveurcreatedate = message.guild.createdAt.toString().split(' ')

  var grade = message.guild.roles.filter(r => r.id !== message.guild.id).map(r => r.name).join(', ')

  var emojis;
  if (message.guild.emojis.size === 0) {
      emojis = 'Aucun';
  } else {
      emojis = message.channel.guild.emojis.map(e => e).join(" ");
  }


  if (message.content === prefix + "serverstats"){

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
        .addField("Création du serveur", serveurcreatedate[1] + ' ' + serveurcreatedate[2] + ' ' + serveurcreatedate[3], inline)
        .addField("Région", message.guild.region, inline)
        .addField("liste des grades", grade)      
        .addField("liste des émojis", emojis)

        

        message.channel.send(server_embed)



  }

  
  if (message.content === prefix + "stats"){



    var stats_embed = new discord.RichEmbed()
    .setColor("RANDOM")  
    .setAuthor(`vaffan bot stats`, `https://images.discordapp.net/avatars/406066553751076864/7d14144003d7f1dc85aa447bec7d7c3f.png?size=512`) 
    .addField("createur", "omega#9187")

    .setThumbnail(`https://images.discordapp.net/avatars/406066553751076864/7d14144003d7f1dc85aa447bec7d7c3f.png?size=512`)
    .addField(`Lib`, `Discord.js (Javascript)`, true)
    .addField(`Version`, `1.0.1`, true)
    .addField(`Serveurs`, `${bot.guilds.size.toLocaleString()}`, true)
    .addField(`Users`, `${bot.users.size.toLocaleString()}`, true)

    

    message.channel.send(stats_embed)

  }


 if (message.content === prefix + "serveur"){

  if (message.author.id !== "280753236548386816") 
  return message.reply("tu n'est pas omega");


   message.author.send(`salut maître voici mes serveurs  \n\`\`\`\n${bot.guilds.map(g => g.name).join(" \n")}\`\`\``)

 }



  if(message.content.startsWith(prefix + "poll")) {
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
let result = Math.floor((Math.random() * replies.length));

message.reply(`Mon choix est : ${replies[result]}`)

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

        if(!message.guild.member(message.author).roles.find('name', 'Modérateurs')) return message.reply("**Tu n'as pas la permission d'utiliser cette commande !**");

        if (!message.guild.roles.exists('name', 'Mute')) return message.channel.send("Le rôle `Mute` n'existe pas !")

        const args = message.content.split(' ').slice(1)
        var Mute = message.guild.roles.find('name', 'Mute');
        let member = message.mentions.members.first();

        if(!message.guild.member(message.author).roles.find('name', 'Modérateurs')) return message.reply("**Tu n'as pas la permission d'utiliser cette commande !**").catch(console.error);

        if(!member) return message.channel.send("Vous devez mentionner la personne à mute !");

        member.addRole(Mute);
        message.channel.send(`${member} est mute par ${message.author} !`);
        message.channel.send("Raison : " + args.slice(1).join(' '))
        };

        if(message.content.startsWith(prefix + "unmute")) {

        var Mute = message.guild.roles.find('name', 'Mute');
        var member = message.mentions.members.first();

        if(!message.guild.member(message.author).roles.find('name', 'Modérateurs')) return message.reply("**Tu n'as pas la permission d'utiliser cette commande !**").catch(console.error);

        if(message.mentions.users.size === 0){
        return message.channel.send("Vous devez mentionner la personne à unmute !");
        }

        member.removeRole(Mute)
        message.channel.send(`${member} est unmute par ${message.author} !`);
        };




        if(message.content.startsWith(prefix + "calc")) {
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
    if (message.content.startsWith("v/piece")) {
 var commande = [":./data/moneybag: | La pièce dit : Face.", ":moneybag: | La pièce dit : Pile."]
      message.channel.send(`${(commande[Math.floor(Math.random() * commande.length)])}`)
 }
 
 });


 
 bot.on('message', message => {
    if (message.content.startsWith("v/roll")) {
 var commande = [":control_knobs: | Vous etes tombé sur le numero: 1",":control_knobs: | Vous etes tombé sur le numero: 2",":control_knobs: | Vous etes tombé sur le numero: 3",":control_knobs: | Vous etes tombé sur le numero: 4",":control_knobs: | Vous etes tombé sur le numero: 5",":control_knobs: | Vous etes tombé sur le numero: 6",":control_knobs: | Vous etes tombé sur le numero: 7",":control_knobs: | Vous etes tombé sur le numero: 8",":control_knobs: | Vous etes tombé sur le numero: 9",":control_knobs: | Vous etes tombé sur le numero: 10"]
      message.channel.send(`${(commande[Math.floor(Math.random() * commande.length)])}`)
 }
 });

 


 bot.on('message', message => {
    if (message.content.startsWith("v/bvn")) {
       message.delete(1000);
       message.channel.send(":tada: | **" + message.author.username + "** vous souhaite la bienvenue !");
    }
 });

   bot.on("message", message => {


   
   if (message.content.startsWith(prefix + "warn")){
 
    let warns = JSON.parse(fs.readFileSync("./data/warns.json", "utf8"));
    if (message.channel.type === "dm") return;
     
    var mentionned = message.mentions.users.first();
     
    if(!message.guild.member(message.author).roles.find('name', 'Modérateurs')) 
    
    return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
     
    if(message.mentions.users.size === 0) {
     
      return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
     
    }else{
     
        const args = message.content.split(' ').slice(1);
     
        const mentioned = message.mentions.users.first();
     
        if(message.guild.member(message.author).roles.find('name', 'Modérateurs')){
     
          if (message.mentions.users.size != 0) {
     
            if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
     
              if (args.slice(1).length != 0) {
     
                const date = new Date().toUTCString();
     
                if (warns[message.guild.id] === undefined)
     
                  warns[message.guild.id] = {};
     
                if (warns[message.guild.id][mentioned.id] === undefined)
     
                  warns[message.guild.id][mentioned.id] = {};
     
                const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
     
                if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
     
                  warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
     
                } else {
     
                  warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
     
                    time: date,
     
                    user: message.author.id};
     
                }
     
                fs.writeFile("./data/warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
     
    message.delete();
     
                message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');
     
    message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
     
              } else {
     
                message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
     
              }
     
            } else {
     
              message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
     
            }
     
          } else {
     
            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
     
          }
     
        } else {
     
          message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
     
        }
     
      }
     
    }
     
     
     bot.on

    if (message.content.startsWith (prefix + "listwarn")||message.content === prefix + "listwarn") {
 
        if (message.channel.type === "dm") return;
         
        if(!message.guild.member(message.author).roles.find('name', 'Modérateurs')) 
        
        return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
         
            const mentioned = message.mentions.users.first();
         
            const args = message.content.split(' ').slice(1);
         
            if(message.guild.member(message.author).roles.find('name', 'Modérateurs')){
         
              if (message.mentions.users.size !== 0) {
         
                if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
         
                  try {
         
                    if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
         
                      message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
         
                      return;
         
                    }
         
                  } catch (err) {
         
                    message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
         
                    return;
         
                  }
         
                  let arr = [];
         
                  arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
         
                  for (var warn in warns[message.guild.id][mentioned.id]) {
         
                    arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
         
                    "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
         
                  }
         
                  message.channel.send(arr.join('\n'));
         
                } else {
         
                  message.channel.send("Erreur mauvais usage: "+prefix+"listwarn <user> <raison>");
         
                  console.log(args);
         
                }
         
              } else {
         
                message.channel.send("Erreur mauvais usage: "+prefix+"listwarn <user> <raison>");
         
              }
         
            } else {
         
              message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
         
            }
         
          }
     
     
    if (message.content.startsWith(prefix + "deletewarn")||message.content === prefix + "deletewarn") {
     
    if (message.channel.type === "dm") return;
     
    if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) 
    
    return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
     
       const mentioned = message.mentions.users.first();
     
        const args = message.content.split(' ').slice(1);
     
        const arg2 = Number(args[1]);
     
        if (message.member.hasPermission('MANAGE_GUILD')){
     
          if (message.mentions.users.size != 0) {
     
            if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
     
              if (!isNaN(arg2)) {
     
                if (warns[message.guild.id][mentioned.id] === undefined) {
     
                  message.channel.send(mentioned.tag+" n'a aucun warn");
     
                  return;
     
                } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
     
                  message.channel.send("**:x: Ce warn n'existe pas**");
     
                  return;
     
                }
     
                delete warns[message.guild.id][mentioned.id][arg2];
     
                var i = 1;
     
                Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
     
                  var val = warns[message.guild.id][mentioned.id][key];
     
                  delete warns[message.guild.id][mentioned.id][key];
     
                  key = i;
     
                  warns[message.guild.id][mentioned.id][key]=val;
     
                  i++;
     
                });
     
                fs.writeFile("./data/warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
     
                if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
     
                  delete warns[message.guild.id][mentioned.id];
     
                }
     
                message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);
     
                return;
     
              } if (args[1] === "tout") {
     
                delete warns[message.guild.id][mentioned.id];
     
                fs.writeFile("./data/warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
     
                message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);
     
                return;
     
              } else {
     
                message.channel.send("Erreur mauvais usage: "+prefix+"deletewarn <utilisateur> <nombre>");
     
              }
     
            } else {
     
              message.channel.send("Erreur mauvais usage: "+prefix+"deletewarn <utilisateur> <nombre>");
     
            }
     
          } else {
     
           message.channel.send("Erreur mauvais usage: "+prefix+"deletewarn <utilisateur> <nombre>");
     
          }
     
        } else {
     
          message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
     
        }

    }})
   
