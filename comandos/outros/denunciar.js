const { RichEmbed } = require("discord.js");
exports.run = async (bot, message, args) => {

  if (!args[0] || !args[0] == "recusar" || !args[0] == "aceitar") {
    await message.delete();
    await message.reply("enviei uma mensagem para você no privado.");
    await message.author.createDM();
    await message.author.send(":mega: **DENÚNCIA:**");
    await message.author
      .send(`Olá, ${message.author.username} . Siga os próximos passos para enviar uma denúncia.\nAntes de começarmos, leia atentamente algumas informações importantes:\n\n- Enviar denúncias falsas ou qualquer mensagem que não seja uma denúncia resultará em punição para você.
- Em caso de denúncias onde um jogador esteja sendo acusado de Hack/Scripts, a prova deve ser em vídeo.
- Só envie denúncias com provas válidas, que mostrem a tela inteira do seu jogo.\n\nDeseja continuar? \`Sim\` ou \`Não\``);
    let pergunta1, pergunta2, pergunta3, pergunta4;
    var collector01 = message.author.dmChannel.createMessageCollector(
      x => x.author.id == message.author.id,
      { time: 120000 * 10, max: 1 }
    );
    collector01.on("collect", c => {
      pergunta1 = c.content;
      if (pergunta1.toLowerCase() == "sim") {
        message.author.send(
          ":white_small_square:  **Qual é o nick do usuário?**"
        );
        var collector01 = message.author.dmChannel.createMessageCollector(
          x => x.author.id == message.author.id,
          { time: 120000 * 10, max: 1 }
        );
        collector01.on("collect", c => {
          pergunta2 = c.content;
          message.author.send(
            ":white_small_square:  **Qual é o motivo da denúncia?**"
          );
          var collector02 = message.author.dmChannel.createMessageCollector(
            x => x.author.id == message.author.id,
            { time: 120000 * 10, max: 1 }
          );
          collector02.on("collect", c => {
            pergunta3 = c.content;
            message.author.send(
              ":white_small_square:  **Possui provas? ** Se sim mande as provas(em link), caso contrário diga `Não`"
            );
            var collector03 = message.author.dmChannel.createMessageCollector(
              x => x.author.id == message.author.id,
              { time: 120000 * 10, max: 1 }
            );
            collector03.on("collect", async c => {
              pergunta4 = c.content;
              message.author.send(
                ":white_check_mark: Denúncia enviado com sucesso."
              );
              if (pergunta4.toLowerCase() == "não") pergunta4 = "Não possui.";
              let canal = bot.channels.find(a => a.id == "650488319330746405");
              canal.send(
                `**Autor**: ${message.author}\n**Acusado**: \`${pergunta2}\`\n**Motivo**: \`${pergunta3}\`\n**Prova**: ${pergunta4}`
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
      `:x: Sua denúncia foi recusada por ${
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
      `:white_check_mark: Sua denúncia foi aceita por ${message.author}! \`Player punido.\``
    );
  }
};

module.exports.info = {
  name: "report",
  aliases: ["denunciar"]
};
