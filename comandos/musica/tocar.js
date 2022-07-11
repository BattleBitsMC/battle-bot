var Discord = require("discord.js");
var ytdl = require("ytdl-core");
var info = require("youtube-info");
var Api = require("simple-youtube-api");
var musicas = require("../../queue.js");
var key = new Api("AIzaSyA3aokDmNLvRQ4_byvxoUcp6n2nwXihlCY"); //Key
var escolhendo = [];

module.exports.run = async (bot, message, args) => {
  let razaou = args.slice(0).join(" ");
  var musicaID;
  var config;
  var playlist = false;

  if (!escolhendo.includes(message.author.id + message.guild.id)) {
    if (message.member.voiceChannel) {
      if (!razaou.length < 1 && razaou !== "#") {
        if (
          args.length === 1 &&
          args[0].startsWith("https://www.youtube.com/watch?v=")
        ) {
          musicaID = args[0].replace("https://www.youtube.com/watch?v=", "");
          key.searchVideos(musicaID, 10).then(encontrados => {
            if (encontrados.length > 0) {
              tocar();
            } else {
              message.channel.send(
                `**${message.author.username}**, nenhuma música foi encontrada.`
              );
            }
          });
        } else if (
          args.length === 1 &&
          args[0].startsWith("https://www.youtube.com/playlist?list=")
        ) {
          playlist = true;
          tocar();
        } else {
          key.searchVideos(razaou, 10).then(encontrados => {
            if (encontrados.length > 0) {
              var numero = 0;
              var embedRS = new Discord.RichEmbed()
                .setTitle("Escolha um número:", { searchArgs: razaou })
                .setDescription(
                  `${encontrados
                    .map(
                      musica =>
                        `**${++numero}** - **[${musica.title}](${musica.url})**`
                    )
                    .join("\n")}`
                )
                .setColor(16562432)
                .setTimestamp(new Date())
                .setFooter(
                  message.author.username,
                  message.author.displayAvatarURL
                );
              message.channel.send(`${message.author}`, embedRS).then(msgRS => {
                escolhendo.unshift(message.author.id + message.guild.id);
                message.channel
                  .awaitMessages(
                    message1 =>
                      message1.content > 0 &&
                      message1.content <= 11 &&
                      message1.content <= encontrados.length &&
                      message1.author.id === message.author.id,
                    {
                      maxMatches: 1,
                      time: 30000,
                      errors: ["time"]
                    }
                  )
                  .then(coletado => {
                    musicaID =
                      encontrados[Number(coletado.first().content) - 1].id;
                    escolhendo.splice(escolhendo.indexOf(message.author.id), 1);
                    msgRS.delete();
                    tocar();
                  })
                  .catch(erro => {
                    escolhendo.splice(
                      escolhendo.indexOf(message.author.id + message.guild.id),
                      1
                    );
                    msgRS.delete();
                    message.channel.send(
                      `**${message.author.username}**, você demorou muito para escolher.`
                    );
                  });
              });
            } else {
              message.channel.send(
                `**${message.author.username}**, nenhuma música encontrada.`,
                { searchArgs: razaou }
              );
            }
          });
        }
      }
    } else {
      message.channel.send(
        `**${message.author.username}**, você não está em um canal de música.`
      );
    }
  }

  async function tocar() {
    if (
      message.member.voiceChannel.permissionsFor(bot.user.id).has("SPEAK") &&
      message.member.voiceChannel.permissionsFor(bot.user.id).has("CONNECT")
    ) {
      if (!musicas.queue.get(message.guild.id)) {
        if (message.guild.me.voiceChannel) {
          await message.guild.me.voiceChannel.leave();
          ascP();
        } else {
          ascP();
        }
        async function ascP() {
          message.member.voiceChannel
            .join()
            .then(canal => {
              config = {
                guild: message.guild.id,
                channel: canal,
                repetir: 0,
                inicio: new Date(),
                atual: 0,
                canal: message.channel.id,
                atividade: 0,
                restart: false,
                som: {
                  titulo: [],
                  time: [],
                  id: [],
                  por: []
                },
                connection: null
              };
              musicas.queue.set(message.guild.id, config);
              tocar2();
            })
            .catch(erro => {
              console.log(erro);
            });
        }
      } else if (message.guild.me.voiceChannel) {
        if (
          message.guild.me.voiceChannel.id === message.member.voiceChannel.id
        ) {
          tocar2();
        } else {
          message.channel.send(
            `**${message.author.username}**, você precisa entrar em um canal de música.`,
            { prefix: "-" }
          );
        }
      } else {
        musicas.queue.delete(message.guild.id);
      }
    } else {
      message.channel.send(
        `**${message.author.username}**, não tenho permissão para cantar.`
      );
    }
  }

  async function tocar2() {
    if (!playlist) {
      if (!musicas.queue.get(message.guild.id).som.id[0]) {
        info(musicaID, (erro, music) => {
          let tempo = Math.floor(music.duration);
          let horas;
          let minutos;
          let minutos2;
          let segundos;
          if (tempo >= 3600) {
            horas = Math.floor(tempo / 60 / 60);
            minutos = Math.floor(tempo / 60);
            minutos2 = Math.floor(tempo / 60 - horas * 60);
            segundos = Math.floor(tempo - minutos * 60);
          } else {
            horas = 0;
            minutos = Math.floor(tempo / 60);
            minutos2 = Math.floor(tempo / 60);
            segundos = Math.floor(tempo - minutos * 60);
          }
          message.channel.send(`${message.author}`, {
            embed: {
              description: `Tocando agora: **[${music.title}](${
                music.url
              })**\nDuração: \`\`\ ${(horas < 10 ? "0" + horas : horas) +
                ":" +
                (minutos2 < 10 ? "0" + minutos2 : minutos2) +
                ":" +
                (segundos < 10
                  ? "0" + segundos
                  : segundos)}\`\`\ \nAdicionado por ${
                message.author
              }\n\nCanal: \`\`\ ${music.owner}\`\`\ \nGostei: \`\`\ ${Number(
                music.likeCount
              ).toLocaleString()}\`\`\ \nNâo gostei: \`\`\ ${Number(
                music.dislikeCount
              ).toLocaleString()} \`\`\ \nVisualizações: \`\`\ ${Number(
                music.views
              ).toLocaleString()}\`\`\ `,
              author: {
                name: music.title,
                icon_url: music.thumbnailUrl
              },
              color: 16562432,
              footer: {
                text: message.author.username,
                icon_url: message.author.displayAvatarURL
              },
              thumbnail: { url: music.thumbnailUrl },
              timestamp: new Date()
            }
          });
          musicas.queue.get(message.guild.id).som.titulo.push(music.title);
          musicas.queue.get(message.guild.id).som.time.push(music.duration);
          musicas.queue.get(message.guild.id).som.id.push(musicaID);
          musicas.queue.get(message.guild.id).som.por.push(message.author.id);
          play(musicaID);
        });
      } else {
        info(musicaID, (erro, music) => {
          message.channel.send(
            `**${message.author.username}**, música adicionada na playlist.`,
            { music: music.title, member: message.author }
          );
          musicas.queue.get(message.guild.id).som.titulo.push(music.title);
          musicas.queue.get(message.guild.id).som.time.push(music.duration);
          musicas.queue.get(message.guild.id).som.id.push(musicaID);
          musicas.queue.get(message.guild.id).som.por.push(message.author.id);
        });
      }
    } else {
      key
        .getPlaylist(razaou)
        .then(playlist => {
          playlist.getVideos().then(videos => {
            message.channel.startTyping();
            videos.forEach(addplay => {
              if (!musicas.queue.get(message.guild.id).som[0]) {
                musicas.queue.get(message.guild.id).som.id.push(addplay.id);
                musicas.queue
                  .get(message.guild.id)
                  .som.titulo.push(addplay.title);
                musicas.queue
                  .get(message.guild.id)
                  .som.time.push(addplay.duration);
                musicas.queue
                  .get(message.guild.id)
                  .som.por.push(message.author.id);
                play(addplay.id);
              } else {
                musicas.queue.get(message.guild.id).som.id.push(addplay.id);
                musicas.queue
                  .get(message.guild.id)
                  .som.titulo.push(addplay.title);
                musicas.queue
                  .get(message.guild.id)
                  .som.time.push(addplay.duration);
                musicas.queue
                  .get(message.guild.id)
                  .som.por.push(message.author.id);
              }
            });
            message.channel.stopTyping();
            message.channel.send(
              `**${message.author.username}**, playlist adicionada com sucesso.`,
              { playlistLength: videos.length }
            );
          });
        })
        .catch(a => {
          message.channel.send(
            `**${message.author.username}**, playlist inválida.`
          );
        });
    }
  }

  async function play(music1) {
    musica2 = await musicas.queue.get(message.guild.id).channel.playStream(
      ytdl(music1, {
        filter: "audioonly"
      }),
      {
        volume: 0.5,
        passes: 3
      }
    );
    musicas.queue.get(message.guild.id).connection = musica2;

    await musicas.queue
      .get(message.guild.id)
      .connection.on("end", function(reason) {
        if (reason !== null) {
          if (!musicas.queue.get(message.guild.id).restart) {
            if (musicas.queue.get(message.guild.id).repetir === 0) {
              musicas.queue
                .get(message.guild.id)
                .som.por.splice(musicas.queue.get(message.guild.id).atual, 1);
              musicas.queue
                .get(message.guild.id)
                .som.id.splice(musicas.queue.get(message.guild.id).atual, 1);
              musicas.queue
                .get(message.guild.id)
                .som.titulo.splice(
                  musicas.queue.get(message.guild.id).atual,
                  1
                );
              musicas.queue
                .get(message.guild.id)
                .som.time.splice(musicas.queue.get(message.guild.id).atual, 1);
              musicas.queue.get(message.guild.id).atual = 0;
              if (musicas.queue.get(message.guild.id).som.id[0]) {
                play(
                  "https://www.youtube.com/watch?v=" +
                    musicas.queue.get(message.guild.id).som.id[0]
                );
                musicas.queue.get(message.guild.id).inicio = new Date();
              } else {
                musicas.queue.get(message.guild.id).channel.disconnect();
                musicas.queue.delete(message.guild.id);
              }
            } else if (musicas.queue.get(message.guild.id).repetir === 1) {
              play(
                "https://www.youtube.com/watch?v=" +
                  musicas.queue.get(message.guild.id).som.id[
                    musicas.queue.get(message.guild.id).atual
                  ]
              );
              musicas.queue.get(message.guild.id).inicio = new Date();
            } else if (musicas.queue.get(message.guild.id).repetir === 2) {
              musicas.queue.get(message.guild.id).atual =
                musicas.queue.get(message.guild.id).atual + 1 ===
                musicas.queue.get(message.guild.id).som.titulo.length
                  ? 0
                  : musicas.queue.get(message.guild.id).atual + 1;
              play(
                "https://www.youtube.com/watch?v=" +
                  musicas.queue.get(message.guild.id).som.id[
                    musicas.queue.get(message.guild.id).atual
                  ]
              );
              musicas.queue.get(message.guild.id).inicio = new Date();
            }
          } else {
            play(
              "https://www.youtube.com/watch?v=" +
                musicas.queue.get(message.guild.id).som.id[
                  musicas.queue.get(message.guild.id).atual
                ]
            );
            musicas.queue.get(message.guild.id).inicio = new Date();
          }
        } else {
          play(
            "https://www.youtube.com/watch?v=" +
              musicas.queue.get(message.guild.id).som.id[0]
          );
          musicas.queue.get(message.guild.id).inicio = new Date();
        }
      });
  }
};

module.exports.info = {
  name: "tocar",
  aliases: ["play"]
};