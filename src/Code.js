
function doPost(e) {
    const contents = JSON.parse(e.postData.contents);

    if (contents?.message?.entities?.[0]?.type === "bot_command") {
        return handelBotCommand(contents.message);
    }

    if (contents.callback_query) {
        return handleCallbackQuery(contents.callback_query);
    }
}

function handelBotCommand(message) {
    const chat_id = message.from.id;
    const command = message.text;
    const language_code = message.from.language_code;
    const resources = language_code === 'es' ? Resources.es : Resources.en;
    
    // initilize bot client
    const scriptProperties = PropertiesService.getScriptProperties();
    const botToken = scriptProperties.getProperty('BOT_TOKEN');
    const botClient = new TelegramBotClient(botToken);

    if (command === "/start") {
        const reply_markup = buildInlineKeyboard(resources);

        return botClient.sendMessage({
            chat_id: chat_id,
            text: resources.hello,
            reply_markup: reply_markup
        });
    }

    if (command === "/help") {
        return botClient.sendMessage({
            chat_id: chat_id,
            text: resources.help
        });
    }
}

function handleCallbackQuery(callback_query) {
    const chat_id = callback_query.from.id;
    const language_code = callback_query.from.language_code;
    const resources = language_code === 'es' ? Resources.es : Resources.en;
    const data_text = callback_query.data;
    const scriptProperties = PropertiesService.getScriptProperties();
    const botToken = scriptProperties.getProperty('BOT_TOKEN');
    const botClient = new TelegramBotClient(botToken);

    if (data_text === 'like') {
        return botClient.sendMessage({
            chat_id: chat_id,
            text: resources.thanks
        });
    }

    if (data_text === 'whoami') {
        return botClient.sendMessage({
            chat_id: chat_id,
            text: `${chat_id} ${language_code}`
        });
    }
}

function buildInlineKeyboard(resources) {
    const keyboard = [[
        { text: "YouTube™️", web_app: { url: "https://www.youtube.com" } }
    ], [
        { text: `${resources.whoami}`, callback_data: "whoami" }
    ], [
        { text: `${resources.like}`, callback_data: "like" }
    ]];

    const reply_markup = {
        inline_keyboard: keyboard
    };

    return JSON.stringify(reply_markup);
}