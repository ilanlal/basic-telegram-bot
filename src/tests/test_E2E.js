class Test_E2E {
    constructor({ botToken, chat_id }) {
        this.botClient = new TelegramBotClient(botToken);
        this.chat_id = parseInt(chat_id);
    }

    test_setWebhook(webhookUrl) {
        Logger.log("test_setWebhook");
        const res = this.botClient.setWebhook(webhookUrl);
        Logger.log(webhookUrl);
        return true;
    }

    test_sendMessage() {
        Logger.log("test_sendMessage");
        const html = '<blockquote>Hi.. this is test</blockquote>';
        const keyboard = [[
            { text: "Open YouTube™️", web_app: { url: "https://www.youtube.com" } }
        ], [
            { callback_data: "🎳", text: "🎳" },
            { callback_data: "🏀", text: "🏀" }
        ], [
            { callback_data: "🎰", text: "🎰" },
            { callback_data: "🎲", text: "🎲" }
        ]];

        const reply_markup = {
            inline_keyboard: keyboard
        }


        const res = this.botClient.sendMessage({
            chat_id: this.chat_id,
            text: html,
            reply_markup: JSON.stringify(reply_markup)
        });

        Logger.log(res);
    }
}

