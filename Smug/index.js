// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform
// you.
if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

// Load up the discord.js library
const Discord = require("discord.js");
// We also load the rest of the things we need in this file:
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");

// This is your smug. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `smug.something`,
// or `bot.something`, this is what we're refering to. Your smug.
const smug = new Discord.Client();
const yandere = new Discord.Client();

// Here we load the config file that contains our token and our prefix values.
smug.config = require("./config.js");
yandere.config = require("./config.js");
// smug.config.token contains the bot's token
// smug.config.prefix contains the message prefix

// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
require("./modules/functions.js")(smug);
require("./modules/functions.js")(yandere);

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
smug.commands = new Enmap();
smug.aliases = new Enmap();
yandere.commands = new Enmap();
yandere.aliases = new Enmap();

// Now we integrate the use of Evie's awesome Enhanced Map module, which
// essentially saves a collection to disk. This is great for per-server configs,
// and makes things extremely easy for this purpose.
smug.settings = new Enmap({provider: new EnmapLevel({name: "settings-smug"})});
yandere.settings = new Enmap({provider: new EnmapLevel({name: "settings-yandere"})});

// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.

const init = async () => {

  // Here we load **commands** into memory, as a collection, so they're accessible
  // here and everywhere else.
  const cmdFiles = await readdir("./commands/");
  smug.log("log", `Hibiki loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = smug.loadCommand(f);
    if (response) console.log(response);
  });
  yandere.log("log", `Yanagi loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = yandere.loadCommand(f);
    if (response) console.log(response);
  });
  

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");
  smug.log("log", `Hibiki loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    // This line is awesome by the way. Just sayin'.
    smug.on(eventName, event.bind(null, smug));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
  yandere.log("log", `Yanagi loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    // This line is awesome by the way. Just sayin'.
    yandere.on(eventName, event.bind(null, yandere));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  // Generate a cache of permissions for pretty perms
  smug.levelCache = {};
  for (let i = 0; i < smug.config.permLevels.length; i++) {
    const thisLevel = smug.config.permLevels[i];
    smug.levelCache[thisLevel.name] = thisLevel.level;
  }
  yandere.levelCache = {};
  for (let i = 0; i < yandere.config.permLevels.length; i++) {
    const thisLevel = yandere.config.permLevels[i];
    yandere.levelCache[thisLevel.name] = thisLevel.level;
  }

  // Here we login the bots.
  smug.login(smug.config.smugtoken);
  yandere.login(yandere.config.yanderetoken);

// End top-level async/await function.
};

init();
