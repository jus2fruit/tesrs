module.exports = {

     run: function(message, bot, discord ,Discord , args, prefix) {

    
          if (message.author.bot) return;
          console.log('cmd love')
        
          randomlove = Math.ceil(Math.random() * 101);
        
          var memberlove = message.mentions.users.first();
        if(!memberlove) return;
        
        
            
         
              if (randomlove < 50) {
              
              var love_embed = new Discord.RichEmbed()
         .setAuthor("💖 Love Machine 💖",message.author.avatarURL)
         .setDescription(`💗**${memberlove.tag}**\n💗**${message.author.tag}**`)
              .setColor(0x00AE86)
              .addField(`${randomlove}% || ​██████████ ​ || `,"**Résultat:**`La fleur de l'amour est fanée avant d'avoir fleuri. Laissez tomber.`")
        
                          message.channel.send(love_embed)
          }
          if (randomlove < 80 && randomlove > 49) {
              
              var love_embed = new Discord.RichEmbed()
         .setAuthor("💖 Love Machine 💖",message.author.avatarURL)
         .setDescription(`💗**${memberlove.tag}**\n💗**${message.author.tag}**`)
              .setColor(0x00AE86)
              .addField(`${randomlove}% || ​███████████████████ ​ || `,"**Résultat:**`Serait-ce une lueur d'amour qu'on apperçoit entre vos deux cœurs? On dirait qu'il y a une attirance réciproque.`")
        
                          message.channel.send(love_embed)
          }
          if (randomlove > 80 && randomlove < 101) {
              
              var love_embed = new Discord.RichEmbed()
              .setAuthor("💖 Love Machine 💖",message.author.avatarURL)
              .setDescription(`💗**${memberlove.tag}**\n💗**${message.author.tag}**`)
              .setColor(0x00AE86)
              .addField(`${randomlove}% || ​██████████████████████████████ ​ || `,"**Résultat:**`Quand deux coeurs accordés se rencontrent l'amour les éclaire. Félicitations vous êtes compatibles!`")
        
                          message.channel.send(love_embed)
          }
          if (randomlove > 100 ) {
              
              var love_embed = new Discord.RichEmbed()
         .setAuthor("💖 Love Machine 💖",message.author.avatarURL)
         .setDescription(`💗**${memberlove.tag}**\n💗**${message.author.tag}**`)
              .setColor(0x00AE86)
              .addField(`${randomlove}% || ​████████████████████████████████████████​ || `,"**Résultat:**`Faites sonner les carillons, invitez vos amis, préparez la fête: le mariage est prévu pour bientôt!`")
        
                          message.channel.send(love_embed)
          }
        

     }};

