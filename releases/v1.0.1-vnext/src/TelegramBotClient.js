/**
 * @version 1.0.1
 * @class TelegramBotClient
 * @classdesc This class is used to interact with the Telegram Bot API.
 * @example
 * const botToken = [YOUR_BOT_TOKEN];
 * const chat_id = [YOUR_CHAT_ID];
 * const botClient = new TelegramBotClient(botToken);
 * 
 * botClient.sendMessage({
 *  chat_id: chat_id,
 *  text: "Hi.. this is test"
 * });
 * 
 * @see https://github.com/ilanlal/basic-telegram-bot
 */

class TelegramBotClient {
  /**
   * @param {string} botToken The bot token from the Telegram Bot API.
   * @constructor
   * @example
   * const botToken = [YOUR_BOT_TOKEN];
   * const botClient = new TelegramBotClient(botToken);
   */
  constructor(botToken = '[YOUR_BOT_TOKEN') {
    this.telegramEnpBaseUrl = "https://api.telegram.org/bot" + botToken;
  }

  /**
   * v8.2
   * Post sendMessgae to the API endpoint.
   * @see https://core.telegram.org/bots/api#sendmessage 
   * 
   * @param {object} requestOptions The sendMessage paramters, see: https://core.telegram.org/bots/api#sendmessage
   * @param {string} requestOptions.chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param {string} requestOptions.text Text of the message to be sent, 1-4096 characters after entities parsing
   * To see the full list of parameters, see: https://core.telegram.org/bots/api#sendmessage
   * @returns {object} The response from the API endpoint.
   * 
   * @example
   * const botToken = [YOUR_BOT_TOKEN];
   * const chatId = [YOUR_CHAT_ID];
   * const botClient = new TelegramBotClient(botToken);
   * 
   * botClient.sendMessage({
   *  chat_id: chatId,
   *  text: "Hi.. this is test"
   * });
   */
  sendMessage(requestOptions) {
    if (!requestOptions.chat_id) {
      throw new Error("chat_id is required!");
    }

    if (!requestOptions.text) {
      throw new Error("text is required!");
    }

    const data = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(requestOptions)
    };

    const url = this.getApiBaseUrl() + "/sendMessage";
    return UrlFetchApp.fetch(url, data);
  }

  /**
   * v8.2
   * Post editMessageText to the API endpoint
   * 
   * @param {object} requestOptions The editMessageText paramters, see: https://core.telegram.org/bots/api#editmessagetext 
   */
  editMessageText(requestOptions) {
    if (!requestOptions.chat_id && !requestOptions.inline_message_id) {
      throw new Error("chat_id or inline_message_id is required!");
    }

    if (!requestOptions.message_id && !requestOptions.inline_message_id) {
      throw new Error("message_id or inline_message_id is required!");
    }

    if (!requestOptions.text) {
      throw new Error("text is required!");
    }

    const data = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(requestOptions)
    };

    const url = this.getApiBaseUrl() + "/editMessageText";
    return UrlFetchApp.fetch(url, data);
  }

  /**
   * v8.2
   * Use this method to send photos. On success, the sent Message is returned.
   * @see https://core.telegram.org/bots/api#sendphoto
   * To see the full list of parameters, see: https://core.telegram.org/bots/api#sendphoto
   * @returns {object} The response from the API endpoint.
   * 
   * @example
   * const botToken = [YOUR_BOT_TOKEN];
   * const chatId = [YOUR_CHAT_ID];
   * const botClient = new TelegramBotClient(botToken);
   * 
   * botClient.sendPhoto({
   *  chat_id: chatId,
   *  photo: "https://example.com/image.jpg",
   *  caption: "This is a <b>test image</b>",
   *  parse_mode: "HTML",
   *  has_spoiler: false,
   *  disable_notification: true,
   *  protect_content: false
   * });
   */
  sendPhoto(requestOptions) {
    if (!requestOptions.chat_id) {
      throw new Error("chat_id is required!");
    }

    if (!requestOptions.photo) {
      throw new Error("photo is required!");
    }

    const options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(requestOptions)
    };

    const url = this.getApiBaseUrl() + `/sendPhoto`;
    return UrlFetchApp.fetch(url, options);
  }

  /**
   * v8.2
   * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .ogg file encoded with OPUS (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
   */
  editMessageMedia(requestOptions) {
    if (!requestOptions.chat_id && !requestOptions.inline_message_id) {
      throw new Error("chat_id or inline_message_id is required!");
    }
    if (!requestOptions.media) {
      throw new Error("media is required!");
    }
    if (!requestOptions.message_id && !requestOptions.inline_message_id) {
      throw new Error("message_id or inline_message_id is required!");
    }

    const options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(requestOptions)
    };

    const url = this.getApiBaseUrl() + `/editMessageMedia`;
    return UrlFetchApp.fetch(url, options);
  }

  /**
   * v8.2
   * Post sendMediaGroup to the API endpoint.
   * 
   * @param {object} requestOptions The sendMediaGroup paramters, see: https://core.telegram.org/bots/api#sendmediagroup
   * @returns {object} The response from the API endpoint.
   **/
  sendMediaGroup(requestOptions) {
    const options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(requestOptions)
    };

    const url = this.getApiBaseUrl() + `/sendMediaGroup`;
    return UrlFetchApp.fetch(url, options);
  }

  /**
   * v8.2
   * Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   * https://core.telegram.org/bots/api#editmessagecaption
   */
  editMessageCaption(requestOptions) {
    if (!requestOptions.chat_id && !requestOptions.inline_message_id) {
      throw new Error("chat_id or inline_message_id is required!");
    }

    if (!requestOptions.caption) {
      throw new Error("caption is required!");
    }

    if (!requestOptions.message_id && !requestOptions.inline_message_id) {
      throw new Error("message_id or inline_message_id is required!");
    }

    const data = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(requestOptions)
    };
    const url = this.getApiBaseUrl() + "/editMessageCaption";
    return UrlFetchApp.fetch(url, data);
  }

  /**
    * v8.2 
    * Use this method to send video files, Telegram clients support mp4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
    * https://core.telegram.org/bots/api#sendvideo
    * @param {object} requestOptions The sendVideo paramters, see: https://core.telegram.org/bots/api#sendvideo
    * @returns {object} The response from the API endpoint.
   **/
  forwardMessage(requestOptions) {
    const options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(requestOptions)
    };

    const url = this.getApiBaseUrl() + `/forwardMessage`;
    return UrlFetchApp.fetch(url, options);
  }

  /**
   * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future.
   * 
   * https://core.telegram.org/bots/api#sendanimation
   */
  sendAnimation(requestOptions) {
    const options = {
      'method': 'post',
      'contentType': 'application/json', //multipart/form-data
      'payload': JSON.stringify(requestOptions)
    };

    const url = this.getApiBaseUrl() + `/sendAnimation`;
    return UrlFetchApp.fetch(url, options);
  }

  /**
   * Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
   * 
   * https://core.telegram.org/bots/api#sendvideo
   */
  sendVideo(requestOptions) {
    const options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(requestOptions)
    };

    const url = this.getApiBaseUrl() + '/sendVideo';
    return UrlFetchApp.fetch(url, options);
  }

  deleteMessage({ chat_id, message_id }) {
    const url = `${this.getApiBaseUrl()}/deleteMessage?chat_id=${chat_id}&message_id=${message_id}`;
    return UrlFetchApp.fetch(url);
  }

  copyMessage({ from_chat_id, to_chat_id, message_id }) {
    const data = {
      'method': "post",
      'payload': {
        'chat_id': String(to_chat_id),
        'from_chat_id': String(from_chat_id),
        'message_id': String(message_id),
      }
    };
    const url = this.getApiBaseUrl() + "/copyMessage";
    return UrlFetchApp.fetch(url, data);
  }

  /**
   * v8.2
   * Use this method to send answers to callback queries sent from inline keyboards. 
   * The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. 
   * On success, True is returned.
   * https://core.telegram.org/bots/api#answercallbackquery
   */
  answerCallbackQuery(requestOptions) {
    if (!requestOptions.callback_query_id) {
      throw new Error("callback_query_id is required!");
    }

    if (!requestOptions.text) {
      throw new Error("text is required!");
    }

    const data = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(requestOptions)
    };
    var url = this.getApiBaseUrl() + "/answerCallbackQuery";
    return UrlFetchApp.fetch(url, data);
  }

  editMessageReplyMarkup(requestOptions) {
    const data = {
      'method': "post",
      'contentType': 'application/json',
      'payload': JSON.stringify(requestOptions)
    };

    const url = this.getApiBaseUrl() + "/editMessageReplyMarkup";
    return UrlFetchApp.fetch(url, data);
  }

  /**
   * Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True on success.
   * https://core.telegram.org/bots/api#setchatmenubutton
   */
  setChatMenuButton({ chat_id, menu_button }) {
    const data = {
      'method': "post",
      'payload': {
        'chat_id': chat_id,
        'menu_button': menu_button
      }
    };
    const url = this.getApiBaseUrl() + "/setChatMenuButton";
    return UrlFetchApp.fetch(url, data);
  }

  /**
   * Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method. Returns True on success.
   * https://core.telegram.org/bots/api#setchatstickerset
   */
  setChatStickerSet({ chat_id, sticker_set_name }) {
    const data = {
      'method': "post",
      'payload': {
        'chat_id': chat_id,
        'sticker_set_name': sticker_set_name
      }
    };
    const url = this.getApiBaseUrl() + "/setChatStickerSet";
    return UrlFetchApp.fetch(url, data);
  }

  unpinAllChatMessages(chat_id) {
    const data = {
      'method': "post",
      'payload': {
        'chat_id': chat_id
      }
    };
    const url = this.getApiBaseUrl() + "/unpinAllChatMessages";
    return UrlFetchApp.fetch(url, data);
  }

  pinChatMessage({ chat_id, message_id, disable_notification = true }) {
    const data = {
      'method': "post",
      'payload': {
        'chat_id': String(chat_id),
        'message_id': parseInt(message_id),
        'disable_notification': disable_notification
      }
    };
    const url = this.getApiBaseUrl() + "/pinChatMessage";

    return UrlFetchApp.fetch(url, data);
  }

  setChatTitle({ chat_id, title }) {
    const data = {
      'method': "post",
      'payload': {
        'chat_id': chat_id,
        'title': title
      }
    };
    var url = this.getApiBaseUrl() + "/setChatTitle";
    return UrlFetchApp.fetch(url, data);
  }

  setMyName({ name, language_code }) {
    const data = {
      'method': "post",
      'payload': {
        'name': name,
        'language_code': language_code
      }
    };
    const url = this.getApiBaseUrl() + "/setMyName";
    return UrlFetchApp.fetch(url, data);

  }

  setMyDescription({ description, language_code }) {
    const data = {
      'method': "post",
      'payload': {
        'description': description,
        'language_code': language_code
      }
    };
    const url = this.getApiBaseUrl() + "/setMyDescription";
    return UrlFetchApp.fetch(url, data);
  }

  setMyShortDescription({ short_description, language_code }) {
    const data = {
      'method': "post",
      'payload': {
        'short_description': short_description,
        'language_code': language_code
      }
    };
    const url = this.getApiBaseUrl() + "/setMyShortDescription";
    return UrlFetchApp.fetch(url, data);
  }

  /**
   * @see https://core.telegram.org/bots/api#setmycommands
   */
  setMyCommands({ commands = [], language_code, scope }) {
    if (commands.length === 0) {
      throw new Error("commands is required!");
    }
    const data = {
      'method': "post",
      'payload': {
        'scope': scope,
        'commands': commands,
        'language_code': language_code
      }
    };
    const url = this.getApiBaseUrl() + "/setMyCommands";
    return UrlFetchApp.fetch(url, data);
  }

  getMe() {
    const url = this.getApiBaseUrl() + "/getMe";
    return UrlFetchApp.fetch(url);
  }

  getApiBaseUrl() {
    return this.telegramEnpBaseUrl;
  }

  /**
   * V8.2
   * Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object. If the bot is using getUpdates, will return an object with the url field empty.
   * @see https://core.telegram.org/bots/api#getwebhookinfo
   * @returns {object} The response from the API endpoint.
   **/
  getWebhookInfo() {
    const url = this.getApiBaseUrl() + "/getWebhookInfo";

    return UrlFetchApp.fetch(url);
  }

  /**
   * V8.2
   * Use this method to set a new webhook for the bot. Requires the URL to be set. Returns True on success.
   * @see https://core.telegram.org/bots/api#setwebhook
   * @param {string} webAppUrl The URL of the web app.
   * @returns {object} The response from the API endpoint.
   **/
  setWebhook(webAppUrl) {
    if (webAppUrl) {
      const url = this.getApiBaseUrl() + "/setWebhook?url=" + webAppUrl;
      const response = UrlFetchApp.fetch(url);
      return response;
    }
    else {
      throw new Error("webAppUrl paramter is null or empty!");
    }
  }

  /**
   * V8.2
   * Use this method to delete the webhook for the bot. Requires no parameters. Returns True on success.
   * @see https://core.telegram.org/bots/api#deletewebhook
   * @param {string} webAppUrl The URL of the web app.
   * 
   * @returns {object} The response from the API endpoint.
   **/
  deleteWebhook(webAppUrl) {
    if (webAppUrl) {
      const url = this.getApiBaseUrl() + "/deleteWebhook?url=" + webAppUrl;
      const response = UrlFetchApp.fetch(url);
      return response;
    }
    else {
      throw new Error("webAppUrl paramter is null or empty!");
    }
  }

  sendDice({ chat_id, emoji, disable_notification, reply_to_message_id }) {
    const url = `${this.getApiBaseUrl()}/sendDice?chat_id=${chat_id}`
      + `&disable_notification=${disable_notification}&reply_to_message_id=${reply_to_message_id}`
      + `&emoji=${emoji}`;
    return UrlFetchApp.fetch(url);
  }

  getChat(chat_id) {
    const url = `${this.getApiBaseUrl()}/getChat?chat_id=${chat_id}`;
    return UrlFetchApp.fetch(url);
  }

  getBusinessConnection(business_connection_id) {
    const url = `${this.getApiBaseUrl()}/getBusinessConnection?business_connection_id=${business_connection_id}`;
    return UrlFetchApp.fetch(url);
  }

  sendChatAction({ chat_id, action }) {
    const url = this.getApiBaseUrl() + `/sendChatAction?chat_id=${chat_id}&action=${action}`;
    return UrlFetchApp.fetch(url);
  }

  sendTypingChatAction(chat_id) {
    this.sendChatAction(chat_id, "typing");
  }
  sendUploadPhotoChatAction(chat_id) {
    this.sendChatAction(chat_id, "upload_photo");
  }
  sendRecordVideoChatAction(chat_id) {
    this.sendChatAction(chat_id, "record_video");
  }
  sendUploadVideogChatAction(chat_id) {
    this.sendChatAction(chat_id, "upload_video");
  }
  sendRecordVoiceChatAction(chat_id) {
    this.sendChatAction(chat_id, "record_voice");
  }
  sendUploadVoiceChatAction(chat_id) {
    this.sendChatAction(chat_id, "upload_voice");
  }
  sendUploadDocumentChatAction(chat_id) {
    this.sendChatAction(chat_id, "upload_document");
  }
  sendChooseStickerChatAction(chat_id) {
    this.sendChatAction(chat_id, "choose_sticker");
  }
  sendFindLocationChatAction(chat_id) {
    this.sendChatAction(chat_id, "find_location");
  }
  sendRecordVideoNoteChatAction(chat_id) {
    this.sendChatAction(chat_id, "record_video_note");
  }
  sendUploadVideoNoteChatAction(chat_id) {
    this.sendChatAction(chat_id, "upload_video_note");
  }
}

/**
 * Get an instance of the TelegramBotClient class.
 * @param {string} token The bot token from the Telegram Bot API.
 * @return {TelegramBotClient} An instance of the TelegramBotClient class.
 */
function getTelegramBotClient(token) {
  return new TelegramBotClient(token);
}


