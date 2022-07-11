exports.run = client => {
  const config = require("./config.json");
  client.user.setGame(config.prefix + "help");
  console.log(`BattleBits já se encontra online!`);
};
