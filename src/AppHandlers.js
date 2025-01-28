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
    const chat_id = callback_query?.from?.id;
    const language_code = callback_query?.from?.language_code;
    const text = callback_query.data;
    const callback_message = callback_query?.message;
    if (callback_query.id) {
      this.botClient.answerCallbackQuery({
        'callback_query_id': callback_query.id,
        'text': 'Processing...'
      });
    }

    if (text.startsWith('code=')) {
      const code = text.split('=')?.[1];
      return this.handelCustomCode({
        code: code,
        chat_id: chat_id,
        language_code: language_code,
        message: callback_message
      });
    }

    if (text.startsWith('action=')) {
      const name = text.split('=')?.[1];
      return this.doAction({
        'name': name,
        'language_code': language_code,
        'chat_id': chat_id,
        'message_id': callback_message?.message_id,
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
        'message': message,
        'language_code': message?.from?.language_code
      });
    }

    if (text.startsWith("/help")) {
      return this.doAction({
        'name': 'help',
        'chat_id': chat_id,
        'message': message,
        'language_code': message?.from?.language_code
      });
    }

    if (text.startsWith("/about")) {
      return this.doAction({
        'name': 'about',
        'chat_id': chat_id,
        'message': message,
        'language_code': message?.from?.language_code
      });
    }

    throw new Error(`Command not supported: ${command}`);
  }

  handelCustomCode({ code, chat_id, message }) {
    if (code === 'whoami') {
      if (message?.photo) {
        return this.botClient.editMessageMedia({
          'caption': chat_id,
          'chat_id': chat_id,
          'message_id': message.message_id,
          'media': message.photo?.[0],
          'reply_markup': message.reply_markup
        });
      }

      if (message?.text) {
        return this.botClient.editMessageText({
          'caption': chat_id,
          'chat_id': chat_id,
          'message_id': message.message_id,
          'reply_markup': message.reply_markup
        });
      }

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
    message
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
        return this.handelEditMessageText({
          chat_id: chat_id,
          requestOptions: action?.payload,
          parentMessage: message
        });
      case 'sendPhoto':
        options = {
          'chat_id': chat_id,
          ...action?.payload
        };

        return this.botClient.sendPhoto(options);
      case 'editMessageMedia':
        if (message?.photo) {
          options = {
            'chat_id': chat_id,
            'message_id': message.message_id,
            'media': message.photo?.[0],
            ...action?.payload
          };
          return this.botClient.editMessageMedia(options);
        }
        return this.botClient.sendPhoto({
          'chat_id': chat_id,
          'photo': action?.payload?.media,
          ...action?.payload
        });
      case 'editMessageCaption':
        options = {
          'chat_id': chat_id,
          'message_id': message_id,
          ...action?.payload
        };

        return this.botClient.editMessageCaption(options);
      case 'editMessageReplyMarkup':
        options = {
          'chat_id': chat_id,
          'message_id': message_id,
          ...action?.payload
        };

        return this.botClient.editMessageReplyMarkup(options);
      case 'sendVideo':
        options = {
          'chat_id': chat_id,
          ...action?.payload
        };

        return this.botClient.sendVideo(options);
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

  handelEditMessageText({ chat_id, requestOptions, parentMessage }) {
    if (!parentMessage) {
      throw new Error(`Message not found for chat_id: ${chat_id}`);
    }

    if (parentMessage.photo) {
      return this.botClient.editMessageMedia({
        'chat_id': chat_id,
        'message_id': parentMessage.message_id,
        'media': parentMessage.photo?.[0],
        'caption': requestOptions.text,
        'reply_markup': parentMessage.reply_markup,
        ...requestOptions
      });
    }
  
    if (parentMessage.caption) {
      return this.botClient.editMessageCaption({
        'chat_id': chat_id,
        'message_id': parentMessage.message_id,
        'caption': requestOptions.text,
        'reply_markup': parentMessage.reply_markup,
        ...requestOptions
      });
    }
    if (parentMessage.reply_markup) {
      return this.botClient.editMessageReplyMarkup({
        'chat_id': chat_id,
        'message_id': parentMessage.message_id,
        'reply_markup': parentMessage.reply_markup,
        ...requestOptions
      });
    }
    if (parentMessage.text) {
      return this.botClient.editMessageText({
        'chat_id': chat_id,
        'message_id': parentMessage.message_id,
        'reply_markup': parentMessage.reply_markup,
        ...requestOptions
      });
    }
  }

  handelEditMessageMedia({ chat_id, requestOptions, parentMessage }) {
    if (!parentMessage) {
      throw new Error(`Message not found for chat_id: ${chat_id}`);
    }

    if (parentMessage.photo) {
      return this.botClient.editMessageMedia({
        'chat_id': chat_id,
        'message_id': parentMessage.message_id,
        'caption': parentMessage.caption,
        'reply_markup': parentMessage.reply_markup,
        ...requestOptions
      });
    }

    this.botClient.sendPhoto({
      'chat_id': chat_id,
      'reply_markup': parentMessage.reply_markup,
      ...requestOptions
    });
  }
}