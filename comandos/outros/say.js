const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete();
  let botmessage = args.join(" ");
  if (!args[0])
    return message.channel
      .send(`:naoapoio: Comando errado\nDigite **!say <msg>**`)
      .then(msg => msg.delete(2000));
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message
      .reply("você não tem permissão.")
      .then(msg => msg.delete(5000));
  message.delete().catch();
  let embed = new Discord.RichEmbed()
    .setDescription(`${botmessage}`)
    .setColor(3553598);
  message.channel.send(embed);

  message.channel.send("").then(msg => msg.delete(0));
};

module.exports.info = {
  name:
  "say",
  aliases: ["falar"]
};
