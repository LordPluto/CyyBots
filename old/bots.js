const Discord = require("discord.js");
const smug = new Discord.Client();
const yandere = new Discord.Client();

const config = require("./config.json");
const fs = require("fs");

smug.on("ready", () => {
  console.log("Smug ready!");
});

yandere.on("ready", () => {
  console.log("Yandere ready!");
});

smug.on("message", (message) => {
  // Exit and stop if prefix isn't there
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if (command === 'ping') {
    message.channel.send("Smug pong!");
  } else
	  
  if (command === "date") {
	let [age, sex, location] = args;
	message.reply(`Hah! ${message.author.username}, you think you're cool enough to date me?`);
  }
});

yandere.on("message", (message) => {
  // Exit and stop if prefix isn't there
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if (command === 'ping') {
    message.channel.send("Yandere pong!");
  } else
	  
  if(command === 'prefix') {
	// Gets the prefix from the command
	let [newPrefix] = args;
	config.prefix = newPrefix;
	
	// Write the file
	fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
	message.reply(`I changed the prefix to ${newPrefix} just for you! <3`);
  }
});

smug.login(config.smugtoken);
yandere.login(config.yanderetoken);