var musicas = require("../../queue.js");

module.exports.run = async (bot, message, args) => {
  if (message.guild.members.get(bot.user.id).voiceChannel) {
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
        if (!musicas.queue.get(message.guild.id)) {
          message.member.voiceChannel.leave();
        } else {
          musicas.queue.get(message.guild.id).som.por = [];
          musicas.queue.get(message.guild.id).som.atividade = [];
          musicas.queue.get(message.guild.id).som.id = [];
          musicas.queue.get(message.guild.id).som.titulo = [];
          message.member.voiceChannel.leave();
        }
      } else {
        message.channel.send(
          `**${message.author.username}**, você não tem permissão para fazer isso.`
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
  name: "parar",
  aliases: ["stop", "s"]
};
