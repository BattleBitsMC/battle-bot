const { RichEmbed } = require("discord.js");
exports.run = async (bot, message, args) => {
  
  if (!args[0] || !args[0] == "recusar" || !args[0] == "aceitar") {
    await message.delete();
    await message.reply("enviei uma mensagem para você no privado.");
    await message.author.createDM();
    await message.author.send("📌 **REVISÃO DE PUNIÇÃO**");
    await message.author.send(
      "Olá, bem-vindo ao Revisão de punição.\nNão minta em nenhuma das nossas perguntas, caso ao contrário será negada.\n\n\nDeseja continuar? `Sim` ou `Não`"
    );
    let pergunta1, pergunta2, pergunta3, pergunta4;
    var collector01 = message.author.dmChannel.createMessageCollector(
      x => x.author.id == message.author.id,
      { time: 120000 * 10, max: 1 }
    );
    collector01.on("collect", c => {
      pergunta1 = c.content;
      if (pergunta1.toLowerCase() == "sim") {
        message.author.send(":white_small_square:  **Qual seu nick?**");
        var collector01 = message.author.dmChannel.createMessageCollector(
          x => x.author.id == message.author.id,
          { time: 120000 * 10, max: 1 }
        );
        collector01.on("collect", c => {
          pergunta2 = c.content;
          message.author.send(
            ":white_small_square:  **Quem lhe punir?: (Nick do staff)**"
          );
          var collector02 = message.author.dmChannel.createMessageCollector(
            x => x.author.id == message.author.id,
            { time: 120000 * 10, max: 1 }
          );
          collector02.on("collect", c => {
            pergunta3 = c.content;
            message.author.send(
              ":white_small_square:  **Por que deveriamos aceitar?: (coloque a prova da punição)** ``Não``"
            );
            var collector03 = message.author.dmChannel.createMessageCollector(
              x => x.author.id == message.author.id,
              { time: 120000 * 10, max: 1 }
            );
            collector03.on("collect", async c => {
              pergunta4 = c.content;
              message.author.send(
                ":white_check_mark: Sua revisão foi enviada, já estamos analisando!"
              );
              if (pergunta4.toLowerCase() == "não") pergunta4 = "Não possui.";
              let canal = bot.channels.find(a => a.id == "650488332240945232");
              canal.send(
                `**Autor**: ${message.author}\n**Nick**: \`${pergunta2}\`\n**Quem baniu**: \`${pergunta3}\`\n**Por que deveriamos aceitar**: ${pergunta4}`
              );
            });
          });
        });
      } else if (pergunta1.toLowerCase() == "Não") {
        message.reply("cancelado.");
      }
    });
  }
  if (args[0] == "negar") {
    let user = message.mentions.users.first()
      ? message.mentions.users.first()
      : args[1];
    if (!user) {
      return message.reply("você deve marcar um usuário.");
    }
    if (!args.slice(2).join(" ")) {
      return message.reply("você deve botar um motivo.");
    }
    user.send(
      `:x: Sua revisão foi recusada por ${
        message.author
      }!\nMotivo: \`${args.slice(2).join(" ")}\``
    );
  }
  if (args[0] == "aceitar") {
    let user = message.mentions.users.first()
      ? message.mentions.users.first()
      : args[1];
    if (!user) {
      return message.reply("você deve marcar um usuário.");
    }
    if (!args.slice(2).join(" ")) {
      return message.reply("você deve botar um motivo.");
    }
    user.send(
      `:white_check_mark: Sua revisão foi aceito por ${message.author}! \`Você já foi punido\``
    );
  }
};

module.exports.info = {
  name: "appeal",
  aliases: ["revisao"]
};
