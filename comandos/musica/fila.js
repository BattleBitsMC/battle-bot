var Discord = require("discord.js");
var musicas = require("../../queue.js");
const moment = require("moment");
require("moment-duration-format");
moment.locale("pt-BR");

module.exports.run = async (bot, message, args) => {
  if (musicas.queue.get(message.guild.id)) {
    var modes = ["off", "musica", "playlist", "traapey"];
    var num = 0;
    var embed = new Discord.RichEmbed()
      .setColor(16562432)
      .setAuthor(bot.user.username, bot.user.displayAvatarURL)
      .addField(
        `Lista de reprodução:`,
        `${musicas.queue
          .get(message.guild.id)
          .som.titulo.map(
            musica =>
              `**${++num}** - \`${musica}\` **|** Adicionado por ${message.guild.members.get(
                musicas.queue.get(message.guild.id).som.por[num - 1]
              )}`
          )
          .slice(0, 10)
          .join("\n")}\n\n`,
        false
      )
      .addField(
        "Informações da música:",
        `Tocando agora: \`\`\ ${
          musicas.queue.get(message.guild.id).som.titulo[
            musicas.queue.get(message.guild.id).atual
          ]
        }\`\`\ \nAdicionado por ${message.guild.members.get(
          musicas.queue.get(message.guild.id).som.por[
            musicas.queue.get(message.guild.id).atual
          ]
        )} \n Repetir: \`\`\ ${modes[
          musicas.queue.get(message.guild.id).repetir
        ]
          .replace("musica", "Apenas á música atual.")
          .replace("off", "Modo desativado.")
          .replace("playlist", "Apenas á playlist atual.")} \`\`\ `
      );
    message.channel.send(embed);
  } else {
    message.channel.send(
      `**${message.author.username}**, não há música tocando.`
    );
  }
};

module.exports.info = {
  name: "fila",
  aliases: ["queue"]
};
