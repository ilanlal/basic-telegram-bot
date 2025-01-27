class AppHandlers {
  constructor() {
    // initilize bot client
    this.botClient = new TelegramBotClient(AppSecrets.BOT_TOKEN);
  }

  doAction({
    name,
    language_code,
    chat_id,
    message_id = undefined,
    callback_query_id = undefined
  }) {
    const action = AppResources.getAction({
      message: name,
      language_code: language_code
    });

    if (!action) {
      throw new Error(`Action not found for ${name}`);
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