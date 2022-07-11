const ms = require("ms");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete();

  if (
    !message.member.roles.some(r =>
      ["⭐ Administrador", "🔮 Moderador", "☕ Desenvolvedor"].includes(
        r.name
      )
    )
  )
    return message.reply("desculpe, você não tem permissão para usar isto!");

  let tomute = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  let cargo = message.member.highestRole;
  if (!tomute)
    return message.channel
      .send(
        `╳ | Argumento insuficiente.\n ▫ | **${message.author.username}**, o uso correto é: \`\`\b!tempmute ID <3s, 3m, 3h> <prova> <motivo>\`\`\ `
      )
      .then(msg => msg.delete(5000));
  let muterole = message.guild.roles.find(role => role.name === "🔇 Silenciado");
  let reason = args.slice(3).join(" ");
  let proof = args[2]

  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: "🔇 Silenciado",
        color: "RANDOM",
        permissions: []
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  let mutetime = args[1];
  if (!mutetime) return message.reply("**Indique um tempo.**");
  message.delete().catch(O_o => {});
  try {
    await tomute.send(" ");
  } catch (e) {
    message.channel.send(" ");
  }
  
  let incidentschannel = message.guild.channels.find(`name`, "punicoes");
  if (!incidentschannel) return message.reply("chat punicoes não foi criado.");
  incidentschannel.send(`\`\`\`\nJogador punido: ${tomute.user.username}\nAutor da punição: ${message.author.username}\nMotivo: ${reason}\nDuração: ${mutetime}\nTipo da punição: Mutado temporariamente\nProva: ${proof}\`\`\``);
  await tomute.addRole(muterole.id);
  message.channel
    .send(
      `👍 | **${message.author.username}**, punição aplicada com sucesso.`
    )
    .then(msg => msg.delete(5000));
  setTimeout(function() {
    tomute.removeRole(muterole.id);
    bot.users
      .get(message.author.id)
      .send(
        `⏲ | **${message.author.username}**, o silenciamento de <@${tomute.id}> foi revogado.`
      );
  }, ms(mutetime));
};

module.exports.info = {
  name: "mute",
  aliases: ["tempmute"]
};
