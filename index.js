const { Client, Collection } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");

require("moment-duration-format");
moment.locale("pt-BR");

const bot = new Client();
const { readdir, lstatSync } = require("fs");
const { token, prefix } = require("./config.json");

bot.cmds = new Collection();
bot.aliases = new Collection();

bot.on("ready", () => {
  console.log(`${bot.user.username} está online!`);
});

const carregarComandos = (module.exports.carregarComandos = (
  dir = "./comandos/"
) => {
  readdir(dir, (erro, arquivos) => {
    if (erro) return console.log(erro);
    arquivos.forEach(arquivo => {
      try {
        if (lstatSync(`./${dir}/${arquivo}`).isDirectory()) {
          carregarComandos(`./${dir}/${arquivo}`);
        } else if (arquivo.endsWith(".js")) {
          const props = require(`./${dir}/${arquivo}`);
          if (
            !props ||
            !props.info ||
            !props.run ||
            !props.info.aliases ||
            !props.info.name
          ) {
            console.log(
              `Não foi possível carregar o comando ${arquivo.split(".")[0]}!`
            );
            return;
          }
          bot.cmds.set(props.info.name, props);
          props.info.aliases.forEach(alias => {
            bot.aliases.set(alias, props);
          });

          console.log(
            `Comando ${props.info.name} e seus ${props.info.aliases.length} aliases salvos.`
          );
        }
      } catch (ex) {
        console.log(`Erro ao ler o arquivo ${arquivo}!`);
        console.log(ex);
      }
    });
  });
});
carregarComandos();

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (message.channel.type != "text") return;
  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  const cmdParaExecutar = bot.cmds.get(cmd) || bot.aliases.get(cmd);
  if (cmdParaExecutar != null) cmdParaExecutar.run(bot, message, args);
});

// CAPTCHA
bot.on('raw', async dados => {
    if(dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
    if(dados.d.message_id != "ID DA MENSAGEM") return

    let servidor = bot.guilds.get("ID DO SERVIDOR")
    let membro = servidor.members.get(dados.d.user_id)

    let cargo1 = servidor.roles.get(''),
        cargo2 = servidor.roles.get('ID DO CARGO'),
        cargo3 = servidor.roles.get('')

    if(dados.t === "MESSAGE_REACTION_ADD"){
        if(dados.d.emoji.id === ""){
            if(membro.roles.has(cargo1)) return
            membro.addRole(cargo1)
        }else if(dados.d.emoji.name === "ID OU EMOJI DA REAÇÃO"){
            if(membro.roles.has(cargo2)) return
            membro.addRole(cargo2)
        }else if(dados.d.emoji.id === ""){
            if(membro.roles.has(cargo3)) return
            membro.addRole(cargo3)
        }
    }
    if(dados.t === "MESSAGE_REACTION_REMOVE"){
        if(dados.d.emoji.id === ""){
            if(membro.roles.has(cargo1)) return
            membro.removeRole(cargo1)
        }else if(dados.d.emoji.name === "🔑"){
            if(membro.roles.has(cargo2)) return
            membro.removeRole(cargo2)
        }else if(dados.d.emoji.id === ""){
            if(membro.roles.has(cargo3)) return
            membro.removeRole(cargo3)
        }
    }

})

bot.login(token);