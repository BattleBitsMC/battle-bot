var musicas = require("../../queue.js");

module.exports.run = async (bot, message, args) => {
  if (musicas.queue.get(message.guild.id)) {
    if (message.member.voiceChannel) {
      if (
        message.member.voiceChannel.id ===
        message.guild.members.get(bot.user.id).voiceChannel.id
      ) {
        if (
          musicas.queue.get(message.guild.id).som.por[
            musicas.queue.get(message.guild.id).atual
          ] === message.author.id ||
          message.member.roles.find("name", "DJ")
        ) {
          if (musicas.queue.get(message.guild.id).repetir === 1) {
            musicas.queue
              .get(message.guild.id)
              .som.por.splice(musicas.queue.get(message.guild.id).atual, 1);
            musicas.queue
              .get(message.guild.id)
              .som.id.splice(musicas.queue.get(message.guild.id).atual, 1);
            musicas.queue
              .get(message.guild.id)
              .som.titulo.splice(musicas.queue.get(message.guild.id).atual, 1);
          }
          message.channel.send(
            `**${message.author.username}**, música pulada.`
          );
          musicas.queue.get(message.guild.id).connection.end();
        } else {
          message.channel.send(
            `**${message.author.username}**, você não tem permissão para fazer isso.`
          );
        }
      } else {
        message.channel.send(
          `**${message.author.username}**, você precisa entrar no meu canal de música.`,
          { prefix: prefixo }
        );
      }
    } else {
      message.channel.send(
        `**${message.author.username}**, você precisa entrar em um canal de música.`
      );
    }
  } else {
    message.channel.send(
      `**${message.author.username}**, não há música tocando.`
    );
  }
};

module.exports.info = {
  name: "pular",
  aliases: ["skip"]
};
