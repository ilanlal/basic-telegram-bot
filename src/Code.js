function doPost(e) {
    const contents = JSON.parse(e.postData.contents);
    try {
        if (contents?.message?.entities?.[0]?.type === "bot_command") {
            return handelBotCommand(contents.message);
        }

        if (contents.callback_query) {
            return handleCallbackQuery(contents.callback_query);
        }
    } catch (error) {
        console.error(error);
        Logger.log(error);
        throw new Error(error);
    }
}

function handelBotCommand(message) {
    const chat_id = message.from.id;
    const command = message.text;
    const resource = getResource(message.from.language_code);

    // initilize bot client
    const scriptProperties = PropertiesService.getScriptProperties();
    const botToken = scriptProperties.getProperty('BOT_TOKEN');
    const botClient = new TelegramBotClient(botToken);

    if (command === "/start") {
        const reply_markup = {
            inline_keyboard: resource?.start?.reply_markup || {}
        }
        return botClient.sendMessage({
            chat_id: chat_id,
            text: resource?.start?.text || '..🫢..🫢',
            reply_markup: JSON.stringify(reply_markup)
        });
    }

    if (command === "/help") {
        const reply_markup = {
            inline_keyboard: resource?.help?.reply_markup || {}
        }
        return botClient.sendMessage({
            chat_id: chat_id,
            text: resource?.help?.text || '..🫢..🫢',
            reply_markup: JSON.stringify(reply_markup)
        });
    }
}

function handleCallbackQuery(callback_query) {
    const chat_id = callback_query.from.id;
    const language_code = callback_query.from.language_code;
    const resource = getResource(language_code);
    const data_text = callback_query.data;
    const scriptProperties = PropertiesService.getScriptProperties();
    const botToken = scriptProperties.getProperty('BOT_TOKEN');
    const botClient = new TelegramBotClient(botToken);

    this.botClient.answerCallbackQuery({
        callback_query_id: callback_query.id,
        text: resource.thanks.text || '🫢',
        cache_time: 10
    });

    if (data_text === 'like') {
        const reply_markup = {
            inline_keyboard: resource?.help?.reply_markup || {}
        }
        return botClient.sendMessage({
            chat_id: chat_id,
            text: resource.thanks.text || '🫢',
            reply_markup: JSON.stringify(reply_markup)
        });
    }

    if (data_text === 'whoami') {
        return botClient.sendMessage({
            chat_id: chat_id,
            text: `${chat_id} ${language_code}`
        });
    }
}