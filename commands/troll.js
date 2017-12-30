exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
  // Arg 1 is the channel name or idea
  const [channelid, ...note] = args.splice(0);
  
  const config = client.config;
  
  const channelname = channelid == "general" ? config.general :
	channelid == "overlords" ? config.overlords :
	channelid == "bot-testing" ? config.bottesting : "null";
	
  const channel = channelname != "null" ? client.channels.get(channelname) : message.channel;
  
  channel.send(note.join(" "));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "troll",
  category: "Miscellaneous",
  description: "Don't worry about it.",
  usage: "troll channelid <text to test>"
};
