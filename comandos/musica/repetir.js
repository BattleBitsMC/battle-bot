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
          let razaou = args.slice(0).join(" ");
          var modes = {
            off: 0,
            musica: 1,
            playlist: 2,
            Hypin0tic: 3
          };
          var modesA = ["off", "musica", "playlist", "Hypin0tic"];
          if (!razaou.length < 1) {
            if (modesA.includes(args[0].toLowerCase())) {
              if (
                musicas.queue.get(message.guild.id).repetir !==
                modes[args[0].toLowerCase()]
              ) {
                musicas.queue.get(message.guild.id).repetir =
                  modes[args[0].toLowerCase()];
                message.channel.send(
                  `<:Yes:513265641596125194> | **${
                    message.author.username
                  }**, modo alterado para ${args[0].toLowerCase()}.`,
                  { mode: args[0].toLowerCase() }
                );
              } else {
                message.channel.send(
                  `**${message.author.username}**, esse modo já está definido.`
                );
              }
            } else {
              message.channel.send(
                `Argumento inválido.\n ▫ | **${message.author.username}**, o uso correto é: \`\`\-repetir [musica/playlist/off]\`\`\ `,
                { options: modesA.join("` **|** `") }
              );
            }
          } else {
            message.channel.send(
              `Argumento insuficiente.\n ▫ | **${message.author.username}**, o uso correto é: \`\`\-repetir [musica/playlist/off]\`\`\ `,
              { options: modesA.join("` **|** `") }
            );
          }
        } else {
          message.channel.send(
            `**${message.author.username}**, você não tem permissão para fazer isso.`
          );
        }
      } else {
        message.channel.send(
          `**${message.author.username}**, você precisa entrar no meu canal de música.`,
          { prefix: "-" }
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
  name: "repetir",
  aliases: ["repeat"]
};
