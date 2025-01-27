class AppHandlers {
  constructor() {
    // initilize bot client
    this.botClient = new TelegramBotClient(AppSecrets.BOT_TOKEN);
  }

  handelDoPost(e) {
    const contents = JSON.parse(e.postData.contents);

    if (contents.message) {
      return this.handelMessageEvent(contents.message);
    }

    if (contents.callback_query) {
      return this.handelCallbackQueryEvent(contents.callback_query);
    }
  }

  handelMessageEvent(message) {
    if (message?.entities?.[0]?.type === "bot_command") {
      return this.handelBotCommand(message);
    }

    // TODO: handle other message types like text, photo, video, etc.
    throw new Error(`Message type not supported: ${message}`);
  }

  handelCallbackQueryEvent(callback_query) {
    const chat_id = callback_query.from.id;
    const language_code = callback_query.from.language_code;
    const text = callback_query.data;

    if (text.startsWith('code=')) {
      const code = text.split('=')?.[1];
      return this.handelCustomCode({
        code: code,
        chat_id: chat_id,
        language_code: language_code
      });
    }

    if (text.startsWith('action=')) {
      const name = text.split('=')?.[1];
      return this.doAction({
        'name': name,
        'language_code': language_code,
        'chat_id': chat_id,
        'message_id': callback_query?.message?.message_id,
        'callback_query_id': callback_query.id
      });
    }
  }

  handelBotCommand(message) {
    const chat_id = message.from.id;
    const text = message.text;

    if (text.startsWith("/start")) {
      const params = message.text.split(' ')?.[1];
      return this.doAction({
        'name': params || 'start',
        'chat_id': chat_id,
        'message_id': message.message_id,
        'language_code': message?.from?.language_code
      });
    }

    if (text.startsWith("/help")) {
      return this.doAction({
        'name': 'help',
        'chat_id': chat_id,
        'language_code': message?.from?.language_code
      });
    }

    if (text.startsWith("/about")) {
      return this.doAction({
        'name': 'about',
        'chat_id': chat_id,
        'language_code': message?.from?.language_code
      });
    }

    throw new Error(`Command not supported: ${command}`);
  }

  handelCustomCode({ code, chat_id }) {
    if (code === 'whoami') {
      return this.botClient.sendMessage({
        'text': chat_id,
        'chat_id': chat_id
      });
    }

    throw new Error(`Custom Code not supported: "${code}"`);
  }

  doAction({
    name,
    language_code,
    chat_id,
    message_id,
    callback_query_id
  }) {
    const action = AppResources.getAction({
      message: name,
      language_code: language_code
    });

    if (!action) {
      throw new Error(`Action not found for "${name}"`);
    }
    var options = {};

    switch (action?.method) {
      case 'sendMessage':
        options = {
          'chat_id': chat_id,
          ...action?.payload
        };

        return this.botClient.sendMessage(options);
      case 'editMessageText':
        options = {
          'chat_id': chat_id,
          'message_id': message_id,
          ...action?.payload
        };
        return this.botClient.editMessageText(options);
      case 'answerCallbackQuery':
        options = {
          'callback_query_id': callback_query_id,
          ...action?.payload
        };

        return this.botClient.answerCallbackQuery(options);
      default:
        throw new Error(`Method not found for ${name}`);
    }
  }
}