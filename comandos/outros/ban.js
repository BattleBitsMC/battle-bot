const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  message.delete();

  if (
    !message.member.roles.some(r =>
      ["⭐ Administrador", "🔮 Moderador", "☕ Desenvolvedor"].includes(
        r.name
      )
    )
  )
    return message.reply("desculpe, você não tem permissão para usar isto!");
  let reason = args.slice(2).join(" ");
  let proof = args[1]

  let membro = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  let cargo = message.member.highestRole;
  if (!membro)
    return message.channel
      .send(
        `╳ | Argumento insuficiente.\n ▫ | **${message.author.username}**, o uso correto é: \`\`\b!ban ID <prova> <motivo>\`\`\ `
      )
      .then(msg => msg.delete(5000));

  let userembed = new Discord.RichEmbed();

  let incidentschannel = message.guild.channels.find(`name`, "punicoes");
  if (!incidentschannel) return message.reply("chat punicoes não foi criado.");
  incidentschannel.send(`\`\`\`\nJogador punido: ${membro.user.username}\nAutor da punição: ${message.author.username}\nMotivo: ${reason}\nTipo da punição: Banido permanente\nProva: ${proof}\`\`\``);

  membro.ban();
  message.channel
    .send(
      `👍 | **${message.author.username}**, punição aplicada com sucesso.`
    )
    .then(msg => msg.delete(5000));
  message.delete();
};

module.exports.info = {
  name: "ban",
  aliases: ["banir"]
};
