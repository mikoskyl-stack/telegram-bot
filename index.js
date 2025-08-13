import TelegramBot from 'node-telegram-bot-api';

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Commande /dormants
bot.onText(/^\/dormants/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Voici ton rapport des cryptos dormantes :\nhttps://www.bitpanda.com/fr/prix/cosmos-atom");
});

const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const TOKEN = "TON_TOKEN_TELEGRAM"; // Mets ici ton token BotFather
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const WEBHOOK_URL = "https://TON_URL_RENDER.onrender.com/webhook"; // On remplacera après déploiement

// Fonction pour envoyer un message
async function sendMessage(chatId, text) {
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: text
  });
}

// Commande /dormants
app.post('/webhook', async (req, res) => {
  const message = req.body.message;
  if (!message || !message.text) return res.sendStatus(200);

  const chatId = message.chat.id;
  const text = message.text.trim();

  if (text === '/dormants' || text.startsWith('/dormants@')) {
    const lien = "https://www.bitpanda.com/fr/prix/cosmos-atom";
    await sendMessage(chatId, lien);
  }

  res.sendStatus(200);
});

// Route test
app.get('/', (req, res) => {
  res.send("Bot Telegram actif !");
});

// Lancer serveur
app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
