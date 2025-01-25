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

    if (command === "/start") {
        return doAction({
            'message': 'start',
            'chat_id': chat_id,
            'language_code': message?.from?.language_code
        });
    }

    if (command === "/help") {
        return doAction({
            'message': 'help',
            'chat_id': chat_id,
            'language_code': message?.from?.language_code
        });
    }

    if (command === "/about") {
        return doAction({
            'message': 'about',
            'chat_id': chat_id,
            'language_code': message?.from?.language_code
        });
    }
}

function handleCallbackQuery(callback_query) {
    const chat_id = callback_query.from.id;
    const language_code = callback_query.from.language_code;
    const resource = getResource(language_code);
    const text = callback_query.data;
    const scriptProperties = PropertiesService.getScriptProperties();
    const botToken = scriptProperties.getProperty('BOT_TOKEN');
    const botClient = new TelegramBotClient(botToken);

    if (text === 'code=like') {
        return botClient.sendMessage({
            chat_id: chat_id,
            text: 'Thanks for your feedback'
        });
    }

    if (text === 'code=whoami') {
        return botClient.editMessageText({
            chat_id: chat_id,
            text: `${chat_id} ${language_code}`
        });
    }
}

function doAction({ message, chat_id, language_code }) {
    const action = getAction({message, language_code});

    if (!action) {
        throw new Error(`Action not found for ${message}`);
    }

    let options = {
        'chat_id': chat_id,
        ...action?.payload
    };

    // initilize bot client
    const scriptProperties = PropertiesService.getScriptProperties();
    const botToken = scriptProperties.getProperty('BOT_TOKEN');
    const botClient = new TelegramBotClient(botToken);
    return botClient.sendMessage(options);
}