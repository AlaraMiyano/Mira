const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('Özel mesajlarını kontrol et. :postbox:');
    message.channel.sendEmbed(ozelmesajkontrol) }
	const pingozel = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('Bot sürümü: v' + ayarlar.surum + ' Yapımcı: **Alara Astak **      Bot yardım komutu ```!mihelp``` Bot Gelişme Aşamasındadır... Yeni Eğlence Komutları Tasarlanıyor... \n\n_**BOTU EKLEMEK İÇİN LİNK:**_\n\nhttps://discordapp.com/api/oauth2/authorize?client_id=564833371453259776&permissions=0&scope=bot \n\n_**Linkler:**_\n\n**Miyano Girls ** sunucusunun davet linki: https://discord.gg/mDNtAVB \nBotun davet linki: https://discordapp.com/api/oauth2/authorize?client_id=564833371453259776&permissions=0&scope=bot\n\n**Owner By Alara#7919**');
    return message.author.sendEmbed(pingozel)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot bilgi', 'botbilgi', 'bb', 'botb', 'bbot', 'hakkında', 'bot hakkında', 'bothakkında'],
  permLevel: 0
};

exports.help = {
  name: 'bilgi',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'bilgi'
};
