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

    if (text === 'code=like') {
      return this.botClient.sendMessage({
        chat_id: chat_id,
        text: 'Thanks for your feedback'
      });
    }

    if (text === 'code=whoami') {
      return this.botClient.editMessageText({
        chat_id: chat_id,
        text: `${chat_id}`
      });
    }
  }

  handelBotCommand(message) {
    const chat_id = message.from.id;
    const command = message.text.split(' ')[0];
    const params = message.text.split(' ')?.[1];

    if (command === "/start") {
      return this.doAction({
        'name': params || 'start',
        'chat_id': chat_id,
        'language_code': message?.from?.language_code
      });
    }

    if (command === "/help") {
      return this.doAction({
        'name': 'help',
        'chat_id': chat_id,
        'language_code': message?.from?.language_code
      });
    }

    if (command === "/about") {
      return this.doAction({
        'name': 'about',
        'chat_id': chat_id,
        'language_code': message?.from?.language_code
      });
    }
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