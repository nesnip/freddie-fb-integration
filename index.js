const express = require('express');
const {
  FB, Text, Typing, Image, QuickReplies,
  QuickRepliesOption, DownloadFile,
} = require('adathink-sdk-bot');

const app = express();

app.use(express.json());

//IMPORTANTE!!!!

FB.config({
  TOKEN_FACEBOOK: 'EAAIv9kVfTHABADZCvhLwlfGtiZC2wR1QBZBdYFACnXohLx4NZBcahvebl9tNsbXXczxvyBHa6cWR0RckjjTjNBfgRy40F92BYt5zYV3DXO981ZAJZBRzfRpwZC8QMXZB2GHRRDHe2Kd4krSUCPjWqZAsd5XDXG83FhhmzCKjNAL93JgZDZD',
  KEY_FACEBOOK: 'Freddie Code', 
});

//Enlace entre tu servidor y facebook
app.get('/', FB.checkWebhook);

app.post('/', async (req,res) => {
  //mandar un ok a facebook
  res.sendStatus(200);
  console.log('Llegó un msje', req.body);

  const FBTools = new FB(req.body);
  console.log(FBTools.getMessage());
  console.log(FBTools.getPayload());

  // el bot está escribiendo...
  FBTools.sendDirect(new Typing());

  await FBTools.sleep(1000);

  //manda imagen
  /* const image = new Image('https://ep01.epimg.net/cultura/imagenes/2019/04/11/actualidad/1554992877_490212_1555496326_noticia_normal.jpg');
  FBTools.sendDirect(image); */

  //rptas con botones para opciones
  /* const quick = new QuickReplies('estas opciones');
  const option_email = new QuickRepliesOption.QuickRepliesOption(QuickRepliesOption.TYPE_EMAIL);
  const option_text = new QuickRepliesOption.QuickRepliesOption(QuickRepliesOption.TYPE_TEXT, 'OK', '666'); //OK puede ser una opción

  quick.addOption(option_email);
  quick.addOption(option_text);
  FBTools.sendDirect(quick); */

  //obtener info de usuario
  const user = await FBTools.getInfoUser();
  console.log(user);

  //manda texto
  /* const texto1 = new Text(`Holi ${user.first_name}, soy Freddie`);
  FBTools.sendDirect(texto1); */

  //foto de perfil del usuario
  /* const image = new Image(user.profile_pic);
  FBTools.sendDirect(image); */

  //descarga foto de perfil 
  /* const download =  await DownloadFile.syncDownload(user.profile_pic, {ruta:"./files/perfil.jpg"});
  console.log(download); */

  FBTools.addResponse(new Typing());
  FBTools.addResponse(new Text('Hola soy Freddie :)'));
  // FBTools.addResponse(new Image(''));
  FBTools.addResponse(new Text('¿En qué te puedo ayudar?'));

  const quick = new QuickReplies('Tienes estas opciones');
  const option_email = new QuickRepliesOption.QuickRepliesOption(QuickRepliesOption.TYPE_EMAIL);
  const option_text = new QuickRepliesOption.QuickRepliesOption(QuickRepliesOption.TYPE_TEXT, 'OK', '666'); //OK puede ser una opción

  quick.addOption(option_email);
  quick.addOption(option_text);

  FBTools.addResponse(quick);

  const result = await FBTools.sendResponse();
  console.log(result);
});

app.listen(3150 , () => {
  console.log("Mi servidor esta ejecutando");
});