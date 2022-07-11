const { RichEmbed } = require("discord.js");
exports.run = async (bot, message, args) => {
  if (message.channel.id != "616679650822717440")
    return message
      .reply("utilize comandos no chat <#616679650822717440>.")
      .then(msg => msg.delete(15 * 1000));

  if (!args[0] || !args[0] == "recusar" || !args[0] == "aceitar") {
    await message.delete();
    await message.reply("enviei uma mensagem para você no privado.");
    await message.author.createDM();
    await message.author.send("📌 **DENÚNCIA DE BUG**");
    await message.author.send(
      "Olá, bem-vindo a denúncia de bug.\nPor favor, seja o mais detalhista possível para chegarmos afundo no bug.\n**Usem provas (vídeos ou prints) em link na denúncia\n\nDeseja continuar? `Sim` ou `Não`"
    );
    let pergunta1, pergunta2, pergunta3, pergunta4;
    var collector01 = message.author.dmChannel.createMessageCollector(
      x => x.author.id == message.author.id,
      { time: 120000 * 10, max: 1 }
    );
    collector01.on("collect", c => {
      pergunta1 = c.content;
      if (pergunta1.toLowerCase() == "sim") {
        message.author.send(
          ":white_small_square:  **Qual minigame ocorreu o bug? (KitPvP ou HG)**"
        );
        var collector01 = message.author.dmChannel.createMessageCollector(
          x => x.author.id == message.author.id,
          { time: 120000 * 10, max: 1 }
        );
        collector01.on("collect", c => {
          pergunta2 = c.content;
          message.author.send(
            ":white_small_square:  **Descrição do bug: (Seja o mais detalhista possível)**"
          );
          var collector02 = message.author.dmChannel.createMessageCollector(
            x => x.author.id == message.author.id,
            { time: 120000 * 10, max: 1 }
          );
          collector02.on("collect", c => {
            pergunta3 = c.content;
            message.author.send(
              ":white_small_square:  **Vídeo ou print: (Usem provas em link)** ``Não``"
            );
            var collector03 = message.author.dmChannel.createMessageCollector(
              x => x.author.id == message.author.id,
              { time: 120000 * 10, max: 1 }
            );
            collector03.on("collect", async c => {
              pergunta4 = c.content;
              message.author.send(
                ":white_check_mark: Sua denúncia foi enviada para equipe de Desenvolvimento"
              );
              if (pergunta4.toLowerCase() == "não") pergunta4 = "Não possui.";
              let canal = bot.channels.find(a => a.id == "627518020675305482");
              canal.send(
                `**Autor**: ${message.author}\n**Minigame**: \`${pergunta2}\`\n**Descrição**: \`${pergunta3}\`\n**Prova**: ${pergunta4}`
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
      `:x: Seu pedido foi recusada por ${
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
      `:white_check_mark: Seu pedido foi aceito por ${message.author}! \`Tag será setada\``
    );
  }
};

module.exports.info = {
  name: "bug",
  aliases: ["reportbug"]
};
