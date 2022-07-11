const { RichEmbed } = require("discord.js");
exports.run = async (bot, message, args) => {
  
  if (!args[0] || !args[0] == "recusar" || !args[0] == "aceitar") {
    await message.delete();
    await message.reply("enviei uma mensagem para você no privado.");
    await message.author.createDM();
    await message.author.send("📌 **SOLICITAÇÃO DE TAG**");
    await message.author.send(
      "Olá, bem-vindo a solicitação de tag.\nFaça o pedido das seguintes tags: Youtuber e Pro.\n**Por favor, solicite tag se tiver vídeo no servidor!**\n\n```Requisitos YOUTUBER:\n• Um vídeo em nosso servidor;\n• 1.500 inscritos no mínimo;\n• 500 visualizações no minimo no vídeo gravado em nosso servidor;\n• 100 likes no mínimo no mesmo vídeo;\n• Um vídeo mensal no mínimo em nosso servidor\n\nRequisito PRO:\n• Um vídeo em nosso servidor;\n\n• 500 inscritos no mínimo;\n• 250 visualizações no minimo no vídeo gravado em nosso servidor;\n• 50 likes no mínimo no mesmo vídeo;\n• Dois vídeo mensal no mínimo em nosso servidor```\n\nDeseja continuar? `Sim` ou `Não`"
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
          ":white_small_square:  **Qual é seu nickname no servidor?**"
        );
        var collector01 = message.author.dmChannel.createMessageCollector(
          x => x.author.id == message.author.id,
          { time: 120000 * 10, max: 1 }
        );
        collector01.on("collect", c => {
          pergunta2 = c.content;
          message.author.send(":white_small_square:  **Qual a tag desejada?**");
          var collector02 = message.author.dmChannel.createMessageCollector(
            x => x.author.id == message.author.id,
            { time: 120000 * 10, max: 1 }
          );
          collector02.on("collect", c => {
            pergunta3 = c.content;
            message.author.send(":white_small_square:  **Link do canal:**");
            var collector03 = message.author.dmChannel.createMessageCollector(
              x => x.author.id == message.author.id,
              { time: 120000 * 10, max: 1 }
            );
            collector03.on("collect", async c => {
              pergunta4 = c.content;
              message.author.send(
                ":white_check_mark: Solicitação enviada com sucesso"
              );
              if (pergunta4.toLowerCase() == "não") pergunta4 = "Não possui.";
              let canal = bot.channels.cache.find(a => a.id == "975268919789121566");
              canal.send(
                `**Autor**: ${message.author}\n**Nick**: \`${pergunta2}\`\n**Tag solicitada**: \`${pergunta3}\`\n**Canal**: ${pergunta4}`
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
  name: "solicitartag",
  aliases: ["solicitartags"]
};
