const Discord = require("discord.js");

module.exports.run = async (frk, message, args) => {
  
  message.delete().catch(O_o => {});

  let embed = new Discord.RichEmbed()
    .setAuthor("Lista de Comandos")
    .setDescription(
      "```b!tocar        b!pular\nb!repetir      b!fila\nb!parar      b!servidor\nb!revisao```"
    )
    .setColor(3553598);
  message.channel.send(embed);
};

module.exports.info = {
  name: "comandos",
  aliases: ["ajuda"]
};
