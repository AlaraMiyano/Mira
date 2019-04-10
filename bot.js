const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('guildBanAdd' , (guild, user) => {
  let chat = guild.channels.find('name', 'chat');
  if (!chat) return;
  chat.send('Sen ```Bizimle Değilsin```Bye  '+ user.username +'https://tenor.com/view/fake-flip-off-middle-finger-bye-wave-gif-5337173' );
});

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
      msg.reply('Aleyküm Selam Hoşgeldin !');
  }
if (msg.content.toLowerCase() === 'miyano') {
    msg.reply('Miyano Girls <3 https://tenor.com/view/miyano-anime-kawai-gif-7201594 Sunucu Linkimi:https://discord.gg/mDNtAVB');
  }
  if (msg.content.toLowerCase() === 'sahip') {
    msg.reply('Owner By Alara#7919 https://tenor.com/view/miyano-anime-kawaii-blink-gif-7201589');
  }
  if (msg.content.toLowerCase() === 'nasılsın') {
    msg.reply('Iyı olmak dileğiyle :heart: ya siz ?');
  }
  if (msg.content.toLowerCase() === 'hg') {
    msg.channel.sendMessage('**Hoşgeldiniz Yeni Üyeler** :heart: https://tenor.com/view/welcome-anime-fgo-glasses-gif-12295849');
  }
  if (msg.content ===  'link') {
    msg.channel.send('s```Beni Kendi Sunucunuza Eklemek istermisiniz```s :heart: https://discordapp.com/api/oauth2/authorize?client_id=564833371453259776&permissions=0&scope=bot');
  }
  if (msg.content.toLowerCase() === 'Günaydın') {
    msg.reply('Günaydın :heart:');
  }
  if (msg.content.toLowerCase() === 'iyi geceler') {
    msg.reply('Tatlı Rüyalar :heart:');
  }
  if (msg.content.toLowerCase() === 'hii') {
    msg.reply('Hiiya :heart:');
  }
  if (msg.content.toLowerCase() === 'miyano oyun') {
    msg.channel.sendMessage('Oyunlar İçin Lutfen Ses Odaların Geçin !! https://tenor.com/view/hello-anime-peace-out-bye-gif-12719749');
  }
  if (msg.content.toLowerCase() === 'mi') {
    msg.reply('Mira ```[1] Mira Alara Sunucu Botuyum      [2] Turkish only.         [3] Gelişme Aşamasındayım       [4] Yeni Komutlar !mi / Yeni Sürümü Hazırlanıyor...             [5] Sosyal Active and Moderatör Active [6] !mi  / !mihelp  commands [7] Şikayet veya önerileriniz @Alara#7919  İletebilirsiniz... ```Alara');
  }

});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.BOT_TOKEN);
