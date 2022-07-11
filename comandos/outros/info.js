const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {
  let ip = 'battlebits.com.br';
  let server = await fetch(`https://api.mcsrvstat.us/2/${ip}`, {
    method: 'GET'
  }).then(res => res.json());
  if(!server.online) return message.channel.send('Buscando informações!');
  let embed = new Discord.RichEmbed()
    .setDescription(`\`\`\`\n${server.motd.clean.join('\n')}\`\`\``)
    .addField(`🛰️ Estastísticas:`, `- **Jogadores:** ${server.players.online}/${server.players.max}\n- **Versão:** ${server.version}`, true)
    .addField(`🧱 Informações:`, `- **IP:** ${ip}\n- **Twitter:** [@BattleBitsMC](https://twitter.com/BattleBitsMC)\n- **Site:** [BattleBits - Loja](https://loja.battlebits.com.br)`, true)
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setThumbnail(message.guild.iconURL)
    .setFooter(message.author.username, message.author.displayAvatarURL)
    .setTimestamp(new Date())
    .setColor(25565);
  message.channel.send(message.member, embed);
message.delete()
};

module.exports.info = {
  name: 'info',
  aliases: ['information', 'info', 'servidor']
};